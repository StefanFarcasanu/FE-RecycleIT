import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsDialogComponent implements OnInit {

  _voucherDetails!: String;

  _validUntil!: String;

  constructor(private _dialogRef: MatDialogRef<DetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this._voucherDetails = data["voucherDetails"];
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
