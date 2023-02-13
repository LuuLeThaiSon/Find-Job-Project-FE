import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { CompanyListComponent } from './components/pages/company-list/company-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { JobListComponent } from './components/pages/job-list/job-list.component';
import {LoginComponent} from "./components/pages/login/login.component";
import {RegisterComponent} from "./components/pages/register/register.component";
import { CompanyDetailComponent } from './components/pages/company-detail/company-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    BlogComponent,
    CompanyListComponent,
    JobListComponent,
    LoginComponent,
    RegisterComponent,
    CompanyDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
