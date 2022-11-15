import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequestsListComponent} from "./components/recycling-company-view/requests-list/requests-list.component";
import {LoginComponent} from "./components/login/login.component";
import {MainViewComponent} from "./components/main-view/main-view.component";
import {AuthGuard} from "./components/login/auth.guard";
import {RecyclingCompanyViewComponent} from "./components/recycling-company-view/recycling-company-view.component";
import {AuthRecyclingCompanyGuard} from "./components/login/auth-recycling-company.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-view',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main-view',
    component: MainViewComponent,
    canActivate: [AuthGuard]
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const RoutingComponents = [LoginComponent, MainViewComponent, RequestsListComponent];
