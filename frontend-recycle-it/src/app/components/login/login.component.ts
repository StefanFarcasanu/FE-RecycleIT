import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login-service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";

export interface JWTPayload {
  exp: number;
  iat: number;
  iss: string;
  scope: string;
  sub: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  showEmailError = false;
  showPasswordError = false;
  isLoading = false;
  responseError = null;

  get email() {
    return this.loginForm.get('input-email');
  }

  get password() {
    return this.loginForm.get('input-password');
  }

  onSubmit(form: FormGroup) {
    const email = form.value.email;
    const password = form.value.password;
    console.log(email);
    console.log(password);
    this.showEmailError = false;
    this.showPasswordError = false;
    this.responseError = null;

    if (email == null || email == "") {
      this.showEmailError = true;
    }

    if (password == null || password == "") {
      this.showPasswordError = true;
    }

    if (email && password) {
      this.isLoading = true;
      this.loginService.login(email, password).subscribe(() => {
          this.isLoading = false;
          this.responseError = null;
          this.router.navigate(["/main-page"]);
        },
        error => {
          this.responseError = error.error;
          this.isLoading = false;
        });
      form.reset();
    }
  }
}
