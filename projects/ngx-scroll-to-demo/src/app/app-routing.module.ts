import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./+home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'container-target',
    loadChildren: () => import('./+container-target/container-target.module').then(m => m.ContainerTargetModule)
  },
  {
    path: 'container-offset',
    loadChildren: () => import('./+container-offset/container-offset.module').then(m => m.ContainerOffsetModule)
  },
  {
    path: 'offset-only',
    loadChildren: () => import('./+offset-only/offset-only.module').then(m => m.OffsetOnlyModule)
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [],
  providers: [],
})
export class AppRoutingModule { }
