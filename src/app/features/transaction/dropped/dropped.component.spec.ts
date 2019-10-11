import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DroppedComponent } from './dropped.component';

describe('DroppedComponent', () => {
  let component: DroppedComponent;
  let fixture: ComponentFixture<DroppedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DroppedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DroppedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
