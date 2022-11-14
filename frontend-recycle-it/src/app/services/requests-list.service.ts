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
    const userData: {
      id: String,
      role: String,
      _token: String
    } = JSON.parse(localStorage.getItem("token")!);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiNSIsImV4cCI6MTY2ODQyNjgxMywiaWF0IjoxNjY4NDIzMjEzLCJzY29wZSI6IlJPTEVfQ0xJRU5UIn0.Ddmtc_n6v7x8d05lY0568ZvgqfJyflk34jQWG6I0PVVfjnQefLYiGvJ2-MYnPKRKcGwKBlvRov5d54p5hjkMLZWoSCu2NufXRDcuIB9HZrC1jxfke4Zw6CVD5zA7shcIuyJprNHy6JwERhEEvY12oKPANdqhRHkAblxoe6N1UeB9yZzfzZ95uXIkHhXTgOQS_NPp-V6vP-be0RBjLfhhOVwz9GBh4Yxd_7PUHtFMGphbSoO76UGHpo8izcWkqpua64GEpKiGwpuN1JwOgUEIAqweu8Y5DMBX6AWaUX3VnXwb5aWqMOyqk1Gr_-YZ9VsbVYuVV8sri1QZocPQikzwZA"
      }),
      observe: "response" as "body"
    };

    return this.http.get<HttpResponse<any>>(this._requestsUrl, httpOptions);
  }
}
