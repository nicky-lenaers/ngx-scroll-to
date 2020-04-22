import { Observable, ReplaySubject } from 'rxjs';

import { EASING } from './scroll-to-helpers';
import { ScrollToConfigOptions, ScrollToListenerTarget } from './scroll-to-config.interface';

/** Scroll To Animation */
export class ScrollToAnimation {

  /** Number of milliseconds for each Tick */
  private tick: number;

  /** Interval */
  private interval: any;

  /** Time Lapsed in milliseconds */
  private timeLapsed: number;

  /** Percentage of time lapsed */
  private percentage: number;

  /** Position of the Element */
  private position: number;

  /** Last Element Position */
  private lastPosition: number;

  /** Start Position of the Element */
  private startPosition: number;

  /** The Distance to scroll */
  private distance: number;

  /** Observable Source */
  private source$: ReplaySubject<number>;

  /** Scroll Top of the Window */
  private windowScrollTop: number;

  /** Mapped Offset taken from the active Offset Map */
  private mappedOffset: number;

  /**
   * Class Constructor.
   *
   * @param container            The Container
   * @param listenerTarget       The Element that listens for DOM Events
   * @param isWindow             Whether or not the listener is the Window
   * @param to                   Position to scroll to
   * @param options              Additional options for scrolling
   * @param isBrowser            Whether or not execution runs in the browser
   *                              (as opposed to the server)
   */
  constructor(
    private container: HTMLElement,
    private listenerTarget: ScrollToListenerTarget,
    private readonly isWindow: boolean,
    private readonly to: number,
    private readonly options: ScrollToConfigOptions,
    private isBrowser: boolean
  ) {
    this.tick = 16;
    this.interval = null;
    this.lastPosition = null;
    this.timeLapsed = 0;

    this.windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (!this.container) {
      this.startPosition = this.windowScrollTop;
    } else {
      this.startPosition = this.isWindow ? this.windowScrollTop : this.container.scrollTop;
    }

    // Correction for Starting Position of nested HTML Elements
    if (this.container && !this.isWindow) {
      this.to = this.to - this.container.getBoundingClientRect().top + this.startPosition;
    }

    // Set Distance
    const directionalDistance = this.startPosition - this.to;
    this.distance = this.container ? Math.abs(this.startPosition - this.to) : this.to;

    this.mappedOffset = this.options.offset;

    // Set offset from Offset Map
    if (this.isBrowser) {
      this.options
        .offsetMap
        .forEach((value, key) => this.mappedOffset = window.innerWidth > key ? value : this.mappedOffset);
    }

    this.distance += this.mappedOffset * (directionalDistance <= 0 ? 1 : -1);
    this.source$ = new ReplaySubject();
  }

  /**
   * Start the new Scroll Animation.
   *
   * @returns         Observable containing a number
   */
  start(): Observable<number> {
    clearInterval(this.interval);
    this.interval = setInterval(this.loop, this.tick);
    return this.source$.asObservable();
  }

  /**
   * Stop the current Scroll Animation Loop.
   *
   * @param force          Force to stop the Animation Loop
   * @returns               Void
   */
  stop(): void {
    clearInterval(this.interval);
    this.interval = null;
    this.source$.complete();
  }

  /** Recursively loop over the Scroll Animation */
  private loop = (): void => {

    this.timeLapsed += this.tick;
    this.percentage = (this.timeLapsed / this.options.duration);
    this.percentage = (this.percentage > 1) ? 1 : this.percentage;

    // Position Update
    this.position = this.startPosition +
      ((this.startPosition - this.to <= 0 ? 1 : -1) *
        this.distance *
        EASING[this.options.easing](this.percentage));

    if (this.lastPosition !== null && this.position === this.lastPosition) {
      this.stop();
    } else {
      this.source$.next(this.position);
      this.isWindow
        ? this.listenerTarget.scrollTo(0, Math.floor(this.position))
        : this.container.scrollTop = Math.floor(this.position);
      this.lastPosition = this.position;
    }
  }
}
