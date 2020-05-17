import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
 
const routes: Routes = [
  {
    path: '',
    redirectTo: '/details/global',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'global',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'country',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      { 
        path: 'information',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      }
    ]
  }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}