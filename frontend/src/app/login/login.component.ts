import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import {Location} from '@angular/common'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private loginService :LoginService ,
    private location : Location
    ) {
      this.loginForm=new FormGroup({
        email: new FormControl("", [
          Validators.required,
        ]),
        password: new FormControl("", [
          Validators.required,
        ]),
      });
     }
     get email() {
      return this.loginForm.get("email");
    }
  
    get password() {
      return this.loginForm.get("password");
    }

  ngOnInit(): void {
    console.log("login page");
  }
  login() {
    this.loginService.login(this.loginForm.value).subscribe((response)=>{
        localStorage.setItem("user-token",response["token"]);
        
        window.location.href = "/home";
    },(error)=>{
      alert("Can not  !")
    });
  }
}
