import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {RecycleRequestDto} from "../models/recycleRequestDto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainPageOperationsService {

  constructor(private httpClient: HttpClient) { }

  token = localStorage.getItem("token");

  getCompaniesFromClientCounty(clientId: number) {
    let url = "http://localhost:8080/users?clientId=" + clientId;
    return this.httpClient.get<HttpResponse<any>>(url, {
      headers: {
        'Authorization': "Bearer " + this.token,
        'Content-Type': 'application/json'
      },
      observe: "response" as "body"
    })
  }

  addRecycledWaste(recycleRequest: RecycleRequestDto): Observable<any> {
    let url = "http://localhost:8080/requests";
    console.log("clicked");
    console.log(recycleRequest);
    return this.httpClient.post(url, recycleRequest, {
      headers: {
        'Authorization': "Bearer " + this.token,
        'Content-Type': 'application/json'
      }
    });
  }
    //})
    // let xhr = new XMLHttpRequest();
    // let url = "http://localhost:8080/wastecontroller/waste-rest-service/waste";
    // xhr.open("POST", url, true);
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.setRequestHeader("Authorization", <string>sessionStorage.getItem("currentUser"));

    // function clearValidationTooltips() {
    //   document.getElementById("input-waste-quantity")!.classList.remove("is-invalid", "is-valid");
    //   document.getElementById("input-waste-quantity-tooltip")!.innerHTML = "";
    // }

    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     console.log("success!");
    //     document.location.href = "recycled-waste-success.html";
    //
    //   }
    //   if (xhr.readyState === 4 && xhr.status === 404) {
    //     clearValidationTooltips();
    //     if (xhr.responseText.includes("quantity")) {
    //       document.getElementById("input-waste-quantity")!.classList.add("is-invalid");
    //       document.getElementById('input-waste-quantity-tooltip')!.classList.add("invalid-tooltip");
    //       document.getElementById("input-waste-quantity-tooltip")!.innerHTML = "Invalid quantity!";
    //     }
    //   }
    // };

      // let wasteQuantity = document.getElementById("input-waste-quantity");//!.value;
      // let wasteType = document.querySelector('input[name="options-outlined"]:checked');//!.value;
      //
      // let yourDate = new Date();
      // const offset = yourDate.getTimezoneOffset();
      // yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000));
      // yourDate.toISOString().split('T')[0];
      // let wasteCollectedDate =  yourDate.toISOString().split('T')[0];
      //
      // if (wasteQuantity !== "") {
      //   if (parseFloat(wasteQuantity) > 10000) {
      //     document.getElementById("input-waste-quantity")!.classList.add("is-invalid");
      //     document.getElementById("input-waste-quantity-tooltip")!.classList.add("invalid-tooltip");
      //     document.getElementById("input-waste-quantity-tooltip")!.innerHTML = "You can recycle a maximum amount of 10.000kgs at once!";
      //   } else {
      //     let wasteData = JSON.stringify({
      //       "quantity": parseFloat(wasteQuantity),
      //       "type": wasteType,
      //       "recyclingDate": wasteCollectedDate
      //     });
      //     xhr.send(wasteData);
      //   }
      // }
      // else {
      //   document.getElementById("input-waste-quantity")!.classList.add("is-invalid");
      //   document.getElementById("input-waste-quantity-tooltip")!.classList.add("invalid-tooltip");
      //   document.getElementById("input-waste-quantity-tooltip")!.innerHTML = "Please enter the quantity!";
      // }
  }
