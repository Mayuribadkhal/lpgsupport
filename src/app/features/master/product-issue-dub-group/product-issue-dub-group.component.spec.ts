import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIssueDubGroupComponent } from './product-issue-dub-group.component';

describe('ProductIssueDubGroupComponent', () => {
  let component: ProductIssueDubGroupComponent;
  let fixture: ComponentFixture<ProductIssueDubGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductIssueDubGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductIssueDubGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
