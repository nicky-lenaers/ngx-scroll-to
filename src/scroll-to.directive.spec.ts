import { Component, DebugElement, OnInit } from '@angular/core';
import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { ScrollToModule } from './scroll-to.module';
import { ScrollToDirective } from './scroll-to.directive';
import { ScrollToService } from './scroll-to.service';

describe('ScrollToDirective', () => {

	let fixture: ComponentFixture<DummyComponent>;
	let dummy: DummyComponent;
	let directive: DebugElement;
	let service: ScrollToService;

	beforeEach(async(() => {

		TestBed
			.configureTestingModule({
				imports: [
					ScrollToModule.forRoot()
				],
				declarations: [
					DummyComponent
				],
				providers: [
					{
						provide: ScrollToService,
						useClass: MockService
					}
				]
			})
			.compileComponents();

		fixture = TestBed.createComponent(DummyComponent);
		dummy = fixture.componentInstance;
		directive = fixture.debugElement.query(By.directive(ScrollToDirective));
		service = TestBed.get(ScrollToService);
		// service = fixture.debugElement.injector.get(ScrollToService);

		fixture.detectChanges();
	}));

	it('should be created', () => {
		expect(directive).toBeTruthy();
	});

	it(`should handle 'click' event`, fakeAsync(() => {

		spyOn(service, 'scrollTo');

		let btn = fixture.debugElement.query(By.css('#btn-1'));
		btn.triggerEventHandler('click', null);

		// Simulates the passage of time until all pending asynchronous activities finish
		tick();

		expect(service.scrollTo).toHaveBeenCalledTimes(1);
	}));

});

@Component({
	selector: 'ngx-scroll-to',
	styles: [`
		#destination {
			margin-top: 100vh;
		}
	`],
	template: `
		<button id="btn-1" [ngx-scroll-to]="'destination'">Go to destination</button>
		<div id="destination">You've reached your destination</div>
	`
})
export class DummyComponent implements OnInit {

	constructor() { }

	public ngOnInit() { }
}

export class MockService {
	public scrollTo() { }
}
