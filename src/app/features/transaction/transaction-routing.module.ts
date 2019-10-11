import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueTaskListComponent } from './issue-task-list/issue-task-list.component';
import { IssueTaskDetailsComponent } from './issue-task-details/issue-task-details.component';
import { PendingComponent } from './pending/pending.component';
import { DroppedComponent } from './dropped/dropped.component';
import { ClosedComponent } from './closed/closed.component';
import { OpenComponent } from './open/open.component';
import { OpenViewComponent } from '../transaction/open-view/open-view.component';
import { PendingViewComponent } from '../transaction/pending-view/pending-view.component';
import { ReportsComponent } from '../transaction/reports/reports.component';

const routes: Routes = [
  {
    path: 'Issue_task',
    component: IssueTaskListComponent,
    data: {
        pageTitle: 'Issue_task'
    }
  },
  {
    path: 'Issue_task_details',
    component: IssueTaskDetailsComponent,
    data: {
        pageTitle: 'Issue_task_details'
    }
  },
  {
    path: 'pending',
    component: PendingComponent,
    data: {
        pageTitle: 'Issue_task_details'
    }
  },
  {
    path: 'dropped',
    component: DroppedComponent,
    data: {
        pageTitle: 'dropped'
    }
  },
  {
    path: 'closed',
    component: ClosedComponent,
    data: {
        pageTitle: 'closed'
    }
  },
  {
    path: 'open',
    component: OpenComponent,
    data: {
        pageTitle: 'open'
    }
  },
  {
    path: 'open_view',
    component: OpenViewComponent,
    data: {
        pageTitle: 'open_view'
    }
  },
  {
    path: 'pending_view',
    component: PendingViewComponent,
    data: {
        pageTitle: 'pending_view'
    }
  },
  {
    path: 'report',
    component: ReportsComponent,
    data: {
        pageTitle: 'report'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
