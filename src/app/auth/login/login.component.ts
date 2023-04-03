import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private authservice:AuthService){}
  ngOnInit(){
    this.authservice.reload();
    
  }

  email: string='';
  password:string='';



submit(){

  this.authservice.LoginUser(this.email, this.password)
  this.email='';
  this.password;

}
signInwithGoogle(){
  this.authservice.signInwithGoogle()
}
signInwithFB(){
  this.authservice.signInwithFB()
}

}
