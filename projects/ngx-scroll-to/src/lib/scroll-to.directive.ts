import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

import { DEFAULTS, EVENTS } from './scroll-to-helpers';
import { ScrollToConfigOptions, ScrollToOffsetMap, ScrollToTarget } from './scroll-to-config.interface';
import { ScrollToAnimationEasing } from './scroll-to-easing.interface';
import { ScrollToEvent } from './scroll-to-event.interface';
import { ScrollToService } from './scroll-to.service';

@Directive({
  selector: '[ngxScrollTo]'
})
export class ScrollToDirective implements AfterViewInit {

  @Input()
  ngxScrollTo: ScrollToTarget = DEFAULTS.target;

  @Input()
  ngxScrollToEvent: ScrollToEvent = DEFAULTS.action;

  @Input()
  ngxScrollToDuration: number = DEFAULTS.duration;

  @Input()
  ngxScrollToEasing: ScrollToAnimationEasing = DEFAULTS.easing;

  @Input()
  ngxScrollToOffset: number = DEFAULTS.offset;

  @Input()
  ngxScrollToOffsetMap: ScrollToOffsetMap = DEFAULTS.offsetMap;

  private options: ScrollToConfigOptions;

  constructor(
    private elementRef: ElementRef,
    private scrollToService: ScrollToService,
    private renderer2: Renderer2) {
  }

  /**
   * Angular Lifecycle Hook - After View Init
   *
   * @todo Implement Subscription for Events
   *
   * @returns void
   */
  ngAfterViewInit(): void {

    // Test Event Support
    if (EVENTS.indexOf(this.ngxScrollToEvent) === -1) {
      throw new Error(`Unsupported Event '${this.ngxScrollToEvent}'`);
    }

    // Listen for the trigger...
    this.renderer2.listen(this.elementRef.nativeElement, this.ngxScrollToEvent,
      (event: Event) => {

        this.options = {
          target: this.ngxScrollTo,
          duration: this.ngxScrollToDuration,
          easing: this.ngxScrollToEasing,
          offset: this.ngxScrollToOffset,
          offsetMap: this.ngxScrollToOffsetMap
        };

        this.scrollToService.scrollTo(this.options);
      });
  }
}
