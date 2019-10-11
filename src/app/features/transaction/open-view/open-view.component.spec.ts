import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenViewComponent } from './open-view.component';

describe('OpenViewComponent', () => {
  let component: OpenViewComponent;
  let fixture: ComponentFixture<OpenViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
