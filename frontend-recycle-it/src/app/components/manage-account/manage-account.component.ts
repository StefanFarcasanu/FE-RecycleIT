import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // function clearValidationTooltips() {
  //   document.getElementById("input-first-name").classList.remove("is-invalid", "is-valid");
  //   document.getElementById("input-last-name").classList.remove("is-invalid", "is-valid");
  //   document.getElementById("input-password").classList.remove("is-invalid", "is-valid");
  //   document.getElementById("input-repeat-password").classList.remove("is-invalid", "is-valid");
  //
  //   document.getElementById("first-name-tooltip").classList.remove("invalid-tooltip", "valid-tooltip");
  //   document.getElementById("first-name-tooltip").innerHTML = "";
  //   document.getElementById("last-name-tooltip").classList.remove("invalid-tooltip", "valid-tooltip");
  //   document.getElementById("last-name-tooltip").innerHTML = "";
  //   document.getElementById("password-tooltip").classList.remove("invalid-tooltip", "valid-tooltip");
  //   document.getElementById("password-tooltip").innerHTML = "";
  //   document.getElementById("repeat-password-tooltip").classList.remove("invalid-tooltip", "valid-tooltip");
  //   document.getElementById("repeat-password-tooltip").innerHTML = "";
  // }
  //
  // function logout() {
  //   localStorage.removeItem("currentUser");
  //   document.location.href = "login.html";
  // }
  //
  // function loadUserData() {
  //   let xhr = new XMLHttpRequest();
  //   let url = "http://localhost:8080/usercontroller/user-rest-service/user";
  //   xhr.open("GET", url, true);
  //   xhr.setRequestHeader("Content-Type", "application/json");
  //   xhr.setRequestHeader("Authorization", localStorage.getItem("currentUser"));
  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4 && xhr.status === 200) {
  //       clearValidationTooltips();
  //       let firstName = JSON.parse(xhr.responseText)["firstName"];
  //       let lastName = JSON.parse(xhr.responseText)["lastName"];
  //       let email = JSON.parse(xhr.responseText)["mail"];
  //       let county = JSON.parse(xhr.responseText)["county"];
  //       let city = JSON.parse(xhr.responseText)["city"];
  //       let address = JSON.parse(xhr.responseText)["address"];
  //
  //       document.getElementById("input-first-name").value = firstName;
  //       document.getElementById("input-last-name").value = lastName;
  //       document.getElementById("input-email").value = email;
  //       document.getElementById("input-county").value = county;
  //       document.getElementById("input-city").value = city;
  //       document.getElementById("input-address").value = address;
  //     }
  //   }
  //
  //   xhr.send(null);
  // }
  //
  // function sendUpdateAccountRequest() {
  //   let xhr = new XMLHttpRequest();
  //   let url = "http://localhost:8080/usercontroller/user-rest-service/update";
  //   xhr.open("PUT", url, true);
  //   xhr.setRequestHeader("Content-Type", "application/json");
  //   xhr.setRequestHeader("Authorization", localStorage.getItem("currentUser"));
  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4 && xhr.status === 200) {
  //       clearValidationTooltips();
  //       if (password !== repeatPassword) {
  //         document.getElementById("input-password").classList.add("is-invalid");
  //         document.getElementById("input-repeat-password").classList.add("is-invalid");
  //         document.getElementById("password-tooltip").classList.add("invalid-tooltip");
  //         document.getElementById("repeat-password-tooltip").classList.add("invalid-tooltip");
  //         document.getElementById("password-tooltip").innerHTML = "Passwords do not match!";
  //         document.getElementById("repeat-password-tooltip").innerHTML = "Passwords do not match!";
  //       } else
  //         document.location.href = "update-account-success.html";
  //     }
  //     if (xhr.readyState === 4 && xhr.status === 404) {
  //       clearValidationTooltips();
  //       if (xhr.responseText.includes("first name")) {
  //         document.getElementById("input-first-name").classList.add("is-invalid");
  //         document.getElementById("first-name-tooltip").classList.add("invalid-tooltip");
  //         document.getElementById("first-name-tooltip").innerHTML = "Invalid first name!";
  //       }
  //       if (xhr.responseText.includes("last name")) {
  //         document.getElementById("input-last-name").classList.add("is-invalid");
  //         document.getElementById("last-name-tooltip").classList.add("invalid-tooltip");
  //         document.getElementById("last-name-tooltip").innerHTML = "Invalid last name!";
  //       }
  //       if (xhr.responseText.includes("password")) {
  //         document.getElementById("input-password").classList.add("is-invalid");
  //         document.getElementById("password-tooltip").classList.add("invalid-tooltip");
  //         document.getElementById("password-tooltip").innerHTML = "Invalid password! Password must be at least 10 characters long!";
  //       }
  //       if (password !== repeatPassword) {
  //         document.getElementById("input-password").classList.add("is-invalid");
  //         document.getElementById("input-repeat-password").classList.add("is-invalid");
  //         document.getElementById("password-tooltip").classList.add("invalid-tooltip");
  //         document.getElementById("repeat-password-tooltip").classList.add("invalid-tooltip");
  //         document.getElementById("password-tooltip").innerHTML = "Passwords do not match!";
  //         document.getElementById("repeat-password-tooltip").innerHTML = "Passwords do not match!";
  //       }
  //     }
  //   }
  //
  //   let firstName = document.getElementById("input-first-name").value;
  //   let lastName = document.getElementById("input-last-name").value;
  //   let password = document.getElementById("input-password").value;
  //   let repeatPassword = document.getElementById("input-repeat-password").value;
  //
  //   let updateData = JSON.stringify({"firstName": firstName, "lastName": lastName, "password": password});
  //   xhr.send(updateData);
  // }

}
