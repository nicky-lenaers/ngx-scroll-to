import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ContainerTargetRoutingModule
} from './container-target-routing.module';
import {
  ContainerTargetComponent
} from './container-target.component';

@NgModule({
  imports: [
    CommonModule,
    ContainerTargetRoutingModule
  ],
  declarations: [
    ContainerTargetComponent
  ]
})
export class ContainerTargetModule { }
