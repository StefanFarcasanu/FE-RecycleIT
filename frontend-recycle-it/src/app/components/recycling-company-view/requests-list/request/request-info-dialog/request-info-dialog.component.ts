import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RequestInfoService} from "../../../../../services/request-info.service";

@Component({
  selector: 'app-request-info-dialog',
  templateUrl: './request-info-dialog.component.html',
  styleUrls: ['./request-info-dialog.component.css']
})
export class RequestInfoDialogComponent implements OnInit {

  _clientId!: Number;

  _clientFirstName!: String;

  _clientLastName!: String;

  _clientEmail!: String;

  constructor(private _dialogRef: MatDialogRef<RequestInfoDialogComponent>,
              private _requestInfoService: RequestInfoService,
              @Inject(MAT_DIALOG_DATA) public clientIdData: any) {

    this._clientId = clientIdData["clientId"];
  }

  ngOnInit(): void {
    this._requestInfoService.getClientDetails().subscribe(
      data => {
        for (let userJSON of data.body) {
          if (userJSON.id === this._clientId) {
            this._clientFirstName = userJSON.firstname;
            this._clientLastName = userJSON.lastname;
            this._clientEmail = userJSON.email;
            break;
          }
        }
      },
      error => {
        alert("There was an error fetching the details of the client!")
      }
    );
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
