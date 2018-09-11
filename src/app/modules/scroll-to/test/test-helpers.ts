import { Type } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BUTTON_ID } from './test-dummy.component';
import {
  ScrollToConfigOptions,
  ScrollToTarget,
  ScrollToConfigOptionsTarget
} from '../scroll-to-config.interface';
import { ScrollToEvent } from '../scroll-to-event.interface';

export interface CompileTemplateConfigOptions extends ScrollToConfigOptionsTarget {
  action?: string;
}

export function createTestComponent(
  component: Type<any>,
  config: CompileTemplateConfigOptions,
  event: ScrollToEvent): ComponentFixture<any> {

  const template = `
    <button id="${BUTTON_ID}"
      [ngx-scroll-to]="'${config.target}'"
      ${event ? '[ngx-scroll-to-event]="\'' + event + '\'"' : ''}
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
