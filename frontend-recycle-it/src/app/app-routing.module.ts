import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RequestsListComponent} from "./components/recycling-company-view/requests-list/requests-list.component";

const routes: Routes = [
  {
    path: "requests-list",
    component: RequestsListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [RequestsListComponent];
