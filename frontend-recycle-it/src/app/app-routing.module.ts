import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequestsListComponent} from "./components/recycling-company-view/requests-list/requests-list.component";
import {LoginComponent} from "./components/login/login.component";
import {MainPageComponent} from "./components/main-view/main-page/main-page.component";
import {AuthGuard} from "./components/login/auth.guard";
import {RecyclingCompanyViewComponent} from "./components/recycling-company-view/recycling-company-view.component";
import {AuthRecyclingCompanyGuard} from "./components/login/auth-recycling-company.guard";
import {MainViewComponent} from "./components/main-view/main-view.component";
import {RecyclingProgressComponent} from "./components/main-view/recycling-progress/recycling-progress.component";
import {RetailerViewComponent} from "./components/retailer-view/retailer-view.component";
import {VouchersListComponent} from "./components/retailer-view/vouchers-list/vouchers-list.component";
import {AuthRetailerGuard} from "./components/login/auth-retailer.guard";
import {RegisterComponent} from "./components/register/register.component";
import {
  AddNewVoucherDialogComponent
} from "./components/retailer-view/vouchers-list/voucher/add-new-voucher-dialog/add-new-voucher-dialog.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-view/main-page',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main-view',
    component: MainViewComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'main-page',
        pathMatch: 'full'
      },
      {
        path: "main-page",
        component: MainPageComponent
      },
      {
        path: "recycling-progress",
        component: RecyclingProgressComponent
      }
    ]
  },
  {
    path: "recycling-company-view",
    component: RecyclingCompanyViewComponent,
    canActivate: [AuthRecyclingCompanyGuard],
    children: [
      {
        path: "requests-list",
        component: RequestsListComponent
      }
    ]
  },
  {
    path: "retailer-view",
    component: RetailerViewComponent,
    canActivate: [AuthRetailerGuard],
    children: [
      {
        path: "vouchers-list",
        component: VouchersListComponent
      },
      {
        path: "add-new-vouchers",
        component: AddNewVoucherDialogComponent,
        canActivate: [AuthRetailerGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const RoutingComponents = [LoginComponent, MainViewComponent, MainPageComponent, RequestsListComponent, VouchersListComponent];
