import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';


const routes: Routes = [
  {
    path: 'domain_list',
    component: DomainMasterComponent,
    data: {
        pageTitle: 'domain-list'
    }
  },
    {
      path: 'domain_details',
      component: DomainDetailsComponent,
      data: {
          pageTitle: 'domain-details'
      }
    },
    {
      path: 'Product_suit_list',
      component: ProductSuitListComponent,
      data: {
          pageTitle: 'Product_suit_list'
      }
    },
    {
      path: 'Product_suit_details',
      component: ProductSuitDetailsComponent,
      data: {
          pageTitle: 'Product_suit_details'
      }
    },  
    {
      path: 'Product_list',
      component: ProductListComponent,
      data: {
          pageTitle: 'Product_list'
      }
    },   
    {
      path: 'Product_details',
      component: ProductDetailsComponent,
      data: {
          pageTitle: 'Product_details'
      }
    }, 
    {
      path: 'Product_issue_group',
      component: ProductIssueGroupComponent,
      data: {
          pageTitle: 'Product_issue_group'
      }
    }, 
    {
      path: 'Product_issue_group_details',
      component: ProductIssueGroupDetailsComponent,
      data: {
          pageTitle: 'Product_issue_group_details'
      }
    }, 
    {
      path: 'product_issue_dub_group',
      component: ProductIssueDubGroupComponent,
      data: {
          pageTitle: 'product_issue_dub_group'
      }
    },
    {
      path: 'product_issue_sub_group_details',
      component: ProductIssueSubGroupDetailsComponent,
      data: {
          pageTitle: 'product_issue_sub_group_details'
      }
    },
    {
      path: 'employee_list',
      component: EmployeeListComponent,
      data: {
          pageTitle: 'employee_list'
      }
    },
    {
      path: 'employee_details',
      component: EmployeeDetailsComponent,
      data: {
          pageTitle: 'employee_details'
      }
    },
    {
      path: 'designation_list',
      component: DesignationListComponent,
      data: {
          pageTitle: 'designation_list'
      }
    },
    {
      path: 'designation_details',
      component: DesignationDetailsComponent,
      data: {
          pageTitle: 'designation_details'
      }
    },
    {
      path: 'issue_log_list',
      component: IssueLogListComponent,
      data: {
          pageTitle: 'issue_log_list'
      }
    },
    {
      path: 'issue_log_details',
      component: IssueLogDetailsComponent,
      data: {
          pageTitle: 'issue_log_details'
      }
    },
    {
      path: 'issue_status_list',
      component: IssueStatusListComponent,
      data: {
          pageTitle: 'issue_status_list'
      }
    },
    {
      path: 'issue_status_details',
      component: IssueStatusDetailsComponent,
      data: {
          pageTitle: 'issue_status_details'
      }
    },
    {
      path: 'Assign_product',
      component: AssignproductComponent,
      data: {
          pageTitle: 'Assign_product'
      }
    },
    {
      path: 'Assign_product_list',
      component: AssignProductGridComponent,
      data: {
          pageTitle: 'Assign_product_list'
      }
    },
    {
      path: 'Supplier_list',
      component: SupplierListComponent,
      data: {
          pageTitle: 'Supplier_list'
      }
    },
    {
      path: 'Supplier_details',
      component: SupplierDetailsComponent,
      data: {
          pageTitle: 'Supplier_details'
      }
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
