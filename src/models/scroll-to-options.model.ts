import { ScrollToAnimationEasing } from './scroll-to-easing.model';
export type ScrollToOffsetMap = Map<number, number>;

export interface ScrollToAnimationOptions {
	duration: number;
	easing: ScrollToAnimationEasing;
	offset: number;
	offsetMap: ScrollToOffsetMap;
}
