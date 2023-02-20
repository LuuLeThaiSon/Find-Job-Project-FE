import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

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
import { JobDetailComponent } from './components/pages/job-detail/job-detail.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environments} from "../environment/enviroments";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  ManageCompanyProfileComponent
} from "./components/pages/manage-company-profile/manage-company-profile.component";
import {BookmarksJobsComponent} from "./components/pages/bookmarks-jobs/bookmarks-jobs.component";
import { CandidateDetailComponent } from './components/pages/candidate-detail/candidate-detail.component';
import {RegisterCComponent} from "./components/pages/register-c/register-c.component";
import { TopCompaniesComponent } from './top-companies/top-companies.component';
import {SearchPipe} from "./search.pipe";
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ManageCandidateProfileComponent} from './components/pages/manage-candidate-profile/manage-candidate-profile.component';
import {JobListApplyComponent} from "./components/pages/job-list-apply/job-list-apply.component";
import {ComingsoonComponent} from "./components/pages/comingsoon/comingsoon.component";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MomentModule} from "ngx-moment";
// import { MomentModule } from 'ngx-moment';


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
    CompanyDetailComponent,
    ManageCompanyProfileComponent,
    CompanyDetailComponent,
    RegisterComponent,
    JobDetailComponent,
    BookmarksJobsComponent,
    CandidateDetailComponent,
    SearchPipe,
    TopCompaniesComponent,
    ManageCandidateProfileComponent,
    RegisterCComponent,
    ComingsoonComponent,
    JobListApplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environments.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environments.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MessageModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    ButtonModule,
    ProgressSpinnerModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    })
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
