import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  GoogleAuthProvider , FacebookAuthProvider} from "@angular/fire/auth/";
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
    return this.Auth.createUserWithEmailAndPassword(email, password)
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
   return this.Auth.signInWithEmailAndPassword(email, password)
      .then((res:any) => {
       this.isuserloggedin.next(true)
        localStorage.setItem('user',JSON.stringify(res.user?.uid));
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid Email or Password");
      });
    }
signInwithGoogle(){
  return this.Auth.signInWithPopup(new GoogleAuthProvider).then((res)=>{
    this.isuserloggedin.next(true)
        localStorage.setItem('user',JSON.stringify(res.user?.uid));
        this.router.navigate(['/home']);
  })
  .catch((err) => {
    alert(err)
  });
}
signInwithFB(){
  return this.Auth.signInWithPopup(new FacebookAuthProvider).then((res:any)=>{
    this.isuserloggedin.next(true)
        localStorage.setItem('user',JSON.stringify(res.body));
        this.router.navigate(['/home']);
  })
  .catch((err) => {
    alert(err)
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

    fetchTrendingSongs(){
     const itemsRef: AngularFireList<any> =this.db.list('Trending');
     return itemsRef
    }
    fetchPopularSongs(){
      const itemsRef: AngularFireList<any> =this.db.list('Popular');
      return itemsRef
     }

  }
