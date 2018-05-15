import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ContainerOffsetRoutingModule
} from './container-offset-routing.module';
import {
  ContainerOffsetComponent
} from './container-offset.component';
import { ScrollToModule } from '../modules/scroll-to/scroll-to.module';

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
