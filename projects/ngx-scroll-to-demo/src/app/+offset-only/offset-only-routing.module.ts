import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffsetOnlyComponent } from './offset-only.component';

const routes: Routes = [
  {
    path: '',
    component: OffsetOnlyComponent
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
export class OffsetOnlyRoutingModule { }
