import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  @Input() _value!: Number;

  @Input() _details!: String;

  @Input() _status!: String;

  constructor() {
  }

  ngOnInit(): void {
  }
}
