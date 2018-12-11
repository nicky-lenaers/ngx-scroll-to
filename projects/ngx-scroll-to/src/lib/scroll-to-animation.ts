import { Observable, ReplaySubject } from 'rxjs/index';

import { EASING } from './scroll-to-helpers';
import {
  ScrollToConfigOptions,
  ScrollToListenerTarget
} from './scroll-to-config.interface';

/** Scroll To Animation */
export class ScrollToAnimation {

  /** Number of milliseconds for each Tick */
  private _tick: number;

  /** Interval */
  private _interval: any;

  /** Time Lapsed in milliseconds */
  private _timeLapsed: number;

  /** Percentage of time lapsed */
  private _percentage: number;

  /** Position of the Element */
  private _position: number;

  /** Last Element Position */
  private _lastPosition: number;

  /** Start Position of the Element */
  private _startPosition: number;

  /** The Distance to scroll */
  private _distance: number;

  /** Observable Source */
  private _source$: ReplaySubject<number>;

  /** Scroll Top of the Window */
  private _windowScrollTop: number;

  /** Mapped Offset taken from the active Offset Map */
  private _mappedOffset: number;

  /**
   * Class Constructor.
   *
   * @param _container            The Container
   * @param _listenerTarget       The Element that listens for DOM Events
   * @param _isWindow             Whether or not the listener is the Window
   * @param _to                   Position to scroll to
   * @param _options              Additional options for scrolling
   * @param _isBrowser            Whether or not execution runs in the browser
   *                              (as opposed to the server)
   */
  constructor(
    private _container: HTMLElement,
    private _listenerTarget: ScrollToListenerTarget,
    private readonly _isWindow: boolean,
    private readonly _to: number,
    private readonly _options: ScrollToConfigOptions,
    private _isBrowser: boolean
  ) {
    this._tick = 16;
    this._interval = null;
    this._lastPosition = null;
    this._timeLapsed = 0;

    this._windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (!this._container) {
      this._startPosition = this._windowScrollTop;
    } else {
      this._startPosition = this._isWindow ? this._windowScrollTop : this._container.scrollTop;
    }

    // Correction for Starting Position of nested HTML Elements
    if (this._container && !this._isWindow) {
      this._to = this._to - this._container.getBoundingClientRect().top + this._startPosition;
    }

    // Set Distance
    const directionalDistance = this._startPosition - this._to;
    this._distance = this._container ? Math.abs(this._startPosition - this._to) : this._to;

    this._mappedOffset = this._options.offset;

    // Set offset from Offset Map
    if (this._isBrowser) {
      this._options
        .offsetMap
        .forEach((value, key) => this._mappedOffset = window.innerWidth > key ? value : this._mappedOffset);
    }

    this._distance += this._mappedOffset * (directionalDistance <= 0 ? 1 : -1);
    this._source$ = new ReplaySubject();
  }

  /**
   * Start the new Scroll Animation.
   *
   * @returns         Observable containing a number
   */
  public start(): Observable<number> {
    clearInterval(this._interval);
    this._interval = setInterval(this._loop, this._tick);
    return this._source$.asObservable();
  }

  /** Recursively loop over the Scroll Animation */
  private _loop = (): void => {

    this._timeLapsed += this._tick;
    this._percentage = (this._timeLapsed / this._options.duration);
    this._percentage = (this._percentage > 1) ? 1 : this._percentage;

    // Position Update
    this._position = this._startPosition +
      ((this._startPosition - this._to <= 0 ? 1 : -1) *
        this._distance *
        EASING[this._options.easing](this._percentage));

    if (this._lastPosition !== null && this._position === this._lastPosition) {
      this.stop();
    } else {
      this._source$.next(this._position);
      this._isWindow
        ? this._listenerTarget.scrollTo(0, Math.floor(this._position))
        : this._container.scrollTop = Math.floor(this._position);
      this._lastPosition = this._position;
    }
  }

  /**
   * Stop the current Scroll Animation Loop.
   *
   * @param force 			    Force to stop the Animation Loop
   * @returns               Void
   */
  public stop(): void {
    clearInterval(this._interval);
    this._interval = null;
    this._source$.complete();
  }
}
