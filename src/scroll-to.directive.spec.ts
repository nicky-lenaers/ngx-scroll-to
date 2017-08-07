import { Component, DebugElement, OnInit } from '@angular/core';
import { async, TestBed, fakeAsync, tick, getTestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { ScrollToModule } from './scroll-to.module';
import { ScrollToDirective } from './scroll-to.directive';
import { ScrollToService } from './scroll-to.service';
import { ScrollToConfigOptions } from './models/scroll-to-options.model';
import { EVENTS, DEFAULTS } from './statics/scroll-to-helpers';
import { DummyComponent, TARGET, BUTTON_ID } from './test/dummy.component';
import { ScrollToMockService } from './test/mock.service';
import { createFixtureWithTemplateOverride, CompileTemplateConfigOptions } from './test/helpers';

describe('ScrollToDirective', () => {

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
						useClass: ScrollToMockService
					}
				]
			});

	}));

	it('should be created', () => {
		const fixture = TestBed.createComponent(DummyComponent);
		const directive = fixture.debugElement.query(By.directive(ScrollToDirective));
		expect(directive).toBeTruthy();
	});

	it('should have default values', fakeAsync(() => {

		const fixture: ComponentFixture<DummyComponent> = TestBed.createComponent(DummyComponent);
		const service: ScrollToService = TestBed.get(ScrollToService);
		const component: DummyComponent = fixture.componentInstance;

		component.ngOnInit();

		fixture.detectChanges();

		spyOn(service, 'scrollTo');

		const btn = fixture.debugElement.query(By.css(`#${BUTTON_ID}`));
		const mouse_event: MouseEvent = new MouseEvent('click');

		btn.triggerEventHandler('click', mouse_event);
		tick();

		expect(service.scrollTo).toHaveBeenCalledWith(mouse_event, {
			target: TARGET,
			duration: DEFAULTS.duration,
			easing: DEFAULTS.easing,
			offset: DEFAULTS.offset,
			offsetMap: DEFAULTS.offsetMap
		});

	}));

	const testMouseEvent = (event: string) => {

		it(`should handle a '${event}' event`, fakeAsync(() => {

			const template_config: CompileTemplateConfigOptions = {
				target: TARGET,
				event: event
			}

			const fixture: ComponentFixture<DummyComponent> = createFixtureWithTemplateOverride(DummyComponent, template_config);
			const service: ScrollToService = TestBed.get(ScrollToService);
			const component: DummyComponent = fixture.componentInstance;

			component.ngOnInit();

			fixture.detectChanges();

			spyOn(service, 'scrollTo');

			const btn = fixture.debugElement.query(By.css(`#${BUTTON_ID}`));
			const mouse_event: MouseEvent = new MouseEvent('click');

			btn.triggerEventHandler(template_config.event, mouse_event);
			tick();

			expect(service.scrollTo).toHaveBeenCalledTimes(1);
			expect(service.scrollTo).toHaveBeenCalledWith(mouse_event, {
				target: TARGET,
				duration: DEFAULTS.duration,
				easing: DEFAULTS.easing,
				offset: DEFAULTS.offset,
				offsetMap: DEFAULTS.offsetMap
			});

		}));
	}

	EVENTS.forEach((event) => {
		testMouseEvent(event);
	});

});
