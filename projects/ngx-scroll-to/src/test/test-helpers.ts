import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollToConfigOptionsTarget } from '../lib/scroll-to-config.interface';
import { ScrollToEvent } from '../lib/scroll-to-event.interface';
import { BUTTON_ID } from './test-dummy.component';

export interface CompileTemplateConfigOptions extends ScrollToConfigOptionsTarget {
  action?: string;
}

export function createTestComponent(
  component: Type<any>,
  config: CompileTemplateConfigOptions,
  event: ScrollToEvent): ComponentFixture<any> {

  const template = `
    <button id="${BUTTON_ID}"
      [ngxScrollTo]="'${config.target}'"
      ${event ? '[ngxScrollToEvent]="\'' + event + '\'"' : ''}
      >Go to destination</button>
    <div id="${config.target}">You've reached your destination</div>
`;

  TestBed.overrideComponent(component, {
    set: {
      template
    }
  });

  return TestBed.createComponent(component);
}
