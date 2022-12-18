import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {LoginService} from "./services/login-service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MainPageComponent } from './components/main-view/main-page/main-page.component';
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
import { MainNavbarComponent } from './components/main-view/main-navbar/main-navbar.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import {MatMenuModule} from "@angular/material/menu";
import { RecyclingProgressComponent } from './components/main-view/recycling-progress/recycling-progress.component';
import { RetailerViewComponent } from './components/retailer-view/retailer-view.component';
import { VouchersListComponent } from './components/retailer-view/vouchers-list/vouchers-list.component';
import { VoucherComponent } from './components/retailer-view/vouchers-list/voucher/voucher.component';
import { AddNewVoucherDialogComponent } from './components/retailer-view/vouchers-list/voucher/add-new-voucher-dialog/add-new-voucher-dialog.component';
import { RecyclingProgressDialogComponent } from './components/main-view/recycling-progress/recycling-progress-dialog/recycling-progress-dialog.component';
import {RegisterComponent} from './components/register/register.component';
import { ManageAccountComponent } from './components/main-view/manage-account/manage-account.component';
import { SuccessfulDialogComponent } from './components/main-view/manage-account/successful-dialog/successful-dialog.component';

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
    MainNavbarComponent,
    MainViewComponent,
    RecyclingProgressComponent,
    RetailerViewComponent,
    VouchersListComponent,
    VoucherComponent,
    AddNewVoucherDialogComponent,
    RecyclingProgressDialogComponent,
    RegisterComponent,
    ManageAccountComponent,
    SuccessfulDialogComponent
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
    MatMenuModule,
  ],
  providers: [LoginService, MainPageOperationsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
