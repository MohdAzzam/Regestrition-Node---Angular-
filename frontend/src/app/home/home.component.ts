import { Component, OnInit } from '@angular/core';
import { MeService } from '../services/me.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public name:string;
  public email :string;

  constructor(private MeServices :MeService) { }

  ngOnInit(): void {
    if(localStorage.getItem("user-token")=== undefined){
      window.location.href = "/login";
    }
    this.MeServices.getMyInfo().subscribe((response)=>{
     this.name=response["firstName"];
     this.email=response["email"];
     console.log("hi");
    },(error)=>{
      console.log(error);
      alert("Can not fuck !")
    });
  }

}
