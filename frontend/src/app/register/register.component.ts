import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { RegisterService } from "src/app/services/register.service";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private registerService :RegisterService ) {
    this.registerForm = new FormGroup({
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
      firstName: new FormControl("", [
        Validators.required,
      ]),
      lastName: new FormControl("", [
        Validators.required,
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"
        ),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
   }

   
  get firstName() {
    return this.registerForm.get("firstName");
  }

  get lastName() {
    return this.registerForm.get("lastName");
  }

  get phoneNumber() {
    return this.registerForm.get("phoneNumber");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }

  public errorMessages = {
    username: [
      {
        type: "required",
        message: "Username is required !",
      },
      {
        type: "minlength",
        message: "Username should contain at least 4 characters !",
      },
    ],
    firstName: [
      {
        type: "required",
        message: "First Name is required !",
      },
    ],
    lastName: [
      {
        type: "required",
        message: "Last Name is required !",
      },
    ],
    password: [
      {
        type: "required",
        message: "Password is required !",
      },
      {
        type: "minlength",
        message: "Password should contain at least 6 characters !",
      },
    ],
    email: [
      {
        type: "required",
        message: "Email is required !",
      },
      {
        type: "pattern",
        message: "Email is not a valid email address. !",
      },
    ],
  };

  ngOnInit(): void {
  }

  register() {
    this.registerService.reigster(this.registerForm.value).subscribe((response)=>{
        localStorage.setItem("user-token",response["token"]);
    },(error)=>{
      alert("Can not Register !")
    });
  }

}
