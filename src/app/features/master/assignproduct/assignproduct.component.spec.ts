import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignproductComponent } from './assignproduct.component';

describe('AssignproductComponent', () => {
  let component: AssignproductComponent;
  let fixture: ComponentFixture<AssignproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
