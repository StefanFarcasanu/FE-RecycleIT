import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-check-validity-dialog',
  templateUrl: './check-validity-dialog.component.html',
  styleUrls: ['./check-validity-dialog.component.css']
})
export class CheckValidityDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<CheckValidityDialogComponent>) {}

  ngOnInit(): void {
  }

  onClose() {
    this._dialogRef.close();
    window.location.reload();
  }

}
