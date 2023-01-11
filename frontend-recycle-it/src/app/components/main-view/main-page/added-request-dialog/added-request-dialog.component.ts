import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-added-request-dialog',
  templateUrl: './added-request-dialog.component.html',
  styleUrls: ['./added-request-dialog.component.css']
})
export class AddedRequestDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<AddedRequestDialogComponent>) {}

  ngOnInit(): void {
  }

  onClose() {
    this._dialogRef.close();
    window.location.reload();
  }

}
