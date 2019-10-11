import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingViewComponent } from './pending-view.component';

describe('PendingViewComponent', () => {
  let component: PendingViewComponent;
  let fixture: ComponentFixture<PendingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
