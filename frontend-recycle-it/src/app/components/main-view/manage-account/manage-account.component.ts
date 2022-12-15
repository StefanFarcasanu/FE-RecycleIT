import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {MainPageOperationsService} from "../../../services/main-page-operations.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserDto} from "../../../models/userDto";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManageAccountComponent implements OnInit {

  _clientId!: number;
  _email!: string;
  _county!: string;
  _city!: string;
  _role!: string;
  userUpdatedDto!: UserDto;

  constructor(private router: Router, private mainService: MainPageOperationsService) { }

  updateAccountForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl({value: '', disabled:true}, [Validators.required]),
    county: new FormControl({value: '', disabled:true}, [Validators.required]),
    city: new FormControl({value: '', disabled:true}, [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  showFirstNameError = false;
  showLastNameError = false;
  showPasswordError = false;
  showPasswordsUnmatch = false;
  showConfirmPasswordError = false;

  isLoading = false;

  ngOnInit(): void {
    this.mainService.getClientDetails().subscribe(
      data => {
          let userJSON = data.body;
          this.updateAccountForm.controls['firstName'].setValue(userJSON.firstname);
          this.updateAccountForm.controls['lastName'].setValue(userJSON.lastname);
          this.updateAccountForm.controls['email'].setValue(userJSON.email);
          this.updateAccountForm.controls['county'].setValue(userJSON.county);
          this.updateAccountForm.controls['city'].setValue(userJSON.city);
          this.updateAccountForm.controls['password'].setValue(userJSON.password);
          this._email = userJSON.email;
          this._county = userJSON.county;
          this._city = userJSON.city;
          this._role = userJSON.role;
      },
      error => {
        alert("There was an error fetching the details of the client!")
      }
    );
  }

  onSubmit(form: FormGroup) {
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = this._email;
    const city = this._city;
    const county = this._county;
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;

    this.showFirstNameError = false;
    this.showLastNameError = false;
    this.showPasswordError = false;
    this.showPasswordsUnmatch = false;
    this.showConfirmPasswordError = false;

    if (firstName === null || firstName === "") {
      this.showFirstNameError = true;
    }

    if (lastName === null || lastName === "") {
      this.showLastNameError = true;
    }

    if (password === null || password === "" || password.length < 8) {
      this.showPasswordError = true;
    }

    if (password !== confirmPassword) {
      this.showPasswordsUnmatch = true;
    }

    if (confirmPassword === null || confirmPassword === "") {
      this.showConfirmPasswordError = true;
    }

    if (!this.showFirstNameError &&
      !this.showLastNameError  &&
      !this.showPasswordError &&
      !this.showConfirmPasswordError &&
      !this.showPasswordsUnmatch
    ) {

      this.isLoading = true;
      this.userUpdatedDto = new UserDto(this._clientId, firstName, lastName, email, password, county, city, this._role);
      this.mainService.updateClientAccount(this._clientId, this.userUpdatedDto)
        .subscribe((response) => {
            if (response) {
              this.isLoading = false;
              this.router.navigate(["/login"]);
            }
          },
          (err: HttpErrorResponse) => {
          let errors = err.error;

            if (errors.includes("first name")) {
                this.showFirstNameError = true;
            }

            if (errors.includes("last name")) {
              this.showLastNameError = true;
            }

            if (errors.includes("password")) {
              this.showPasswordError = true;
            }

            this.isLoading = false;

          });
      }
  }
}
