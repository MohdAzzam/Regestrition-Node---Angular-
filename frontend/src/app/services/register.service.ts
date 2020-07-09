import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClint : HttpClient) { }

  reigster(form){
    return this.httpClint.post("http://localhost:3001/user/signup",form);
  }

}
