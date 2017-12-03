import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public visible = false;

  constructor() { }

  ngOnInit() {
  }

  public show() {
    this.visible = true;
  }

}
