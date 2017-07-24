import { Component, DebugElement, OnInit } from '@angular/core';
import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { ScrollToModule } from './scroll-to.module';
import { ScrollToDirective } from './scroll-to.directive';

describe('ScrollToDirective', () => {

	let fixture: ComponentFixture<DummyComponent>;
	let dummy: DummyComponent;
	let directive: DebugElement;

	beforeEach(async(() => {

		TestBed
			.configureTestingModule({
				imports: [
					ScrollToModule.forRoot()
				],
				declarations: [
					DummyComponent
				]
			})
			.compileComponents();

		fixture = TestBed.createComponent(DummyComponent);
		dummy = fixture.componentInstance;
		directive = fixture.debugElement.query(By.directive(ScrollToDirective));

		fixture.detectChanges();
	}));

	it('should be created', () => {
		expect(directive).toBeTruthy();
	});

});

@Component({
	selector: 'ngx-scroll-to',
	template: `
		<button [ngx-scroll-to]="'destination'">Go to destination</button>
		<div id="destination">You've reached your destination</div>
	`
})
export class DummyComponent implements OnInit {

	constructor() { }

	public ngOnInit() { }
}
