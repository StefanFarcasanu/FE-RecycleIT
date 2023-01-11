import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {MainPageOperationsService} from "../../../services/main-page-operations.service";
import {RecycleRequestDto} from "../../../models/recycleRequestDto";
import {UserDto} from "../../../models/userDto";
import jwtDecode from "jwt-decode";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SuccessfulDialogComponent} from "../manage-account/successful-dialog/successful-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddedRequestDialogComponent} from "./added-request-dialog/added-request-dialog.component";

export interface JWTPayload {
  sub: number,
  scope: string
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MainPageComponent implements OnInit {

  token!: string | null;
  wasteQuantity!: number;
  companies: UserDto[] = [];
  selectedCompany!: number;
  recycleRequest!: RecycleRequestDto;
  payload: any;
  errorMessage: string = "";
  success: boolean = false;
  animationTime: number = 500;
  isLoading = false;
  errorMessageCompany = false;
  errorMessageQuantity = false;
  errorMessageWasteType = false;

  constructor(private router: Router, private mainService: MainPageOperationsService,
              private _dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.token = (localStorage.getItem("token")) ? localStorage.getItem("token") : "";
    this.payload = jwtDecode(this.token!) as JWTPayload;
    this.populateDropdown();
    this.populateStatistics();
  }

  requestForm = new FormGroup({
    selectedCompany: new FormControl('', Validators.required),
    wasteQuantity: new FormControl('', Validators.required)
  })

  animateValue(obj: any, start: any, end: any, duration: any): void {
    let startTimestamp: number | null = null;
    const step = (timestamp: number | null) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp! - startTimestamp!) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  populateStatistics() {
    this.mainService.getTotalNumberOfUsers().subscribe(
      data => {
        let noOfUsers = data.body;
        document.getElementById("amount-of-customers")!.innerHTML = noOfUsers;
        this.animateValue(
          document.getElementById("amount-of-customers")!,
          0,
          noOfUsers,
          this.animationTime
        );
      }
    )

    this.mainService.getTotalNumberOfGeneratedVouchers().subscribe(
      data => {
        let noOfGeneratedVouchers = data.body;
        document.getElementById("amount-of-generated-vouchers")!.innerHTML = noOfGeneratedVouchers;
        this.animateValue(
          document.getElementById("amount-of-generated-vouchers")!,
          0,
          noOfGeneratedVouchers,
          this.animationTime
        );
      }
    )

    this.mainService.getTotalQuantityOfRecycledWaste().subscribe(
      data => {
        let quantityOfWaste = data.body;
        document.getElementById("amount-of-kg-collected")!.innerHTML = quantityOfWaste;
        this.animateValue(
          document.getElementById("amount-of-kg-collected")!,
          0,
          quantityOfWaste,
          this.animationTime
        );
      }
    )
  }

  populateDropdown() {
    this.mainService.getCompaniesFromClientCounty().subscribe(
      data => {
        for (let companyJson of data.body) {
          this.companies.push(new UserDto(
            companyJson.id,
            companyJson.firstname,
            companyJson.lastname,
            companyJson.email,
            companyJson.password,
            companyJson.county,
            companyJson.city,
            companyJson.role
          ))
        }
      });
  }

  openSuccessDialog() {
    this._dialogRef.open(AddedRequestDialogComponent, {
      minHeight: "350px",
      width: "400px"});
  }

  addRecycledWaste(form: FormGroup) {
    let companyChoice = form.value.selectedCompany;
    let wasteQuantity = form.value.wasteQuantity;
    let wasteType = document.querySelector('input[name="options-outlined"]:checked') as HTMLInputElement;

    this.errorMessageCompany = false;
    this.errorMessageWasteType = false;
    this.errorMessageQuantity = false;

    if (companyChoice == '--' || companyChoice == null || companyChoice == "") {
      this.errorMessageCompany = true;
    }

    if (wasteQuantity == null || wasteQuantity == "" || wasteQuantity <= 0) {
      this.errorMessageQuantity = true;
    }

    if (wasteType == null || wasteType.value == "") {
      this.errorMessageWasteType = true;
    }

    if (!this.errorMessageWasteType && !this.errorMessageQuantity && !this.errorMessageCompany) {
      this.isLoading = true;
      this.recycleRequest = new RecycleRequestDto(
        this.payload.sub,
        companyChoice,
        wasteQuantity,
        wasteType.value
      );
    }

    this.mainService.addRecycledWaste(this.recycleRequest)
      .subscribe((response) => {
        if (response) {
          this.isLoading = false;
          this.errorMessage = '';
          this.openSuccessDialog();
          this.requestForm.reset();
        }
      },
        (err: HttpErrorResponse) => {
          let errors = err.error;
          if (errors === "Client do not exists!") {
            this.errorMessage = err.error;
          }
          if (errors === "Company do not exists!") {
            this.errorMessageCompany = true;
          }
          if (errors === "Illegal request quantity provided! Can not be 0!") {
            this.errorMessageQuantity = true;
          }
          if (errors === "Illegal request type provided! Should be one of: METAL, ELECTRONICS, PAPER or PLASTIC.") {
            this.errorMessageWasteType = true;
          }

          this.isLoading = false;
        }
      );
  }
}
