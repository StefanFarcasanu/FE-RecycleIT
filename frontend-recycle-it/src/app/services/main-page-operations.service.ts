import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {RecycleRequestDto} from "../models/recycleRequestDto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainPageOperationsService {

  constructor(private httpClient: HttpClient) { }

  token = localStorage.getItem("token");

  getCompaniesFromClientCounty(clientId: number) {
    let url = "http://localhost:8080/users?clientId=" + clientId;
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
    console.log("clicked");
    console.log(recycleRequest);
    return this.httpClient.post(url, recycleRequest, {
      headers: {
        'Authorization': "Bearer " + this.token,
        'Content-Type': 'application/json'
      }
    });
  }
}
