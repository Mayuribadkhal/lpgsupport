import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MasterRoutingModule } from './master-routing.module';
import { DomainMasterComponent } from './domain-master/domain-master.component';
import { DomainDetailsComponent } from './domain-details/domain-details.component';
import { ProductSuitListComponent } from './product-suit-list/product-suit-list.component';
import { ProductSuitDetailsComponent } from './product-suit-details/product-suit-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductIssueGroupComponent } from './product-issue-group/product-issue-group.component';
import { ProductIssueGroupDetailsComponent } from './product-issue-group-details/product-issue-group-details.component';
import { ProductIssueDubGroupComponent } from './product-issue-dub-group/product-issue-dub-group.component';
import { ProductIssueSubGroupDetailsComponent } from './product-issue-sub-group-details/product-issue-sub-group-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { DesignationListComponent } from './designation-list/designation-list.component';
import { DesignationDetailsComponent } from './designation-details/designation-details.component';
import { IssueLogListComponent } from './issue-log-list/issue-log-list.component';
import { IssueLogDetailsComponent } from './issue-log-details/issue-log-details.component';
import { IssueStatusListComponent } from './issue-status-list/issue-status-list.component';
import { IssueStatusDetailsComponent } from './issue-status-details/issue-status-details.component';
import { AssignproductComponent } from './assignproduct/assignproduct.component';
import { AssignProductGridComponent } from './assign-product-grid/assign-product-grid.component';
// For Ui Grid
import {designationDirective} from '../master/designation-list/designation-list.component';
import { MydirectiveModule } from '../../directive/mydirective.module';
import {productDirective} from '../master/product-list/product-list.component';
import {issueDirective} from '../master/issue-status-list/issue-status-list.component';
import {employeeDirective} from '../master/employee-list/employee-list.component';
import {ProdIssueDubGrpDirective} from '../master/product-issue-dub-group/product-issue-dub-group.component';
import {ProdIssueGrpDirective} from '../master/product-issue-group/product-issue-group.component';
import {domainmasterDirective} from '../master/domain-master/domain-master.component';
import {productsuitDirective} from '../master/product-suit-list/product-suit-list.component';
import { AssignproductDirective } from './assignproduct/assignproduct.component';
import { AssignproductListDirective } from './assign-product-grid/assign-product-grid.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { SupplierDetailsDirective } from './supplier-list/supplier-list.component';
// import * as CryptoJs from '../../../../node_modules/crypto-js';

@NgModule({
  declarations: [DomainMasterComponent, DomainDetailsComponent, ProductSuitListComponent, ProductSuitDetailsComponent, ProductListComponent, 
    ProductDetailsComponent, ProductIssueGroupComponent, ProductIssueGroupDetailsComponent, ProductIssueDubGroupComponent, 
    ProductIssueSubGroupDetailsComponent, EmployeeListComponent, EmployeeDetailsComponent, DesignationListComponent,
    designationDirective, productDirective,issueDirective,employeeDirective,ProdIssueDubGrpDirective,ProdIssueGrpDirective,domainmasterDirective,productsuitDirective,AssignproductDirective,AssignproductListDirective,SupplierDetailsDirective,
    DesignationDetailsComponent, IssueLogListComponent, IssueLogDetailsComponent, IssueStatusListComponent, IssueStatusDetailsComponent, AssignproductComponent, AssignProductGridComponent, SupplierListComponent, SupplierDetailsComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule,
    MydirectiveModule
  ]
})
export class MasterModule { }
