import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIssueGroupComponent } from './product-issue-group.component';

describe('ProductIssueGroupComponent', () => {
  let component: ProductIssueGroupComponent;
  let fixture: ComponentFixture<ProductIssueGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductIssueGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductIssueGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
