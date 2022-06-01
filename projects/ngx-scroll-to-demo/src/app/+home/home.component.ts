import { Component } from '@angular/core';

/** Home Component */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  visible = false;
  offsetMap;

  constructor() {
    this.offsetMap = new Map();
    this.offsetMap
      .set(600, -500);
  }

  show() {
    this.visible = true;
  }
}
