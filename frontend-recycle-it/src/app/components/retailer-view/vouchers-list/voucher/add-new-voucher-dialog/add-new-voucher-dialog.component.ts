import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VoucherDto} from "../../../../../models/voucherDto";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {VouchersService} from "../../../../../services/vouchers.service";
import {LoginService} from "../../../../../services/login-service";
import {MatDialog} from "@angular/material/dialog";
import jwtDecode from "jwt-decode";
import {JWTPayload} from "../../../../main-page/main-page.component";
import {SuccessfulPopUpComponent} from "../../../../add-new-vouchers/successful-pop-up/successful-pop-up.component";
import {HttpErrorResponse} from "@angular/common/http";

interface VoucherValue {
  id: number;
  value: number;
}

@Component({
  selector: 'app-add-new-voucher-dialog',
  templateUrl: './add-new-voucher-dialog.component.html',
  styleUrls: ['./add-new-voucher-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewVoucherDialogComponent implements OnInit {

  constructor(private router: Router, private voucherService: VouchersService, private loginService: LoginService,
              private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.token = (localStorage.getItem("token")) ? localStorage.getItem("token") : "";
    this.payload = jwtDecode(this.token!) as JWTPayload;
  }

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


  closeAlert() {
    this.success = false;
  }

  logout() {
    this.loginService.logout();
  }

  openDialog () {
    this.dialogRef.open(SuccessfulPopUpComponent, {
      data: {
        name: "Samule"
      }
    });
  }

  addNewVoucher() {
    let voucherValue = this.selectedValue.valueOf();
    console.log(voucherValue);
    let details = document.getElementById("input-details") as HTMLInputElement;
    let noOfVouchers = document.getElementById("input-no-vouchers") as HTMLInputElement;
    this.voucherDto = new VoucherDto(
      this.payload.sub,
      voucherValue,
      details.value,
    );
    this.voucherService.addNewVoucher(this.voucherDto, this.selectedNoVouchers)
      .subscribe((response) => {
          if (response) {
            this.success = true;
            this.errorMessage = '';
            this.openDialog();
            console.log("aici suntem")
            voucherValue = 0;
            details.value = '';
            noOfVouchers.value = '';
          }
        },
        (err: HttpErrorResponse) => {
          console.log("why");
          if (err.status === 201) {
            this.openDialog();
          }
          if (err.error === "Invalid value!") {
            this.errorMessage = err.error;
          }
          if (err.error === "Invalid number of vouchers!"){
            this.errorMessage = err.error;
          }
        });
    console.log(details.value);
    console.log("added new voucher");
  }
}
