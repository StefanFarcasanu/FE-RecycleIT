import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {LoginService} from "./services/login-service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MainPageComponent } from './components/main-page/main-page.component';
import {MainPageOperationsService} from "./services/main-page-operations.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RequestsListComponent} from './components/recycling-company-view/requests-list/requests-list.component';
import {RequestComponent} from './components/recycling-company-view/requests-list/request/request.component';
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {LoadingSpinnerLoginComponent} from './components/utils/loading-spinner-login/loading-spinner-login.component';
import {RecyclingCompanyViewComponent} from './components/recycling-company-view/recycling-company-view.component';
import {
  RequestInfoDialogComponent
} from './components/recycling-company-view/requests-list/request/request-info-dialog/request-info-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {LoadingSpinnerComponent} from './components/utils/loading-spinner/loading-spinner.component';
import { AddNewVouchersComponent } from './components/add-new-vouchers/add-new-vouchers.component';
import {DatepickerDropdownPositionY, MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { SuccessfulPopUpComponent } from './components/add-new-vouchers/successful-pop-up/successful-pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    RequestsListComponent,
    RequestComponent,
    LoadingSpinnerComponent,
    RequestInfoDialogComponent,
    LoginComponent,
    MainPageComponent,
    LoadingSpinnerLoginComponent,
    RecyclingCompanyViewComponent,
    AddNewVouchersComponent,
    SuccessfulPopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [LoginService, MainPageOperationsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
