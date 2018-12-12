import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerTargetComponent } from './container-target.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerTargetComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

/** Container Target Routing Module */
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ContainerTargetRoutingModule { }
