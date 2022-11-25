import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../services/login-service";
import {VoucherModel} from "../../../models/voucher.model";
import {VouchersListService} from "../../../services/vouchers-list.service";
import {AddNewVoucherDialogComponent} from "./voucher/add-new-voucher-dialog/add-new-voucher-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-vouchers-list',
  templateUrl: './vouchers-list.component.html',
  styleUrls: ['./vouchers-list.component.css']
})
export class VouchersListComponent implements OnInit {

  public vouchersList: Array<VoucherModel> = [];

  constructor(private _vouchersListService: VouchersListService,
              private _loginService: LoginService,
              private _addNewVoucherDialog: MatDialog) { }

  ngOnInit(): void {
    // this._vouchersListService.getAllVouchersForRetailer()
    //   .subscribe(data => {
    //       for (let voucherJSON of data.body) {
    //         this.vouchersList.push(new VoucherModel(
    //           voucherJSON.id,
    //           voucherJSON.clientId,
    //           voucherJSON.retailerId,
    //           voucherJSON.value,
    //           voucherJSON.details,
    //           voucherJSON.code,
    //           voucherJSON.status,
    //           new Date(voucherJSON.validUntil)
    //         ))
    //       }
    //     },
    //     error => {
    //       if (error.error.includes("There are no vouchers")) {
    //         alert("There was an error fetching the vouchers!")
    //       }
    //     });
    this.vouchersList.push(new VoucherModel(
      1,
      1,
      1,
      140.99,
      "Available for all luxury watches",
      "timeForContempt",
      "AVAILABLE",
      new Date("2023-11-25 18:51:59")
    ),
      new VoucherModel(
        1,
        1,
        1,
        230.99,
        "Available for all meat products and more!",
        "timeForContempt",
        "EXPIRED",
        new Date("2021-11-25 18:51:59")
      ),
      new VoucherModel(
        1,
        1,
        1,
        100.53,
        "Shoes, T-Shirts and tank tops only!",
        "timeForContempt",
        "AVAILABLE",
        new Date("2023-11-25 18:51:59")
      ),
      new VoucherModel(
        1,
        1,
        1,
        399.99,
        "One-time offer for all our products! Loyal clients only!",
        "timeForContempt",
        "USED",
        new Date("2023-11-25 18:51:59")
      ),);
  }

  openAddNewVoucherDialog() {
    this._addNewVoucherDialog.open(AddNewVoucherDialogComponent, {
      minHeight: "300px",
      width: "800px",
    });
  }

  logout() {
    this._loginService.logout();
  }
}
