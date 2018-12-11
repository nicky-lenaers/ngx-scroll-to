import { Component, OnInit } from '@angular/core';

/** Home Component */
@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public visible = false;
  public offsetMap;

  constructor() {
    this.offsetMap = new Map();
    this.offsetMap
      .set(600, -500);
  }

  ngOnInit() {
  }

  public show() {
    this.visible = true;
  }

}
