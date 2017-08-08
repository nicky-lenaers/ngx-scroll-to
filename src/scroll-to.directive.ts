import { Directive, Input, Inject, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

import { mergeConfigWithDefaults, DEFAULTS, EVENTS } from './statics/scroll-to-helpers';
import { ScrollToConfig, ScrollToOffsetMap } from './models/scroll-to-config.model';
import { ScrollToAnimationEasing } from './models/scroll-to-easing.model';
import { ScrollToTarget } from './models/scroll-to-targets.model';
import { ScrollToEvent } from './models/scroll-to-event.model';
import { ScrollToService } from './scroll-to.service';

@Directive({
	selector: '[ngx-scroll-to]'
})
export class ScrollToDirective implements AfterViewInit {

	@Input('ngx-scroll-to')
	public ngxScrollTo: ScrollToTarget = DEFAULTS.target;

	@Input('ngx-scroll-to-event')
	public ngxScrollToEvent: ScrollToEvent = DEFAULTS.event;

	@Input('ngx-scroll-to-duration')
	public ngxScrollToDuration: number = DEFAULTS.duration;

	@Input('ngx-scroll-to-easing')
	public ngxScrollToEasing: ScrollToAnimationEasing = DEFAULTS.easing;

	@Input('ngx-scroll-to-offset')
	public ngxScrollToOffset: number = DEFAULTS.offset;

	@Input('ngx-scroll-to-offset-map')
	public ngxScrollToOffsetMap: ScrollToOffsetMap = DEFAULTS.offsetMap;

	private _config: ScrollToConfig;
	private _window_width: number;

	constructor(
		private _elementRef: ElementRef,
		private _scrollToService: ScrollToService,
		private _renderer2: Renderer2) {

	}

	/**
	 * Angular Lifecycle Hook - After View Init
	 *
	 * @todo Implement Subscription for Events
	 *
	 * @returns void
	 */
	public ngAfterViewInit(): void {

		this._config = {
			target: this.ngxScrollTo,
			duration: this.ngxScrollToDuration,
			easing: this.ngxScrollToEasing,
			offset: this.ngxScrollToOffset,
			offsetMap: this.ngxScrollToOffsetMap
		};

		// Test Event Support
		if (!EVENTS.includes(this.ngxScrollToEvent)) throw new Error(`Unsupported Event '${this.ngxScrollToEvent}'`);

		// Listen for the trigger...
		this._renderer2.listen(this._elementRef.nativeElement, this.ngxScrollToEvent,
			(event: Event) => {
				this._scrollToService.scrollTo(event, this._config)
			});
	}
}
