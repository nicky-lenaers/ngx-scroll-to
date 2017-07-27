import { Directive, Input, Inject, ElementRef, Renderer2, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { ScrollToService } from './scroll-to.service';
import { ScrollToAnimationEasing } from './models/scroll-to-easing.model';
import { mergeConfigWithDefaults, DEFAULTS } from './scroll-to.helpers';
import { ScrollToAnimationOptions, ScrollToOffsetMap } from './models/scroll-to-options.model';
import { ScrollToTarget } from './models/scroll-to-target.model';
import { ScrollToEvent } from './models/scroll-to-event.model';

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

	private _config: ScrollToAnimationOptions;
	private _window_width: number;

	constructor(
		private _elementRef: ElementRef,
		private _scrollToService: ScrollToService,
		private _renderer2: Renderer2,
		@Inject(PLATFORM_ID) private _platform_id: any,
		@Inject(DOCUMENT) private _document: any) {

	}

	/**
	 * Angular Lifecycle Hook - After View Init
	 *
	 * @returns void
	 */
	public ngAfterViewInit(): void {

		if (isPlatformServer(this._platform_id)) return;

		this._config = mergeConfigWithDefaults({
			target: this.ngxScrollTo,
			duration: this.ngxScrollToDuration,
			easing: this.ngxScrollToEasing,
			event: this.ngxScrollToEvent,
			offset: this.ngxScrollToOffset,
			offsetMap: this.ngxScrollToOffsetMap
		});

		// Listen for the trigger...
		this._renderer2.listen(this._elementRef.nativeElement, this.ngxScrollToEvent,
			(event: Event) => {
				setTimeout((__HACK__: any) => this._scrollToService.ɵonTrigger(event, this.ngxScrollTo, this._renderer2, this._config));
			});
	}
}
