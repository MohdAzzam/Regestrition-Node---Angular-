import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MeService {

  constructor(private httpClint : HttpClient) { }

  getMyInfo(){
    const accessToken =  localStorage.getItem("user-token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: accessToken,
    });
    return this.httpClint.get("http://localhost:3001/user/me",{headers : headers});
  }
}
