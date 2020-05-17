import { Component } from '@angular/core';
///import para navegar entre ventanas, ademas para cerrar sesion,tambien alertas
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {AlertController} from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage { 
  email:any=""
  constructor(private authSvc:AuthService,private router:Router,private alertCtrl:AlertController) {
    //console.log(this.authSvc.ofAuth.auth.currentUser.email);
    ///tomar la actual sesion y mostrar el email del actual usuario
    authSvc.ofAuth.authState.subscribe(auth  =>{
      if (auth) { 
        this.email=auth.email; 
     }
     else{
      this.email= ""; 
     }
    }); 
  }
  ///funcion cerrar sesion
  async logout(){
    try{ 
      //console.log("email:"+this.myForm.value.email+" pass:"+this.myForm.value.password);
      ////no se requiere ningun parametro solo se elimina la actual sesion
      this.authSvc.doLogout().then(res=>{
        ///si el login es true se abre la ventana
        this.router.navigateByUrl('/login');
      }, async err =>{
        const alert = await this.alertCtrl.create({
          header: 'Logout Failed',
          message: err,
          buttons: ['OK']
        });
        await alert.present();
      }); 
    }
    catch(error){
      const alert = await this.alertCtrl.create({
        header: 'Logout Failed',
        message: error,
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
