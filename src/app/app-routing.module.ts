import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {ContactComponent} from "./components/pages/contact/contact.component";
import {BlogComponent} from "./components/pages/blog/blog.component";

const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"contact",component:ContactComponent},
  {path:"blog",component:BlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
