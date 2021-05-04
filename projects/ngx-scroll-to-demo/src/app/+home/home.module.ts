import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

/** Home Module */
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
