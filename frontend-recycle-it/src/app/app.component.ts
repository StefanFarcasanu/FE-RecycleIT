import {Component, OnInit} from '@angular/core';
import {LoginService} from "./services/login-service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.autoLogin();
  }
}
