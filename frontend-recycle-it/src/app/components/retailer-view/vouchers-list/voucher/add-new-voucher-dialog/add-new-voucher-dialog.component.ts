import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VoucherDto} from "../../../../../models/voucherDto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {VouchersService} from "../../../../../services/vouchers.service";
import {LoginService} from "../../../../../services/login-service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import jwtDecode from "jwt-decode";
import {SuccessfulPopUpComponent} from "./successful-pop-up/successful-pop-up.component";
import {HttpErrorResponse} from "@angular/common/http";
import {JWTPayload} from "../../../../main-view/main-page/main-page.component";
import {VouchersListService} from "../../../../../services/vouchers-list.service";

interface VoucherValue {
  id: number;
  value: number;
}

@Component({
  selector: 'app-add-new-voucher-dialog',
  templateUrl: './add-new-voucher-dialog.component.html',
  styleUrls: ['./add-new-voucher-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewVoucherDialogComponent implements OnInit {

  constructor(private router: Router, private voucherService: VouchersService, private loginService: LoginService,
              private dialogRef: MatDialogRef<AddNewVoucherDialogComponent>,
              private dialogSuccess: MatDialog,
              private _vouchersListService: VouchersListService) { }

  ngOnInit(): void {
    this.token = (localStorage.getItem("token")) ? localStorage.getItem("token") : "";
    this.payload = jwtDecode(this.token!) as JWTPayload;
  }

  errorMessage: string = "";
  errorMessageDetails = false;
  errorMessageVouchers = false;
  errorMessageValue = false;
  payload: any;
  token!: string | null;
  voucherDto!: VoucherDto;
  isLoading = false;

  voucherForm = new FormGroup({
     voucherValue: new FormControl('', Validators.required),
     details: new FormControl ('', Validators.required),
     noVouchers: new FormControl('', Validators.required)
  });

  values: VoucherValue[] = [
    {id: 1, value: 5}, {id: 2, value: 10}, {id: 3, value: 20},
    {id: 4, value: 40}, {id: 5, value: 60}, {id: 6, value: 80},
    {id: 7, value: 100}, {id: 8, value: 120}, {id: 9, value: 140},
    {id: 10, value: 160},  {id: 11, value: 180},  {id: 12, value: 200}
  ];

  openSuccess() {
    this.dialogSuccess.open(SuccessfulPopUpComponent);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addNewVoucher(form: FormGroup) {
    let selectedValue = form.get('voucherValue')?.value;
    let detailsInput = form.get('details')?.value;
    let noOfVouchers = form.get('noVouchers')?.value;

    this.errorMessageValue = false;
    this.errorMessageDetails = false;
    this.errorMessageVouchers = false;

    if (selectedValue == '--' || selectedValue == null || selectedValue == "") {
      this.errorMessageValue = true;
    }

    if (detailsInput == null || detailsInput == "") {
      this.errorMessageDetails = true;
    }

    if (noOfVouchers <= 0 || noOfVouchers == null || noOfVouchers == "") {
      this.errorMessageVouchers = true;
    }

    if (!this.errorMessageValue && !this.errorMessageDetails && !this.errorMessageVouchers) {
      this.isLoading = true;
      this.voucherDto = new VoucherDto(
        this.payload.sub,
        Number(selectedValue),
        String(detailsInput),
      );

      this.voucherService.addNewVoucher(this.voucherDto, Number(noOfVouchers))
        .subscribe((response) => {
            if (response) {
              this.isLoading = false;
              this.errorMessage = '';
              this.closeDialog();
              this.openSuccess();
            }
          },
          (err: HttpErrorResponse) => {
            let errors = err.error;
            if (errors.includes("details")) {
              this.errorMessageDetails = true;
            }
            if (errors.includes("value")) {
              this.errorMessageValue = true;
            }
            if (errors.includes("vouchers")) {
              this.errorMessageVouchers = true;
            }
            this.isLoading = false;
          });
    }
  }
}
