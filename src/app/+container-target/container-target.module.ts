import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ContainerTargetRoutingModule
} from './container-target-routing.module';
import {
  ContainerTargetComponent
} from './container-target.component';
import { ScrollToModule } from '../modules/scroll-to/scroll-to.module';

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
