import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VoucherDto} from "../models/voucherDto";

@Injectable({
  providedIn: 'root'
})
export class VouchersService {

  constructor(private httpClient: HttpClient) { }

  token = localStorage.getItem("token");

  addNewVoucher(voucher: VoucherDto): Observable<any> {
    let url = "http://localhost:8080/vouchers/create";
    console.log("clicked");
    console.log(voucher);
    return this.httpClient.post(url, voucher, {
      headers: {
        'Authorization': "Bearer " + this.token,
        'Content-Type': 'application/json'
      }
    });
  }
}
