import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  AfterViewInit
} from '@angular/core';

import {
  DEFAULTS,
  EVENTS
} from './scroll-to-helpers';
import {
  ScrollToConfigOptions,
  ScrollToOffsetMap,
  ScrollToTarget
} from './scroll-to-config.interface';
import {
  ScrollToAnimationEasing
} from './scroll-to-easing.interface';
import { ScrollToEvent } from './scroll-to-event.interface';
import { ScrollToService } from './scroll-to.service';

/* tslint:disable */
@Directive({
  selector: '[ngx-scroll-to]'
})
export class ScrollToDirective implements AfterViewInit {

  @Input('ngx-scroll-to')
  public ngxScrollTo: ScrollToTarget = DEFAULTS.target;

  @Input('ngx-scroll-to-event')
  public ngxScrollToEvent: ScrollToEvent = DEFAULTS.action;

  @Input('ngx-scroll-to-duration')
  public ngxScrollToDuration: number = DEFAULTS.duration;

  @Input('ngx-scroll-to-easing')
  public ngxScrollToEasing: ScrollToAnimationEasing = DEFAULTS.easing;

  @Input('ngx-scroll-to-offset')
  public ngxScrollToOffset: number = DEFAULTS.offset;

  @Input('ngx-scroll-to-offset-map')
  public ngxScrollToOffsetMap: ScrollToOffsetMap = DEFAULTS.offsetMap;

  private _options: ScrollToConfigOptions;

  constructor(
    private _elementRef: ElementRef,
    private _scrollToService: ScrollToService,
    private _renderer2: Renderer2) { }

  /**
   * Angular Lifecycle Hook - After View Init
   *
   * @todo Implement Subscription for Events
   *
   * @returns void
   */
  public ngAfterViewInit(): void {

    // Test Event Support
    if (EVENTS.indexOf(this.ngxScrollToEvent) === -1) throw new Error(`Unsupported Event '${this.ngxScrollToEvent}'`);

    // Listen for the trigger...
    this._renderer2.listen(this._elementRef.nativeElement, this.ngxScrollToEvent,
      (event: Event) => {

        this._options = {
          target: this.ngxScrollTo,
          duration: this.ngxScrollToDuration,
          easing: this.ngxScrollToEasing,
          offset: this.ngxScrollToOffset,
          offsetMap: this.ngxScrollToOffsetMap
        };

        this._scrollToService.scrollTo(this._options);
      });
  }
}
