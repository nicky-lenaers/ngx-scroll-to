import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerTargetComponent } from './container-target.component';

describe('ContainerTargetComponent', () => {
  let component: ContainerTargetComponent;
  let fixture: ComponentFixture<ContainerTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
