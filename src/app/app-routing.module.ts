import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: './+home/home.module#HomeModule'
  },
  {
    path: 'container-target',
    loadChildren: './+container-target/container-target.module#ContainerTargetModule'
  },
  {
    path: 'container-offset',
    loadChildren: './+container-offset/container-offset.module#ContainerOffsetModule'
  },
  {
    path: 'offset-only',
    loadChildren: './+offset-only/offset-only.module#OffsetOnlyModule'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [],
  providers: [],
})
export class AppRoutingModule { }
