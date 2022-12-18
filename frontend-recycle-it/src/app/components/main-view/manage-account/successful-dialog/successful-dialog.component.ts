import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-successful-dialog',
  templateUrl: './successful-dialog.component.html',
  styleUrls: ['./successful-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SuccessfulDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<SuccessfulDialogComponent>) { }

  ngOnInit(): void {
  }

  onClose() {
    this._dialogRef.close();
  }

}
