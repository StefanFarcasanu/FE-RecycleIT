import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login-service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../services/register-service";
import jwtDecode from "jwt-decode";
import {JWTPayload} from "../login/login.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private registerService: RegisterService, private router: Router) {
  }

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    county: new FormControl('', [Validators.required]),
  });


  showFirstNameError = false;
  showLastNameError = false;
  showEmailError = false;
  showPasswordError = false;
  showCityError = false;
  showCountyError = false;
  showPasswordsUnmatch = false;
  showConfirmPasswordError = false;

  isLoading = false;
  responseError = null;

  selectedCounty = "";
  selectedCity = "";

  countiesList = ['County'];
  citiesList = ['City'];

  messageError = [''];

  onSubmit(form: FormGroup) {
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;
    const city = this.selectedCity;
    const county = this.selectedCounty;
    const confirmPassword = form.value.confirmPassword;

    this.showFirstNameError = false;
    this.showLastNameError = false;
    this.showEmailError = false;
    this.showPasswordError = false;
    this.showCityError = false;
    this.showCountyError = false;
    this.showPasswordsUnmatch = false;
    this.showConfirmPasswordError = false;

    this.responseError = null;

    if (firstName == null || firstName == "") {
      this.showFirstNameError = true;
    }

    if (lastName == null || lastName == "") {
      this.showLastNameError = true;
    }

    if (!(email == null || email == "" || !this.emailPattern(email))) {
    } else {
      this.showEmailError = true;
    }

    if (password == null || password == "" || password.length < 8) {
      this.showPasswordError = true;
    }

    if (county == null || county == "" || county == 'County') {
      this.showCountyError = true;
    }

    if (city == null || city == "" || city == 'City') {
      this.showCityError = true;
    }

    if (password != confirmPassword) {
      this.showPasswordsUnmatch = true;
    }

    if (confirmPassword == null || confirmPassword == "") {
      this.showConfirmPasswordError = true;
    }

    if (email && password && firstName && lastName && city && county) {
      this.isLoading = true;
      this.registerService.register(firstName, lastName, email, password, city, county).subscribe(() => {
          this.isLoading = false;
          this.responseError = null;
        },
        error => {
          this.responseError = error.error;
          this.isLoading = false;
        });
      this.router.navigate(["/login"])
    } else {
      let error = String("Register failed because:\n");

      if (this.showFirstNameError) {
        error += "Invalid First Name!\n";
      }

      if (this.showLastNameError) {
        error += "Invalid Last Name!\n";
      }

      if (this.showEmailError) {
        error += "Invalid Email!\n";
      }

      if (this.showPasswordError) {
        error += "Invalid Password!\n";
      }

      if (this.showPasswordsUnmatch) {
        error += "Passwords do not match!\n";
      }

      if (this.showCountyError) {
        error += "County not selected!\n";
      }

      if (this.showCityError) {
        error += "City not selected!\n";
      }

      if (error != '') {
        alert(error);
        // form.reset();
      }
    }
  }

  login() {
    this.router.navigate(["/login"])
  }

  getCitiesFromCounty(county: string) {
    console.log("Selected county: " + county)
    this.selectedCounty = county;
    fetch("https://roloca.coldfuse.io/orase/" + county)
      .then(response => response.json())
      .then(response => {
        for (let i = 0; i < response.length; i++) {
          console.log(response[i].nume)
          this.citiesList.push(response[i].nume)
        }
      });
  }

  getAllCounties() {
    fetch("https://roloca.coldfuse.io/judete")
      .then(response => response.json())
      .then(response => {
        for (let i = 0; i < response.length; i++) {
          console.log(response[i].nume)
          this.countiesList.push(response[i].auto)
        }
      });
    console.log(this.countiesList)
  }

  emailPattern(email: string) {
    return RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}').test(email);
  }

  selectCity(city: string) {
    this.selectedCity = city;
  }
}
