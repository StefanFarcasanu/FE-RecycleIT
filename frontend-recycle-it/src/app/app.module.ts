import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule, RoutingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestsListComponent } from './components/recycling-company-view/requests-list/requests-list.component';
import { RequestComponent } from './components/recycling-company-view/requests-list/request/request.component';
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import { LoadingSpinnerComponent } from './components/utils/loading-spinner/loading-spinner.component';
import { RequestInfoDialogComponent } from './components/recycling-company-view/requests-list/request/request-info-dialog/request-info-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    RequestsListComponent,
    RequestComponent,
    LoadingSpinnerComponent,
    RequestInfoDialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatListModule,
        MatDialogModule,
        MatButtonModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
