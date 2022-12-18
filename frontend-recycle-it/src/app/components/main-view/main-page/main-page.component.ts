import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MainPageOperationsService} from "../../../services/main-page-operations.service";
import {lastValueFrom} from "rxjs";
import {RecycleRequestDto} from "../../../models/recycleRequestDto";
import {UserDto} from "../../../models/userDto";
import jwtDecode from "jwt-decode";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginService} from "../../../services/login-service";

export interface JWTPayload {
  sub: number,
  scope: string
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
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

  constructor(private router: Router, private mainService: MainPageOperationsService) { }

  ngOnInit(): void {
    this.token = (localStorage.getItem("token")) ? localStorage.getItem("token") : "";
    this.payload = jwtDecode(this.token!) as JWTPayload;
    this.populateDropdown();
    this.populateStatistics();
  }

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
        var noOfUsers = data.body;
        console.log(noOfUsers);

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
        var noOfGeneratedVouchers = data.body;
        console.log(noOfGeneratedVouchers);

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
        var quantityOfWaste = data.body;
        console.log(quantityOfWaste);

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

  closeAlert() {
    this.success = false;
  }

  addRecycledWaste() {
    let wasteType = document.querySelector('input[name="options-outlined"]:checked') as HTMLInputElement;
    let companySelector = document.getElementById("companies") as HTMLInputElement;
    let wasteInput = document.getElementById("input-waste-quantity") as HTMLInputElement;
    this.recycleRequest = new RecycleRequestDto(
      this.payload.sub,
      this.selectedCompany,
      this.wasteQuantity,
      wasteType.value,
      "PENDING"
    );

    this.mainService.addRecycledWaste(this.recycleRequest)
      .subscribe((response) => {
        if (response) {
          this.success = true;
          this.errorMessage = '';
          wasteType.value = '';
          companySelector.value = '';
          wasteInput.value = '';
        }
      },
        (err: HttpErrorResponse) => {
          if (err.error === "Client do not exists!") {
            this.errorMessage = err.error;
          }
          if (err.error === "Company do not exists!") {
            this.errorMessage = err.error;
          }
          if (err.status === 500){
            this.errorMessage = "You need to complete all the fields to make a request!";
          }
          if (err.error === "Illegal request quantity provided! Can not be 0") {
            this.errorMessage = err.error;
          }
          if (err.error === "Illegal request type provided! Should be one of: METAL, ELECTRONICS, PAPER or PLASTIC.") {
            this.errorMessage = err.error;
          }
          if (this.selectedCompany == null) {
            document.getElementById("input-waste-quantity-tooltip")!.innerHTML = "Please select the company!";
          }
          if (this.wasteQuantity != 0 && this.wasteQuantity> 10000){
            document.getElementById("input-waste-quantity-tooltip")!.innerHTML = "You can recycle a maximum amount of 10.000kgs at once!";
          }
        }
      );
  }
}
