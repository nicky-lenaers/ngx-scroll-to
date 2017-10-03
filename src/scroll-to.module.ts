import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToDirective } from './scroll-to.directive';
import { ScrollToService } from './scroll-to.service';

@NgModule({
	imports: [
		CommonModule
	],
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
	 * @return 				An Angular Module with Providers
	 */
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ScrollToModule,
			providers: [
				ScrollToService
			]
		}
	}
}
