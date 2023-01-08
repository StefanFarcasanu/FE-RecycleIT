import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VoucherModel} from "../../../models/voucher.model";
import {VouchersListService} from "../../../services/vouchers-list.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {CheckValidityDialogComponent} from "./voucher-object/check-validity-dialog/check-validity-dialog.component";

@Component({
  selector: 'app-my-vouchers',
  templateUrl: './my-vouchers.component.html',
  styleUrls: ['./my-vouchers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyVouchersComponent implements OnInit {

  public clientVouchers: Array<VoucherModel> = [];

  public retailerName!: string;

  isLoading = false;

  showVoucherError = false;

  constructor(private vouchersService: VouchersListService, private _dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.getVouchersForClient();
  }

  getVouchersForClient() {
    this.vouchersService.getAllVouchersForRetailer()
      .subscribe(data => {
        for (let voucher of data.body) {
          this.retailerName = voucher.retailer.firstname + " " + voucher.retailer.lastname;
          this.clientVouchers.push(new VoucherModel(
            voucher.id,
            voucher.client.id,
            this.retailerName,
            voucher.value,
            voucher.details,
            voucher.code,
            voucher.status,
            new Date(voucher.validUntil)
          ))
        }
      });
  }

  openSuccessDialog() {
    this._dialogRef.open(CheckValidityDialogComponent, {
      minHeight: "350px",
      width: "400px"});
  }

  useVoucherForClient(voucherId: number) {

    this.showVoucherError = false;

    this.vouchersService.useVoucher(voucherId)
      .subscribe(data => {
        if (data.body != null){
          this.isLoading = false;
          this.openSuccessDialog();
        }
      },
  (error: HttpErrorResponse) => {
          let errors = error.error;
          if (errors.includes("not found")) {
            this.showVoucherError = true;
          }

          if (errors.includes("voucher id")) {
            this.showVoucherError = true;
          }

          if (errors.includes("has expired")) {
            this.showVoucherError = true;
          }

          if (errors.includes("already been used")) {
            this.showVoucherError = true;
          }

          this.isLoading = false;

      });
  }
}
