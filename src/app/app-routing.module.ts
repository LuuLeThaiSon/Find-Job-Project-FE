import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {ContactComponent} from "./components/pages/contact/contact.component";
import {BlogComponent} from "./components/pages/blog/blog.component";
import {CompanyListComponent} from "./components/pages/company-list/company-list.component";
import {JobListComponent} from "./components/pages/job-list/job-list.component";
import {RegisterComponent} from "./components/pages/register/register.component";
import {LoginComponent} from "./components/pages/login/login.component";

const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"contact",component:ContactComponent},
  {path:"blog",component:BlogComponent},
  {path:"company",component:CompanyListComponent},
  {path:"job",component:JobListComponent},
  {path:"register", component: RegisterComponent},
  {path:"login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
