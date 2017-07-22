import { async, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ScrollToDirective } from './scroll-to.directive';

describe('ScrollToDirective', () => {

	beforeEach(async(() => {

		TestBed
			.configureTestingModule({
				declarations: [
					ScrollToDirective
				]
			})
			.compileComponents();
	}));

	it('should be created', () => {
		const fixture = TestBed.createComponent(ScrollToDirective);
		const directive = fixture.debugElement.componentInstance;
		expect(directive).toBeTruthy();
	});
});
