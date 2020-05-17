import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';///se agrego  ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,///se agrego
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
