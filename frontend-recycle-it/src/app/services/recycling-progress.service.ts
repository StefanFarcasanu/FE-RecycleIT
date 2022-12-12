import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecyclingProgressService {

  private _vouchersUrl: string = "http://localhost:8080/vouchers/client";

  private _nextMilestoneUrl: string = "http://localhost:8080/requests/milestone";

  constructor(private http: HttpClient) { }

  getNextMilestoneForClient() {
    const _token: String = localStorage.getItem("token")!;

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + _token
      }),
      observe: "response" as "body"
    };

    return this.http.get<HttpResponse<any>>(this._nextMilestoneUrl, httpOptions);
  }

  getAllVouchersForClient() {
    const _token: string = localStorage.getItem("token")!;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + _token
      }),
      observe: "response" as "body"
    };

    return this.http.get<HttpResponse<any>>(this._vouchersUrl, httpOptions);
  }
}
