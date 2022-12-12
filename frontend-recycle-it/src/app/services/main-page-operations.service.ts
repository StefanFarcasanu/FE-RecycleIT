import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {RecycleRequestDto} from "../models/recycleRequestDto";
import {Observable} from "rxjs";
import {UserDto} from "../models/userDto";

@Injectable({
  providedIn: 'root'
})
export class MainPageOperationsService {

  constructor(private httpClient: HttpClient) { }

  token = localStorage.getItem("token");

  getCompaniesFromClientCounty() {
    let url = "http://localhost:8080/users/companies";
    return this.httpClient.get<HttpResponse<any>>(url, {
      headers: {
        'Authorization': "Bearer " + this.token,
        'Content-Type': 'application/json'
      },
      observe: "response" as "body"
    })
  }

  addRecycledWaste(recycleRequest: RecycleRequestDto): Observable<any> {
    let url = "http://localhost:8080/requests";
    return this.httpClient.post(url, recycleRequest, {
      headers: {
        'Authorization': "Bearer " + this.token,
        'Content-Type': 'application/json'
      }
    });
  }

  getClientDetails() {
    let url = "http://localhost:8080/users/client";
    const _token = localStorage.getItem("token")!;

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + _token
      }),
      observe: "response" as "body"
    };

    return this.httpClient.get<HttpResponse<any>>(url, httpOptions);
  }

  updateClientAccount(clientId: number, userDto: UserDto): Observable<any> {
    let url = "http://localhost:8080/users";
    return this.httpClient.put(url, userDto, {
      headers: {
        'Authorization': "Bearer " + this.token,
        'Content-Type': 'application/json'
      }
    });
  }
}
