import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-successful-pop-up',
  templateUrl: './successful-pop-up.component.html',
  styleUrls: ['./successful-pop-up.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SuccessfulPopUpComponent implements OnInit {

  success: boolean = false;
  constructor(private _dialogRef: MatDialogRef<SuccessfulPopUpComponent>) {}

  ngOnInit(): void {
  }

  onClose() {
    this._dialogRef.close();
    window.location.reload();
  }
}
