import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { easing } from '../scroll-to.helpers';
import { ScrollToAnimationOptions } from '../models/scroll-to-options.model';

export class ScrollToAnimation {

	private _tick: number;
	private _interval: any;
	private _time_lapsed: number;
	private _percentage: number;
	private _position: number;
	private _start_position: number;
	private _distance: number;
	private _source$: ReplaySubject<number>;
	private _windowScrollTop: number;

	constructor(
		private _container: HTMLElement,
		private _listenerTarget: HTMLElement | Window,
		private readonly _is_window: boolean,
		private readonly _to: number,
		private readonly _options: ScrollToAnimationOptions,
		private _is_browser: boolean
	) {
		this._tick = 16;
		this._interval = null;
		this._time_lapsed = 0;

		this._windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		this._start_position = this._is_window ? this._windowScrollTop : this._container.scrollTop;

		// Correction for Starting Position of nested HTML Elements
		if (!this._is_window) this._to = this._to - this._container.getBoundingClientRect().top + this._start_position;

		// Set Distance
		this._distance = Math.abs(this._start_position - this._to);
		let offset = this._options.offset;

		// Set offset from Offset Map
		if (this._is_browser) {

			this._options
				.offsetMap
				.forEach((value, key) => offset = window.innerWidth > key ? value : offset);
		}

		this._distance += offset;
		this._source$ = new ReplaySubject();
	}

	/**
	 * Start the new Scroll Animation.
	 *
	 * @todo enums for actiontypes
	 *
	 * @returns void
	 */
	public start(): Observable<any> {
		clearInterval(this._interval);
		this._interval = setInterval(this._loop, this._tick);
		return this._source$.asObservable();
	}

	/**
	 * Recursively loop over the Scroll Animation.
	 *
	 * @returns void
	 */
	private _loop = (): void => {
		this._time_lapsed += this._tick;
		this._percentage = (this._time_lapsed / this._options.duration);
		this._percentage = (this._percentage > 1) ? 1 : this._percentage;
		this._position = this._start_position
			+ ((this._start_position - this._to < 0 ? 1 : -1) * this._distance * easing[this._options.easing](this._percentage));
		this._source$.next(this._position);
		this._is_window ? this._listenerTarget.scrollTo(0, Math.floor(this._position)) : this._container.scrollTop = Math.floor(this._position);
		this.stop(false);
	}

	/**
	 * Stop the current Scroll Animation Loop.
	 *
	 * @param force 			Force to stop
	 */
	public stop(force: boolean = true): void {

		const curr_position = this._is_window ? this._windowScrollTop : this._container.scrollTop;

		if (force || this._position === (this._to + this._options.offset) || curr_position === (this._to + this._options.offset)) {
			clearInterval(this._interval);
			this._interval = null;
			this._source$.complete();
		}
	}
}
