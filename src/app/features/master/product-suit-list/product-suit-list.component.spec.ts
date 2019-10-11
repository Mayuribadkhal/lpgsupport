import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSuitListComponent } from './product-suit-list.component';

describe('ProductSuitListComponent', () => {
  let component: ProductSuitListComponent;
  let fixture: ComponentFixture<ProductSuitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSuitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSuitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
