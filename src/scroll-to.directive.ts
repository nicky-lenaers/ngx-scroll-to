import { Directive, Input, Inject, ElementRef, Renderer2, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { ScrollToService } from './scroll-to.service';
import { ScrollToAnimationEasing } from './models/scroll-to-easing.model';
import { ScrollToAnimationOptions, ScrollToOffsetMap } from './models/scroll-to-options.model';
import { ScrollToEvent } from './models/scroll-to-event.model';

@Directive({
	selector: '[ngx-scroll-to]'
})
export class ScrollToDirective implements AfterViewInit {

	@Input('ngx-scroll-to')
	public ngxScrollTo: string | ElementRef = '';

	@Input('ngx-scroll-to-event')
	public ngxScrollToEvent: ScrollToEvent = 'click';

	@Input('ngx-scroll-to-duration')
	public ngxScrollToDuration = 650;

	@Input('ngx-scroll-to-easing')
	public ngxScrollToEasing: ScrollToAnimationEasing = 'easeInOutQuad';

	@Input('ngx-scroll-to-offset')
	public ngxScrollToOffset = 0;

	@Input('ngx-scroll-to-offset-map')
	public ngxScrollToOffsetMap: ScrollToOffsetMap = new Map();

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

		this._config = {
			easing: this.ngxScrollToEasing,
			duration: this.ngxScrollToDuration,
			offset: this.ngxScrollToOffset,
			offsetMap: this.ngxScrollToOffsetMap
		}

		// Listen for the trigger...
		this._renderer2.listen(this._elementRef.nativeElement, this.ngxScrollToEvent,
			(event) => {
				setTimeout((__HACK__: any) => {
					this._scrollToService.onTrigger(event, this._scrollToService.getTargetNode(this.ngxScrollTo), this._renderer2, this._config)
				});
			});
	}
}
