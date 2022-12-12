import {Component} from '@angular/core';
import {LoginService} from "../../services/login-service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import jwtDecode from "jwt-decode";

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
          const token = localStorage.getItem("token");
          const payload = jwtDecode(token!) as JWTPayload;

          if (payload.scope === "ROLE_CLIENT") {
            this.router.navigate(["/main-view/main-page"]);
          }
          if (payload.scope === "ROLE_COMPANY") {
            this.router.navigate(["/recycling-company-view/requests-list"]);
          }
        },
        error => {
          this.responseError = error.error;
          this.isLoading = false;
        });
      form.reset();
    }
  }
}
