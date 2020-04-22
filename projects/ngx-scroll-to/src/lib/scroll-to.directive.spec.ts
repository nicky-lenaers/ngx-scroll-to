import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ScrollToModule } from './scroll-to.module';
import { ScrollToDirective } from './scroll-to.directive';
import { ScrollToService } from './scroll-to.service';
import { DEFAULTS, EVENTS } from './scroll-to-helpers';
import { BUTTON_ID, DummyComponent, TARGET } from '../test/test-dummy.component';
import { ScrollToServiceMock } from '../test/test-mock.service';
import { CompileTemplateConfigOptions, createTestComponent } from '../test/test-helpers';
import { ScrollToEvent } from './scroll-to-event.interface';

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
            useClass: ScrollToServiceMock
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
    const service: ScrollToService = TestBed.inject(ScrollToService);
    const component: DummyComponent = fixture.componentInstance;

    component.ngOnInit();

    fixture.detectChanges();

    spyOn(service, 'scrollTo');

    const btn = fixture.debugElement.query(By.css(`#${BUTTON_ID}`));

    btn.triggerEventHandler('click', null);
    tick();

    expect(service.scrollTo).toHaveBeenCalledWith({
      target: TARGET,
      duration: DEFAULTS.duration,
      easing: DEFAULTS.easing,
      offset: DEFAULTS.offset,
      offsetMap: DEFAULTS.offsetMap
    });

  }));

  const testMouseEvent = (event: ScrollToEvent) => {

    it(`should handle a '${event}' event`, fakeAsync(() => {

      const templateConfig: CompileTemplateConfigOptions = {
        target: TARGET
      };

      const fixture: ComponentFixture<DummyComponent> = createTestComponent(DummyComponent, templateConfig, event);
      const service: ScrollToService = TestBed.inject(ScrollToService);
      const component: DummyComponent = fixture.componentInstance;

      component.ngOnInit();

      fixture.detectChanges();

      spyOn(service, 'scrollTo');

      const btn = fixture.debugElement.query(By.css(`#${BUTTON_ID}`));

      btn.triggerEventHandler(event, null);
      tick();

      expect(service.scrollTo).toHaveBeenCalledTimes(1);
      expect(service.scrollTo).toHaveBeenCalledWith({
        target: TARGET,
        duration: DEFAULTS.duration,
        easing: DEFAULTS.easing,
        offset: DEFAULTS.offset,
        offsetMap: DEFAULTS.offsetMap
      });

    }));
  };

  EVENTS.forEach((event: ScrollToEvent) => {
    testMouseEvent(event);
  });

});
