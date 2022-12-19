import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {VoucherDto} from "../models/voucherDto";

@Injectable({
  providedIn: 'root'
})
export class VouchersService {

  constructor(private httpClient: HttpClient) { }

  token = localStorage.getItem("token");

  addNewVoucher(voucher: VoucherDto, noVouchers: number): Observable<any> {
    let url = "http://localhost:8080/vouchers/create";
    //const paramData = new FormData();
    //paramData.append("number", noVouchers.toString());
    return this.httpClient.post(url, voucher, {
      params: new HttpParams().set('number', noVouchers),
      headers: {
        'Authorization': "Bearer " + this.token,
        'Content-Type': 'application/json'
      }
    });
  }
}
