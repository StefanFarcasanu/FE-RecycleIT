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

  getTotalNumberOfUsers() {
    let url = "http://localhost:8080/users/total";
    return this.httpClient.get<HttpResponse<any>>(url, {
      headers: {
        'Authorization': "Bearer " + this.token,
        'Content-Type': 'application/json'
      },
      observe: "response" as "body"
    })
  }

  getTotalNumberOfGeneratedVouchers() {
    let url = "http://localhost:8080/vouchers/total";
    return this.httpClient.get<HttpResponse<any>>(url, {
      headers: {
        'Authorization': "Bearer " + this.token,
        'Content-Type': 'application/json'
      },
      observe: "response" as "body"
    })
  }

  getTotalQuantityOfRecycledWaste() {
    let url = "http://localhost:8080/requests/total";

    return this.httpClient.get<HttpResponse<any>>(url, {
      headers: {
        'Authorization': "Bearer " + this.token,
        'Content-Type': 'application/json'
      },
      observe: "response" as "body"
    })
  }

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
}
