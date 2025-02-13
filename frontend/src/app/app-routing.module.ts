import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";


const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  {path : "home" , component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})


export class AppRoutingModule { 

}
