import { Component, OnInit} from '@angular/core';
///se agregaron estos dos importsmpara agregar el formulario, validar el formulario
import { NavController } from '@ionic/angular';
import {FormBuilder,FormGroup,Validators ,FormControl,AbstractControl,ValidatorFn} from '@angular/forms';
///import para navegar entre ventanas, ademas para iniciar sesion,tambien alertas
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {AlertController} from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  ngOnInit(): void { 
  }
  //// form o formulario
  myForm: FormGroup; 
  ///constructor
  constructor(private authSvc:AuthService,private router:Router,private alertCtrl: AlertController,public navCtrl: NavController,public fb: FormBuilder) {
    this.myForm = this.fb.group({ 
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),Validators.minLength(5),Validators.required]],
      confirmPassword: ['', [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),Validators.minLength(5),Validators.required]],
      }, {
        validator: MustMatch('password', 'confirmPassword')
    });
  }
  //funcion para acceder a los controles del form o formulario
  get f() { return this.myForm.controls; }

  ///funcion para registrar nuevo usuario con correo y contrasena
  async Registrarse(){
    try{
      //console.log("email:"+this.myForm.value.email+" pass:"+this.myForm.value.password);
      ////se accede al login enviando el modelo de form email y password
      this.authSvc.doRegister(this.myForm.value).then(res=>{
        ///si el login es true se abre la ventana 
        if(res){
          ///limpiamos el formulario
          this.myForm.reset();
          ////lo mandamos al login
          this.router.navigateByUrl('/login');
        }
      }, async err =>{
        console.log(err);
        const alert = await this.alertCtrl.create({
          header: 'Registro Fallo',
          message: err,
          buttons: ['OK']
        });
        await alert.present();
      }); 
    }
    catch(error){
      const alert = await this.alertCtrl.create({
        header: 'Registro Fallo',
        message: error,
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  ///cambiar el tipo de input en la contrasena, asi tambien el nombre o name del icono eye
  managePassword(input: any,icon: any,): any {
    //input.type = input.type == 'password' ?  'text' : 'password';
      if (input.type == 'text') {
        input.type ='password';
        icon.name='eye-off-outline';
      }else {
      input.type ='text';
      icon.name='eye-outline';
      }
  }

}
// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}