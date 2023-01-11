import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NationalStatisticsService {

  private _statisticsUrl: string = "http://localhost:8080/statistics";

  constructor(private http: HttpClient) { }

  getAllStatistics() {
    const _token: string = localStorage.getItem("token")!;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + _token
      }),
      observe: "response" as "body"
    };

    return this.http.get<HttpResponse<any>>(this._statisticsUrl, httpOptions);
  }
}
