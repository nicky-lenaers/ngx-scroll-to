import { Type } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BUTTON_ID } from './dummy.component';
import { ScrollToConfigOptions } from '../models/scroll-to-options.model';
import { ScrollToTarget } from '../models/scroll-to-target.model';

export interface CompileTemplateConfigOptions extends ScrollToConfigOptions {
	event?: string;
}
export function createFixtureWithTemplateOverride(component: Type<any>, config: CompileTemplateConfigOptions): ComponentFixture<any> {

	const template = `
		<button id="${BUTTON_ID}"
			[ngx-scroll-to]="'${config.target}'"
			${config.event ? '[ngx-scroll-to-event]="\'' + config.event + '\'"' : '' }
			>Go to destination</button>
		<div id="${config.target}">You've reached your destination</div>
	`;

	TestBed.overrideComponent(component, {
		set: {
			template: template
		}
	});

	return TestBed.createComponent(component);
}
