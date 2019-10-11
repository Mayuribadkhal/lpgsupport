import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainMasterComponent } from './domain-master.component';

describe('DomainMasterComponent', () => {
  let component: DomainMasterComponent;
  let fixture: ComponentFixture<DomainMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
