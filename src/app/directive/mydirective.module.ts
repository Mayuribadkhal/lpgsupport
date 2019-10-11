import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlphaonlyDirective} from '@app/directive/alphaonly.directive';
import {AlphanumericonlyDirective} from '../directive/alphanumericonly.directive';
import {NumericonlyDirective} from '../directive/numericonly.directive';
import { NumericDotOnlyDirective } from '../directive/numeric-dot-only.directive';

import * as angular from 'angular';
import { AppComponent } from '@app/app.component';
import { downgradeComponent } from '@angular/upgrade/static';
import { designationComponent } from '@app/features/master/designation-list/designation-list.component';
import { productComponent } from '../features/master/product-list/product-list.component';
import { issueComponent } from '../features/master/issue-status-list/issue-status-list.component';
import { employeeComponent } from '../features/master/employee-list/employee-list.component';
import { prodIssueDubGrpComponent } from '../features/master/product-issue-dub-group/product-issue-dub-group.component';
import { prodIssueGrpComponent } from '../features/master/product-issue-group/product-issue-group.component';
import { domainComponent } from '../features/master/domain-master/domain-master.component';
import { productsuitComponent } from '../features/master/product-suit-list/product-suit-list.component';
import { openedComponent } from '../features/transaction/open/open.component';
import { AssproductComponent } from '../features/master/assignproduct/assignproduct.component';

import { AssproductListComponent } from '../features/master/assign-product-grid/assign-product-grid.component';
import { supplierDetailsComponent } from '../features/master/supplier-list/supplier-list.component';
import { closedTicketsComponent } from '../features/transaction/closed/closed.component';
import { droppedComponent } from '../features/transaction/dropped/dropped.component';
import { pendingComponent } from '../features/transaction/pending/pending.component';
import { reportComponent } from '../features/transaction/reports/reports.component';

@NgModule({
  imports: [],
  declarations: [AlphaonlyDirective,AlphanumericonlyDirective,NumericonlyDirective,NumericDotOnlyDirective],
  exports: [AlphaonlyDirective,AlphanumericonlyDirective,NumericonlyDirective,NumericDotOnlyDirective]
})
export class MydirectiveModule {
  static supportgrids;
  constructor() {
    MydirectiveModule.supportgrids = angular.module('supportGrids', ['ui.grid', 'ui.grid.grouping', 'ui.grid.exporter', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.pagination'])
    .component('ui-grid',designationComponent)  
    .component('product-grid',productComponent)
    .component('issue-grid',issueComponent)
    .component('empy-grid',employeeComponent)
    .component('product-issue-sub-group-grid',prodIssueDubGrpComponent)
    .component('product-issue-group-grid',prodIssueGrpComponent)
    .component('domain-grid',domainComponent)
    .component('productsuit-grid',productsuitComponent)
    .component('opened-grid',openedComponent)
    .component('assproduct-grid',AssproductComponent)
    .component('assproductlist-grid',AssproductListComponent)
    .component('supplier-list-grid', supplierDetailsComponent)
    .component('closed-trans-grid', closedTicketsComponent)
    .component('dropped-grid', droppedComponent)
    .component('pending-grid', pendingComponent)
    .component('report-grid', reportComponent)
    .directive('appRoot', downgradeComponent({ component: AppComponent }));

  }
}
