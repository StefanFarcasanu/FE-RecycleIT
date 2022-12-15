import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-request-info-dialog',
  templateUrl: './request-info-dialog.component.html',
  styleUrls: ['./request-info-dialog.component.css']
})
export class RequestInfoDialogComponent implements OnInit {

  _clientFirstName!: String;

  _clientLastName!: String;

  _clientEmail!: String;

  _dateCreated!: String;

  constructor(private _dialogRef: MatDialogRef<RequestInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this._clientFirstName = data["client"].firstname;
    this._clientLastName = data["client"].lastname;
    this._clientEmail = data["client"].email;
    let utcDate = data["dateCreated"];
    this._dateCreated = formatDate(utcDate, "dd/MM/yyyy HH:mm", "en-US");
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
