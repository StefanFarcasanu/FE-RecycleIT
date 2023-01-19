import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserDto} from "../models/userDto";


@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  registerUrl: string = "http://localhost:8080/users/register";
  usersUrl: string = "http://localhost:8080/users";

  constructor(private http: HttpClient) {
  }

  register(firstName: string, lastName: string, email: string, password: string, city: string, county: string) {
    return this.http.post(this.registerUrl, new UserDto(0, firstName, lastName, email, password, county, city, "CLIENT"), {
      responseType: 'text'
    })
  }

  getAllUsers() {
    const _token: string = localStorage.getItem("token")!;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + _token
      }),
      observe: "response" as "body"
    };

    return this.http.get<HttpResponse<any>>(this.usersUrl, httpOptions);
  }
}
