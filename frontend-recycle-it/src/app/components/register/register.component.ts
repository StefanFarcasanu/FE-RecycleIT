import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../services/register-service";
import {CountyModel} from "../../models/county.model";
import {HttpResponse} from "@angular/common/http";
import {UserDto} from "../../models/userDto";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ngOnInit(): void {
    this.getAllCounties();
  }

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
  showExistingEmailError = false;
  showPasswordError = false;
  showCityError = false;
  showCountyError = false;
  showPasswordsUnmatch = false;
  showConfirmPasswordError = false;
  isLoading = false;
  selectedCounty = "";
  selectedCity = "";
  countiesList = [new CountyModel("", "County")];
  citiesList = ['City'];
  usersList = [];

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
    this.showExistingEmailError = false;
    this.showPasswordError = false;
    this.showCityError = false;
    this.showCountyError = false;
    this.showPasswordsUnmatch = false;
    this.showConfirmPasswordError = false;

    if (firstName == null || firstName == "") {
      this.showFirstNameError = true;
    }

    if (lastName == null || lastName == "") {
      this.showLastNameError = true;
    }

    if (email == null || email == "" || !this.emailPattern(email)){
      this.showEmailError = true;
    } else if (!this.existEmail(email)) {
      this.showExistingEmailError = true;
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

    if (!this.showFirstNameError &&
      !this.showLastNameError &&
      !this.showCountyError &&
      !this.showCityError &&
      !this.showEmailError &&
      !this.showPasswordError &&
      !this.showConfirmPasswordError &&
      !this.showPasswordsUnmatch
    ) {

      this.isLoading = true;
      this.registerService.register(firstName, lastName, email, password, city, county).subscribe(() => {
          this.isLoading = false;
          this.router.navigate(["/login"]);
        },
        error => {
          let errors = error.error;

          if (errors.includes("first name")) {
            this.showFirstNameError = true;
          }
          if (errors.includes("last name")) {
            this.showLastNameError = true;
          }
          if (errors.includes("password")) {
            this.showPasswordError = true;
          }
          if (errors.includes("email")) {
            this.showEmailError = true;
          }
          if (errors.includes("county")) {
            this.showCountyError = true;
          }
          if (errors.includes("city")) {
            this.showCityError = true;
          }
          this.isLoading = false;
        });
    }
  }

  login() {
    this.router.navigate(["/login"])
  }

  getCitiesFromCounty(county: string) {
    this.selectedCounty = county;
    fetch("https://roloca.coldfuse.io/orase/" + county)
      .then(response => response.json())
      .then(response => {
        this.citiesList = ['City'];
        for (let i = 0; i < response.length; i++) {
          this.citiesList.push(response[i].nume)
        }
      });
  }

  getAllCounties() {
    fetch("https://roloca.coldfuse.io/judete")
      .then(response => response.json())
      .then(response => {
        this.countiesList = [new CountyModel("", "County")];
        for (let i = 0; i < response.length; i++) {
          this.countiesList.push(new CountyModel(response[i].auto, response[i].nume))
        }
      });
  }

  getAllUsers() {
    this.registerService.getAllUsers().subscribe(
      data => {
        this.usersList = data.body.email;
      }
    )
  }


  emailPattern(email: string) {
    return RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}').test(email);
  }

  selectCity(city: string) {
    this.selectedCity = city;
  }

  existEmail(email: string) {
    for (var i = 0, emails = this.usersList; i < emails.length; i++) {
      if (emails[i] === email)
        return true;
    }
    return false;
  }
}
