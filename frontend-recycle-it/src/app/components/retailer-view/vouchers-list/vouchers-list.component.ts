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
    this._vouchersListService.getAllVouchersForRetailer()
      .subscribe(data => {
          for (let voucherJSON of data.body) {
            this.vouchersList.push(new VoucherModel(
              voucherJSON.id,
              voucherJSON.clientId,
              voucherJSON.retailerId,
              voucherJSON.value,
              voucherJSON.details,
              voucherJSON.code,
              voucherJSON.status,
              new Date(voucherJSON.validUntil)
            ))
          }
        },
        error => {
          if (error.error.includes("There are no vouchers")) {
            alert("There was an error fetching the vouchers!")
          }
        });
  }

  openAddNewVoucherDialog() {
    this._addNewVoucherDialog.open(AddNewVoucherDialogComponent, {
      height: "35rem",
      width: "650px",
      panelClass: 'custom-dialog'
    });
  }

  logout() {
    this._loginService.logout();
  }
}
