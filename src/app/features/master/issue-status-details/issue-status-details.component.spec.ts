import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueStatusDetailsComponent } from './issue-status-details.component';

describe('IssueStatusDetailsComponent', () => {
  let component: IssueStatusDetailsComponent;
  let fixture: ComponentFixture<IssueStatusDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueStatusDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueStatusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
