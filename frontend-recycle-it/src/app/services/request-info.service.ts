import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RequestInfoService {

  private _usersUrl: string = "http://localhost:8080/users";

  constructor(private http: HttpClient) {
  }

  getClientDetails() {
    const _token = localStorage.getItem("token")!;

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + _token
      }),
      observe: "response" as "body"
    };

    return this.http.get<HttpResponse<any>>(this._usersUrl, httpOptions);
  }
}
