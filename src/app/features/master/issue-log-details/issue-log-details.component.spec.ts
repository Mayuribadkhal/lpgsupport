import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLogDetailsComponent } from './issue-log-details.component';

describe('IssueLogDetailsComponent', () => {
  let component: IssueLogDetailsComponent;
  let fixture: ComponentFixture<IssueLogDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueLogDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
