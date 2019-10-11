import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueStatusListComponent } from './issue-status-list.component';

describe('IssueStatusListComponent', () => {
  let component: IssueStatusListComponent;
  let fixture: ComponentFixture<IssueStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
