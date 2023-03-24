import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private authservice:AuthService){}

  email: string='';
  password:string=''



submit(){

  this.authservice.createUser(this.email, this.password)
  this.email='';
  this.password='';

}

}
