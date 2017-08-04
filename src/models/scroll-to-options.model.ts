import { ScrollToAnimationEasing } from './scroll-to-easing.model';
import { ScrollToTarget } from './scroll-to-target.model';
import { ScrollToEvent } from './scroll-to-event.model';

export type ScrollToOffsetMap = Map<number, number>;

/**
 * @todo move ScrollToTarget to this file (no need for seperate file, since it is a config option)
 * @todo consider moving offset and offsetMap out of a type that has 'AnimationOptions' (both are not animation options)
 */
export interface ScrollToConfigOptions {
	target: ScrollToTarget;
	duration?: number;
	easing?: ScrollToAnimationEasing;
	offset?: number;
	offsetMap?: ScrollToOffsetMap;
}

export interface ɵScrollToDefaultOptions {
	target: ScrollToTarget;
	event: ScrollToEvent;
	duration: number;
	easing: ScrollToAnimationEasing;
	offset: number;
	offsetMap: ScrollToOffsetMap;
}
