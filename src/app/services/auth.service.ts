import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn=false;
  public email="";
  constructor(public ofAuth: AngularFireAuth) { 
    ofAuth.authState.subscribe(auth  =>{
      if (auth) {
        console.log('DENTRO!!');
        //console.log(auth);
        this.isLoggedIn = true;
        return;
     }
     else{
      console.log('FUERA!!');
      this.isLoggedIn = false;
      return;
     }
    });
  }
  async doRegister(value){

   /** try{
        return await this.ofAuth.auth.createUserWithEmailAndPassword(value.email, value.password);
    } catch(error){
      console.log(error);
    }**/
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  async doLogin(value){
    /**try{
    return await this.ofAuth.auth.signInWithEmailAndPassword(value.email, value.password);
    }
    catch(error){
      console.log(error);
    }
    **/
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  async doLogout(){
    /**if(this.isLoggedIn){
      return await this.ofAuth.auth.signOut();
    }
    else{
      console.log("no esta logueado")
    }**/
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.ofAuth.auth.signOut();
        resolve();
      }
      else{
        reject();
      }
    });
  }
  async detailsuser(){
    /**if(this.isLoggedIn){
      return await this.ofAuth.auth
    }
    else{
      console.log("no esta logueado")
    }**/
      
    this.ofAuth.authState.subscribe(auth  =>{
        if (auth) { 
          return auth.email;
       }
       else{
        return "";
       }
      }); 
  }
}
