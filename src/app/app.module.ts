import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {HttpClientModule} from "@angular/common/http";
import { CompanyListComponent } from './components/pages/company-list/company-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {FormsModule} from "@angular/forms";
import { JobListComponent } from './components/pages/job-list/job-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CompanyListComponent,
    JobListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
