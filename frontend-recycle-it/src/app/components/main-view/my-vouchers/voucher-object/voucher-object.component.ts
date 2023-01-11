import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MyVouchersComponent} from "../my-vouchers.component";
import {MatDialog} from "@angular/material/dialog";
import {DetailsDialogComponent} from "./details-dialog/details-dialog.component";

@Component({
  providers:[MyVouchersComponent],
  selector: 'app-voucher-object',
  templateUrl: './voucher-object.component.html',
  styleUrls: ['./voucher-object.component.css'],
})
export class VoucherObjectComponent implements OnInit {

  @Input() _id!: number;

  @Input() _value!: Number;

  @Input() _details!: String;

  @Input() _status!: String;

  @Input() _validUntil!: Date;

  @Input() _retailerName!: String;

  constructor(private myComponent: MyVouchersComponent, private _detailsDialog: MatDialog) { }

  ngOnInit(): void {
  }

  useVoucherForClient(voucherId: number) {
    this.myComponent.useVoucherForClient(voucherId);
  }

  openVoucherInfoDialog() {
    this._detailsDialog.open(DetailsDialogComponent,{
      minHeight: "200px",
      width: "500px",
      panelClass: "custom-details",
      data: {
        voucherDetails: this._details,
      }
    });
  }
}
