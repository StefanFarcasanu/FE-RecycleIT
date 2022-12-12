import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-recycling-progress-dialog',
  templateUrl: './recycling-progress-dialog.component.html',
  styleUrls: ['./recycling-progress-dialog.component.css']
})
export class RecyclingProgressDialogComponent implements OnInit {

  _value!: String;

  _details!: String;

  _status!: String;

  _validUntil!: String;

  _isError: Boolean = false;

  constructor(private _dialogRef: MatDialogRef<RecyclingProgressDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data == null) {
      this._isError = true;
    } else {
      this._value = data["value"];
      this._details = data["details"];
      this._status = data["status"];
      let utcDate = data["vaildUntil"];
      this._validUntil = formatDate(utcDate, "dd/MM/yyyy HH:mm", "en-US");
    }
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
