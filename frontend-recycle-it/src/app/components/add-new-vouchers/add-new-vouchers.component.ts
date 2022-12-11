import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

import {LoginService} from "../../services/login-service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import jwtDecode from "jwt-decode";
import {JWTPayload} from "../main-page/main-page.component";
import {VoucherDto} from "../../models/voucherDto";
import {VouchersService} from "../../services/vouchers.service";

interface VoucherValue {
  id: number;
  value: number;
}
@Component({
  selector: 'app-add-new-vouchers',
  templateUrl: './add-new-vouchers.component.html',
  styleUrls: ['./add-new-vouchers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewVouchersComponent implements OnInit {

  success: boolean = false;
  errorMessage: string = "";
  selectedValue!: number;
  selectedNoVouchers!: number;
  payload: any;
  token!: string | null;
  voucherDto!: VoucherDto;
  detailsInput!: string;

  // voucherForm = new FormGroup({
  //   ,
  //   // noVouchers: new FormControl(0, Validators.required)
  // });

  valueControl = new FormControl<VoucherValue | null>(null, Validators.required);

  values: VoucherValue[] = [
    {id: 1, value: 5}, {id: 2, value: 10}, {id: 3, value: 20},
    {id: 4, value: 40}, {id: 5, value: 60}, {id: 6, value: 80},
    {id: 7, value: 100}, {id: 8, value: 120}, {id: 9, value: 140},
    {id: 10, value: 160},  {id: 11, value: 180},  {id: 12, value: 200}
  ];

  constructor(private router: Router, private voucherService: VouchersService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.token = (localStorage.getItem("token")) ? localStorage.getItem("token") : "";
    this.payload = jwtDecode(this.token!) as JWTPayload;
  }

  logout() {
    this.loginService.logout();
  }

  closeAlert() {
    this.success = false;
  }

  addNewVoucher() {
    let voucherValue = this.selectedValue.valueOf();
    let details = document.getElementById("input-details") as HTMLInputElement;
    let noOfVouchers = document.getElementById("input-no-vouchers") as HTMLInputElement;
    this.voucherDto = new VoucherDto(
      this.payload.sub,
      voucherValue,
      details.value,
    );
    this.voucherService.addNewVoucher(this.voucherDto)
      .subscribe((response) => {
        if (response) {
          this.success = true;
          this.errorMessage = '';
          voucherValue = 0;
          details.value = '';
          noOfVouchers.value = '';
        }
      });
    console.log("added new voucher");
  }
}
