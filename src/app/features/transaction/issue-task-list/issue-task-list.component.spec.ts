import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTaskListComponent } from './issue-task-list.component';

describe('IssueTaskListComponent', () => {
  let component: IssueTaskListComponent;
  let fixture: ComponentFixture<IssueTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
