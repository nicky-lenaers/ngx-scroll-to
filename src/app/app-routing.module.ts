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
