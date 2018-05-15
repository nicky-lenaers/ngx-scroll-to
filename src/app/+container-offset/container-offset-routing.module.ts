import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerOffsetComponent } from './container-offset.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerOffsetComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ContainerOffsetRoutingModule { }
