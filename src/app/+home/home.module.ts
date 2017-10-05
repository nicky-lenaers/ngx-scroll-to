import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ScrollToModule } from '../modules/scroll-to/scroll-to.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ScrollToModule.forRoot()
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
