import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { TestBed, async } from '@angular/core/testing';
import { ScrollToService } from './scroll-to.service';

class MockDocument { }

/**
 * @todo provide platform ID aswell
 */
describe('ScrollToService', () => {

	let service: ScrollToService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: DOCUMENT, useClass: MockDocument
				},
				ScrollToService
			]
		});

		service = TestBed.get(ScrollToService);
	}));

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should have a public function called `onTrigger`', () => {
		expect(service.onTrigger instanceof Function).toBeTruthy();
	});
});
