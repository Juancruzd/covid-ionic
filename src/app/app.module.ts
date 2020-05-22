import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
///se gregan las librerias o complementos de firebase asi como las firebaseConfig del proyecto
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from './../environments/environment';  

import{HttpClientModule} from '@angular/common/http'
import { ApiService } from './services/api.service'; 
import 'chartjs-plugin-zoom';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
      //inicializar nuestra conexion o aplicacion de firebase con sus configuraciones
      AngularFireModule.initializeApp(environment.firebaseConfig),///configuration firebase
      AngularFireAuthModule,///auth 
      HttpClientModule,////import http 
    ],
  providers: [
    ApiService,////provider
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
