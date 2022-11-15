import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {RequestModel} from "../models/request.model";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _requestsUrl: string = "http://localhost:8080/requests/";

  constructor(private http: HttpClient) {
  }

  updateRequest(updatedRequest: RequestModel) {
    const _token = localStorage.getItem("token")!;

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + _token
      }),
      observe: "response" as "body"
    };

    return this.http.put<HttpResponse<any>>(this._requestsUrl + updatedRequest._id.toString(),
      updatedRequest, httpOptions);
  }
}
