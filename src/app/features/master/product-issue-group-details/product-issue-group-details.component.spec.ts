import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIssueGroupDetailsComponent } from './product-issue-group-details.component';

describe('ProductIssueGroupDetailsComponent', () => {
  let component: ProductIssueGroupDetailsComponent;
  let fixture: ComponentFixture<ProductIssueGroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductIssueGroupDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductIssueGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
