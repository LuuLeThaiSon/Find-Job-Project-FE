import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {ContactComponent} from "./components/pages/contact/contact.component";
import {BlogComponent} from "./components/pages/blog/blog.component";
import {CompanyListComponent} from "./components/pages/company-list/company-list.component";
import {JobListComponent} from "./components/pages/job-list/job-list.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {RegisterComponent} from "./components/pages/register/register.component";
import {CompanyDetailComponent} from "./components/pages/company-detail/company-detail.component";
import {
  ManageCompanyProfileComponent
} from "./components/pages/manage-company-profile/manage-company-profile.component";
import {JobDetailComponent} from "./components/pages/job-detail/job-detail.component";

const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"contact",component:ContactComponent},
  {path:"blog",component:BlogComponent},
  {path:"company",component:CompanyListComponent},
  {path:"job",component:JobListComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path: "company", component: CompanyListComponent},
  {path: "job-detail/:id", component: JobDetailComponent},
  {path:"company-detail/:id",component:CompanyDetailComponent},
  {path:"manage-company-profile/:id",component:ManageCompanyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
