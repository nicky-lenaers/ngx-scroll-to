import { Component, OnInit } from '@angular/core';

/** Home Component */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  visible = false;
  offsetMap;

  constructor() {
    this.offsetMap = new Map();
    this.offsetMap
      .set(600, -500);
  }

  ngOnInit() {
  }

  show() {
    this.visible = true;
  }
}
