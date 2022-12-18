import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserDto} from "../models/userDto";


@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  registerUrl: string = "http://localhost:8080/users/register";

  constructor(private http: HttpClient) {
  }

  register(firstName: string, lastName: string, email: string, password: string, city: string, county: string) {
    return this.http.post(this.registerUrl, new UserDto(0, firstName, lastName, email, password, county, city, "CLIENT"), {
      responseType: 'text'
    })
  }
}
