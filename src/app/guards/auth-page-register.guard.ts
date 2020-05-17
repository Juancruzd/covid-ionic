import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

/////importamos las librerias a utilizar
import { AngularFireAuth } from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import { isUndefined, isNullOrUndefined } from 'util';
@Injectable({
  providedIn: 'root'
})
export class AuthPageRegisterGuard implements CanActivate {
  ///agregamos las librerias en el contructor para poder utilizarlas
  constructor(private ofAuth: AngularFireAuth,private router:Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      ///si el usuario esta logeado lo mandamos a alas tabs ya que no es necesario que este se vuelva a registrarse,
      ///si no lo esta lo dejamos en la actual pagina.
      return this.ofAuth.authState.pipe(map( auth =>{ 
        if (isNullOrUndefined(auth)) { 
          ////no esta logueado se queda en la pagina para registrarse si no esta registrado 
          return true;
       }
       else{ 
         ///esta logueado lo mandamos alas tabs
        this.router.navigateByUrl('/tabs');  
        return false;
       }
      } )); 
  }
  
}
