import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToComponent } from './scroll-to.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ScrollToComponent],
  exports: [ScrollToComponent]
})
export class ScrollToModule { }
