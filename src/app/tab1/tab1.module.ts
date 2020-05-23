import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module'; 
///import grafica
import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    ChartsModule///import para graficas
  ],
  declarations: [Tab1Page],
  ///Datepipe formatter date
  providers: [DatePipe]
})
export class Tab1PageModule {}
