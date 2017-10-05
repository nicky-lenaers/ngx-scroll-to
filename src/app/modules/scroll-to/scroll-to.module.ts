import { NgModule, ModuleWithProviders } from '@angular/core';
import { ScrollToDirective } from './scroll-to.directive';
import { ScrollToService } from './scroll-to.service';

@NgModule({
  declarations: [
    ScrollToDirective
  ],
  exports: [
    ScrollToDirective
  ]
})
export class ScrollToModule {
  /**
   * Guaranteed singletons for provided Services across App.
   *
   * @return          An Angular Module with Providers
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ScrollToModule,
      providers: [
        ScrollToService
      ]
    };
  }
}
