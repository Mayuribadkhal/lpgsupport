import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIssueSubGroupDetailsComponent } from './product-issue-sub-group-details.component';

describe('ProductIssueSubGroupDetailsComponent', () => {
  let component: ProductIssueSubGroupDetailsComponent;
  let fixture: ComponentFixture<ProductIssueSubGroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductIssueSubGroupDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductIssueSubGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
