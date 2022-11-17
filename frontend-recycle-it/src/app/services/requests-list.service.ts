import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RequestsListService {

  private _requestsUrl: string = "http://localhost:8080/requests";

  constructor(private http: HttpClient) {
  }

  getAllRequests() {
    const _token: String = localStorage.getItem("token")!;

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + _token
      }),
      observe: "response" as "body"
    };

    return this.http.get<HttpResponse<any>>(this._requestsUrl, httpOptions);
  }
}
