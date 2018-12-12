import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ContainerOffsetRoutingModule } from './container-offset-routing.module';
import { ContainerOffsetComponent } from './container-offset.component';

/** Container Offset Module */
@NgModule({
  imports: [
    CommonModule,
    ContainerOffsetRoutingModule,
    ScrollToModule.forRoot()
  ],
  declarations: [
    ContainerOffsetComponent
  ]
})
export class ContainerOffsetModule { }
