import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MainPageOperationsService} from "../../services/main-page-operations.service";
import {lastValueFrom} from "rxjs";
import {RecycleRequestDto} from "../../models/recycleRequestDto";
import {UserDto} from "../../models/userDto";
import jwtDecode from "jwt-decode";
import {HttpErrorResponse} from "@angular/common/http";

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


  constructor(private router: Router, private mainService: MainPageOperationsService) { }

  ngOnInit(): void {
    this.token = (localStorage.getItem("token")) ? localStorage.getItem("token") : "";
    this.payload = jwtDecode(this.token!) as JWTPayload;
    console.log(this.payload.sub);
    this.populateDropdown(this.payload.sub);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("loginPath");
  }

  populateDropdown(clientId: number) {
    this.mainService.getCompaniesFromClientCounty(clientId).subscribe(
      data => {
        console.log(typeof data);
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

  addRecycledWaste() {
    let wasteType = document.querySelector('input[name="options-outlined"]:checked') as HTMLInputElement;
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
          alert("Your recycle request has been submitted!");
          window.location.reload();
        };
      },
        (err: HttpErrorResponse) => {
        if (err.status === 404){
          document.getElementById("input-waste-quantity")!.classList.add("is-invalid");
          document.getElementById('input-waste-quantity-tooltip')!.classList.add("invalid-tooltip");
          document.getElementById("input-waste-quantity-tooltip")!.innerHTML = "Invalid quantity!";
        }
          if (err.status === 500){
            alert("You need to complete all the fields!");
          }
        if (String(this.wasteQuantity) != "") {
          if (parseFloat(String(this.wasteQuantity)) > 10000) {
            document.getElementById("input-waste-quantity")!.classList.add("is-invalid");
            document.getElementById("input-waste-quantity-tooltip")!.classList.add("invalid-tooltip");
            document.getElementById("input-waste-quantity-tooltip")!.innerHTML = "You can recycle a maximum amount of 10.000kgs at once!";
          } else {
            document.getElementById("input-waste-quantity")!.classList.add("is-invalid");
            document.getElementById("input-waste-quantity-tooltip")!.classList.add("invalid-tooltip");
            document.getElementById("input-waste-quantity-tooltip")!.innerHTML = "Please enter the quantity!";
          }
        }
      }
      );
    // lastValueFrom(this.mainService.addRecycledWaste(this.recycleRequest))
    //   .then(() => {
    //     console.log("added in database");
    //     alert("Your recycle request has been submitted!");
    //     window.location.reload();
    //   });
  }
}
