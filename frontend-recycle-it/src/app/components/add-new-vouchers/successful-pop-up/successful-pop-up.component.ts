import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-successful-pop-up',
  templateUrl: './successful-pop-up.component.html',
  styleUrls: ['./successful-pop-up.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SuccessfulPopUpComponent implements OnInit {

  firstname: string;
  success: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.firstname = data.name;
  }

  ngOnInit(): void {
  }

  closeAlert() {
    this.success = false;
  }

}
