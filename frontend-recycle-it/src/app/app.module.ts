import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule, RoutingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {LoginService} from "./services/login-service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MainPageComponent} from './components/main-view/main-page/main-page.component';
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
import {MainNavbarComponent} from './components/main-view/main-navbar/main-navbar.component';
import {MainViewComponent} from './components/main-view/main-view.component';
import {MatMenuModule} from "@angular/material/menu";
import {RecyclingProgressComponent} from './components/main-view/recycling-progress/recycling-progress.component';
import {RetailerViewComponent} from './components/retailer-view/retailer-view.component';
import {VouchersListComponent} from './components/retailer-view/vouchers-list/vouchers-list.component';
import {VoucherComponent} from './components/retailer-view/vouchers-list/voucher/voucher.component';
import {AddNewVoucherDialogComponent} from './components/retailer-view/vouchers-list/voucher/add-new-voucher-dialog/add-new-voucher-dialog.component';
import {RecyclingProgressDialogComponent} from './components/main-view/recycling-progress/recycling-progress-dialog/recycling-progress-dialog.component';
import {RegisterComponent} from './components/register/register.component';
import {ManageAccountComponent} from './components/main-view/manage-account/manage-account.component';
import {SuccessfulDialogComponent} from './components/main-view/manage-account/successful-dialog/successful-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {SuccessfulPopUpComponent} from './components/retailer-view/vouchers-list/voucher/add-new-voucher-dialog/successful-pop-up/successful-pop-up.component';
import {MatInputModule} from "@angular/material/input";
import { MyVouchersComponent } from './components/main-view/my-vouchers/my-vouchers.component';
import { VoucherObjectComponent } from './components/main-view/my-vouchers/voucher-object/voucher-object.component';
import {MatRadioModule} from "@angular/material/radio";
import { AddedRequestDialogComponent } from './components/main-view/main-page/added-request-dialog/added-request-dialog.component';
import { DetailsDialogComponent } from './components/main-view/my-vouchers/voucher-object/details-dialog/details-dialog.component';
import { CheckValidityDialogComponent } from './components/main-view/my-vouchers/voucher-object/check-validity-dialog/check-validity-dialog.component';
import {RecyclingHistoryComponent} from './components/main-view/recycling-history/recycling-history.component';
import { NationalStatisticsComponent } from './components/main-view/national-statistics/national-statistics.component';
import { StatisticsDialogComponent } from './components/main-view/national-statistics/statistics-dialog/statistics-dialog.component';
import {NgChartsModule} from "ng2-charts";

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
    SuccessfulDialogComponent,
    RegisterComponent,
    RecyclingProgressDialogComponent,
    AddNewVoucherDialogComponent,
    RecyclingCompanyViewComponent,
    SuccessfulPopUpComponent,
    MyVouchersComponent,
    VoucherObjectComponent,
    AddedRequestDialogComponent,
    DetailsDialogComponent,
    CheckValidityDialogComponent,
    RecyclingHistoryComponent,
    NationalStatisticsComponent,
    StatisticsDialogComponent,
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
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatInputModule,
    NgChartsModule,
    MatRadioModule
  ],
  providers: [LoginService, MainPageOperationsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
