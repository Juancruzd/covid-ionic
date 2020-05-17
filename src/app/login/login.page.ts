import { Component, OnInit } from '@angular/core';
///se agregaron estos dos importsmpara agregar el formulario, validar el formulario
import { NavController } from '@ionic/angular';
import {FormBuilder,FormGroup,Validators ,FormControl} from '@angular/forms';
///import para navegar entre ventanas, ademas para registrarse,tambien alertas
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {AlertController} from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ngOnInit(): void { 
  }
  //// form o formulario
  myForm: FormGroup; 
  ///constructor
  constructor(private authSvc:AuthService,private router:Router,private alertCtrl:AlertController,public navCtrl: NavController,public fb: FormBuilder) {
    this.myForm = this.fb.group({ 
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),Validators.minLength(5),Validators.required]],
    });
  } 
  //funcion para acceder a los controles del form o formulario
  get f() { return this.myForm.controls; }

  ////funcion para Iniciar sesion con correo y contrasena
  async IniciarSesion(){
    try{ 
      //console.log("email:"+this.myForm.value.email+" pass:"+this.myForm.value.password);
      ////se accede al login enviando requeriendo el email y password
      this.authSvc.doLogin(this.myForm.value).then(res=>{
        ///si el login es true se abre la ventana 
        if(res){
        ///limpiamos el formulario
        this.myForm.reset();
        ////lo mandamos al alas tabs 
        this.router.navigateByUrl('/tabs');
        }
      }, async err =>{ 
        const alert = await this.alertCtrl.create({
          header: 'Iniciar sesion fallo',
          message: err,
          buttons: ['OK']
        });
        await alert.present();
      }); 
    }
    catch(error){
      const alert = await this.alertCtrl.create({
        header: 'Iniciar sesion fallo',
        message: error,
        buttons: ['OK']
      });
      await alert.present();
    }
  }
///cambiar el tipo de input en la contrasena, asi tambien el nombre o name del icono eye
  managePassword(input: any,icon: any,): any {
      if (input.type == 'text') {
        input.type ='password';
        icon.name='eye-off-outline';
      }else {
      input.type ='text';
      icon.name='eye-outline';
      }
  }

}
