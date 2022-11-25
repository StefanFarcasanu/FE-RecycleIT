import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import jwtDecode from "jwt-decode";
import {JWTPayload} from "../components/login/login.component";

@Injectable({
  providedIn: 'root'
})
export class VouchersListService {

  private _vouchersUrl: string = "http://localhost:8080/vouchers?id=";

  constructor(private http: HttpClient) {
  }

  getAllVouchersForRetailer() {
    const _token: string = localStorage.getItem("token")!;
    const payload = jwtDecode(_token) as JWTPayload;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + _token
      }),
      observe: "response" as "body"
    };

    return this.http.get<HttpResponse<any>>(this._vouchersUrl + payload.sub, httpOptions);
  }
}
