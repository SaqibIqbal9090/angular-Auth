import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase,AngularFireList, AngularFireObject } from "@angular/fire/compat/database";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isuserloggedin=new BehaviorSubject(false)
  constructor(
    private Auth: AngularFireAuth,
     private router: Router ,
     private db:AngularFireDatabase
     ) {}

   createUser(email: any, password: any) {
    this.Auth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if(res){
        this.router.navigate(['/login']);}
        
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }
  LoginUser(email: string, password: string) {
    this.Auth.signInWithEmailAndPassword(email, password)
      .then((res:any) => {
       this.isuserloggedin.next(true)
        localStorage.setItem('user',JSON.stringify(res.body));
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid Email or Password");
      });
    }
    reload(){
      if (localStorage.getItem('user')) {
        this.isuserloggedin.next(true)
        this.router.navigate(['/home']);  
      }
      if(!localStorage.getItem('user')){
        this.isuserloggedin.next(false)
        this.router.navigate(['/login'])
      }
   
    }
    UserSignout(){
      this.Auth.signOut().then(()=>{
        localStorage.removeItem('user');
        this.router.navigate(['/login'])
      })
    }

    fetchSongs(){
     const itemsRef: AngularFireList<any> =this.db.list('Trending');
     return itemsRef
    }

  }
