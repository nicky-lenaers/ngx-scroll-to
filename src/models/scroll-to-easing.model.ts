export type ScrollToAnimationEasing = 'easeInQuad'
	| 'easeOutQuad'
	| 'easeInOutQuad'
	| 'easeInCubic'
	| 'easeOutCubic'
	| 'easeInOutCubic'
	| 'easeInQuart'
	| 'easeOutQuart'
	| 'easeInOutQuart'
	| 'easeInQuint'
	| 'easeOutQuint'
	| 'easeInOutQuint'
	| 'easeOutElastic';

export type ScrollToAnimationEasingFunction = (time: number) => number;
export interface ScrollToAnimationEasingCollection {
	[ key: string ]: ScrollToAnimationEasingFunction;
};
