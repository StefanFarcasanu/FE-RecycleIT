import {Injectable} from '@angular/core';
import {BehaviorSubject, tap} from "rxjs";
import {LoggedUserModel} from "../models/logged-user.model";
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {JWTPayload} from "../components/login/login.component";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedUser = new BehaviorSubject<LoggedUserModel>(null!);
  loginUrl: string = "http://localhost:8080/login";
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(email: string, password: string) {
    console.log("backend");
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Basic" + btoa(email + ":" + password)
      }),
      observe: "response" as "body"
    };
    return this.http.post<HttpResponse<any>>(this.loginUrl, null, httpOptions).pipe(tap(responseData => {
      const authHeader = String(String(responseData.headers.get("Authorization")) || '');
      if (authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7, authHeader.length);
        const payload = jwtDecode(token) as JWTPayload;
        this.handleAuthentication(payload.sub, payload.scope, token, payload.exp - payload.iat);
      }
    }))
  }

  private handleAuthentication(userId: string, role: string, token: string, expiresIn: number) {

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    // const loggedUser = new LoggedUserModel(userId, token, role, expirationDate);
    // this.loggedUser.next(loggedUser);

    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("token", token);
  }

  private autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      },
      expirationDuration);
  }

  private logout() {
    this.loggedUser.next(null!);
    this.router.navigate(["/login"]);
    localStorage.removeItem("userData");

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const token: {
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem("token")!);

    if (!token) {
      return;
    }

    const loadedUser = new LoggedUserModel(token._token, new Date(token._tokenExpirationDate));
    if (loadedUser.token) {
      this.loggedUser.next(loadedUser);
      const expirationDuration = new Date(token._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }
}
