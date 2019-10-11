import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSuitDetailsComponent } from './product-suit-details.component';

describe('ProductSuitDetailsComponent', () => {
  let component: ProductSuitDetailsComponent;
  let fixture: ComponentFixture<ProductSuitDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSuitDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSuitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
