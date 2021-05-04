import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ContainerTargetRoutingModule } from './container-target-routing.module';
import { ContainerTargetComponent } from './container-target.component';

/** Container Target Module */
@NgModule({
  imports: [
    CommonModule,
    ContainerTargetRoutingModule,
    ScrollToModule.forRoot()
  ],
  declarations: [
    ContainerTargetComponent
  ]
})
export class ContainerTargetModule { }
