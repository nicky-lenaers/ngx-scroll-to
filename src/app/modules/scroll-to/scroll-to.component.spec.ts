import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollToComponent } from './scroll-to.component';

describe('ScrollToComponent', () => {
  let component: ScrollToComponent;
  let fixture: ComponentFixture<ScrollToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
