import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
 ///Imports de los tres guards
import {AuthPageTabsGuard} from '../app/guards/auth-page-tabs.guard';
import {AuthPageloginGuard} from '../app/guards/auth-pagelogin.guard';
import {AuthPageRegisterGuard} from '../app/guards/auth-page-register.guard';

const routes: Routes = [
  {
    path: 'details',
    loadChildren: () =>                                         ////Asiganar el guard a Tabs
                                                                ////si esta logueado se mantiene si no se manda a login
      import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate:[AuthPageTabsGuard]
  },
  {
    path: 'login',
    loadChildren: () =>                                           ////Asiganar el guard a Login
                                                                  ///cuando se inicia sesion o se viene de registro se manda a tabs
      import('./login/login.module').then(m => m.LoginPageModule), canActivate:[AuthPageloginGuard]
  },
  {
    path: 'register',
    loadChildren: () =>                                                   ////Asiganar el guard a Register
                                                                          ////cuando se registra se manda a login
      import('./register/register.module').then(m => m.RegisterPageModule),canActivate:[AuthPageRegisterGuard]
  }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}