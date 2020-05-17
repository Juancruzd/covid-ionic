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
export class AuthPageTabsGuard implements CanActivate {
  ///agregamos las librerias en el contructor para poder utilizarlas
  constructor(private ofAuth: AngularFireAuth,private router:Router) {  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       ///si el usuario esta logeado lo dejamos en la actual pagina tabs,
      ///si no lo esta lo mandamos a la pagina de login y que el usuario elija iniciar sesion o registrarse en caso de tener usuario.
      return this.ofAuth.authState.pipe(map( auth =>{ 
        if (isNullOrUndefined(auth)) {
        ///no esta logueado lo mandamos al login
        this.router.navigateByUrl('/login');  
          return false;
       }
       else{
        /// esta logueado lo dejamos permanecer en la actual pagina TABS
        return true;
       }
      } )); 
  }
  
}
