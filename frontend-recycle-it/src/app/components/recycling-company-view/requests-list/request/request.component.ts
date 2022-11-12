import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  @Input() _requestId!: Number;
  @Input() _wasteType!: String;
  @Input() _wasteQuantity!: Number;
  @Input() _requestStatus!: String

  constructor() {

  }

  ngOnInit(): void {
  }

}
