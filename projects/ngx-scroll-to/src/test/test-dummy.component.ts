import { Component, OnInit } from '@angular/core';

export const TARGET = 'destination';
export const BUTTON_ID = 'btn-1';

/** Dummy Component for testing the Angular Directive */
@Component({
  selector: 'ngx-scroll-to',
  styles: [`
    #destination {
    margin-top: 100vh;
    }
  `],
  template: `
    <button id="${BUTTON_ID}" [ngxScrollTo]="'${TARGET}'">Go to destination</button>
    <div id="${TARGET}">You've reached your destination</div>
  `
})
export class DummyComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
