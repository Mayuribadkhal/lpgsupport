import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { TransactionRoutingModule } from './transaction-routing.module';
import { IssueTaskListComponent } from './issue-task-list/issue-task-list.component';
import { IssueTaskDetailsComponent } from './issue-task-details/issue-task-details.component';
import { PendingComponent } from './pending/pending.component';
import { DroppedComponent } from './dropped/dropped.component';
import { ClosedComponent } from './closed/closed.component';
import { OpenComponent } from './open/open.component';
import {BsDatepickerModule} from '../../../../node_modules/ngx-bootstrap';
import { MydirectiveModule } from '../../directive/mydirective.module';
import { FormsModule } from '@angular/forms';
import {openedmasterDirective} from '../transaction/open/open.component';
import {ClosedTicketsDirective} from '../transaction/closed/closed.component';
import { OpenViewComponent } from './open-view/open-view.component';
import { droppedmasterDirective } from './dropped/dropped.component';
import { pendingmasterDirective } from './pending/pending.component';
import { PendingViewComponent } from './pending-view/pending-view.component';
import { ReportsComponent,reportCompDirective } from './reports/reports.component';  

@NgModule({
  declarations: [IssueTaskListComponent, IssueTaskDetailsComponent, PendingComponent, DroppedComponent, ClosedComponent, OpenComponent, openedmasterDirective,ClosedTicketsDirective, pendingmasterDirective ,droppedmasterDirective, OpenViewComponent, PendingViewComponent, ReportsComponent,reportCompDirective],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModule,
    FormsModule,
    MydirectiveModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class TransactionModule { }
