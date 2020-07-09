import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClint : HttpClient) { }

  login(data){
    return this.httpClint.post("http://localhost:3001/user/login",data);
  }

}
