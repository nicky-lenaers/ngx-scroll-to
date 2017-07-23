import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';

import { ScrollToModule } from './scroll-to.module';
import { ScrollToDirective } from './scroll-to.directive';

describe('ScrollToDirective', () => {

	beforeEach(async(() => {

		TestBed
			.configureTestingModule({
				imports: [
					ScrollToModule.forRoot()
				],
				declarations: [
					ScrollToTestComponent
				]
			})
			.compileComponents();
	}));

	it('should be created', () => {
		const fixture = TestBed.createComponent(ScrollToTestComponent);
		const directive = fixture.debugElement.query(By.directive(ScrollToDirective));
		expect(directive).toBeTruthy();
	});

	// it('should be able to test directive', async(() => {
	// 	TestBed.overrideComponent(ScrollToTestComponent, {
	// 		set: {
	// 			template: '<div my-directive></div>'
	// 		}
	// 	});
	// }));
});

@Component({
	selector: 'ngx-scroll-to',
	template: `
		<div [ngx-scroll-to]="'destination'">Go to destination</div>
		<div id="destination">You've reached your destination</div>
	`
})
export class ScrollToTestComponent {

}
