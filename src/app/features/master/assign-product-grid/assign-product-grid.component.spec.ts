import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProductGridComponent } from './assign-product-grid.component';

describe('AssignProductGridComponent', () => {
  let component: AssignProductGridComponent;
  let fixture: ComponentFixture<AssignProductGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignProductGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProductGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
