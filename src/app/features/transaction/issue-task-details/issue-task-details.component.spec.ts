import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTaskDetailsComponent } from './issue-task-details.component';

describe('IssueTaskDetailsComponent', () => {
  let component: IssueTaskDetailsComponent;
  let fixture: ComponentFixture<IssueTaskDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueTaskDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
