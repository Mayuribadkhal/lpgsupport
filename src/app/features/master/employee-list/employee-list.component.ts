import { Component, OnInit,Directive,OnChanges,DoCheck,OnDestroy,Input,Output,EventEmitter,Injector,ElementRef,SimpleChanges } from '@angular/core';
import {UpgradeComponent} from '@angular/upgrade/static';
import {AppModule} from '../../../app.module';
import * as angular from 'angular';
@Component({
  selector: 'sa-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
    gridOptions;
  ngOnInit() {
  }

}



@Directive({selector: 'empy-grid'})
export class employeeDirective extends UpgradeComponent implements OnInit, OnChanges, DoCheck,
OnDestroy {
   @Input() data: {}; 
   @Output() onUpdate: EventEmitter<{}>;
  constructor(elementRef: ElementRef, injector: Injector) {
    super('empy-grid', elementRef, injector);
  }
  ngOnInit() { super.ngOnInit(); }
  ngOnChanges(changes: SimpleChanges) {  super.ngOnChanges(changes); }
  ngDoCheck() { super.ngDoCheck(); }
  ngOnDestroy() { super.ngOnDestroy(); }
 }


 export const employeeComponent: angular.IComponentOptions = {
  bindings: {
    data: '<'
  },
  transclude: true,
  controller: ['$scope', '$http', 'uiGridConstants', function($scope, $http, uiGridConstants) {

    //same as your angularjs controller

    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
      if (col.filters[0].term) {
          return 'header-filtered grid-label-center';
      } else {
          return 'grid-label-center';
      }
  };
  $scope.formatters = {};
  $scope.gridOptions = {
      enableFiltering: true,
      onRegisterApi: function (gridApi) {
          $scope.gridApi = gridApi;
      },
      paginationPageSizes: [25, 50, 100, 500, 1000],
      paginationPageSize: 25,
      enableRowSelection: false,
      enableRowHeaderSelection: false,
      columnDefs:
      [
      { name: 'Edit', displayName: '', headerCellTemplate: '<div style="margin:2px;"></div>', cellTemplate: '<button class="btn-primary btn-xs" style="margin:2px 11px;" ng-click="grid.appScope.EmployeeEdit(row.entity)" data-title=""><span class="glyphicon glyphicon-pencil"></span></button>', width: "50", enableFiltering: false, },

      
      { name: 'EmpName', displayName: 'Employee Name', width: "350", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      { name: 'DesgName', displayName: 'Designation', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader},
     // { name: 'EmpTypedesc', displayName: 'Employee Type', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader},
      
     // { name: 'CompanyName', displayName: 'Company Code', width: "400", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      //{ name: 'Gender', displayName: 'Gender', width: "100", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      { name: 'EmpMobile', displayName: 'Mobile No', width: "150", cellTooltip: true,cellClass: 'right-align', headerCellClass: $scope.highlightFilteredHeader },
      { name: 'EmpEmail', displayName: 'Email Id', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
    
     
      { name: 'CreatedBy', displayName: 'Created By', width: "200", type: "number",  cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      { name: 'CreateDt', displayName: 'Created Date', width: "150", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      { name: 'UpdatedBy', displayName: 'Updated By', width: "200", cellTooltip: true,  headerCellClass: $scope.highlightFilteredHeader },
      { name: 'UpdatedDt', displayName: 'Updated Date', width: "150", cellTooltip: true, cellClass: 'right-align', headerCellClass: $scope.highlightFilteredHeader },
      { name: 'IsActive', displayName: 'Is Active', width: "100", cellTooltip: true, cellClass: 'text-c', headerCellClass: $scope.highlightFilteredHeader },


      ],
      enableGridMenu: true,
      enableSelectAll: true,
      exporterMenuCsv: false,
      exporterMenuPdf: false,
      exporterExcelFilename: 'Employee Master.xlsx',
      exporterExcelSheetName: 'Sheet1',
      exporterExcelCustomFormatters: function (grid, workbook, docDefinition) {
          var stylesheet = workbook.getStyleSheet();
          var stdStyle = stylesheet.createFontStyle({
              size: 9, fontName: 'Calibri'
          });
          var boldStyle = stylesheet.createFontStyle({
              size: 9, fontName: 'Calibri', bold: true
          });
          var aFormatDefn = {
              "font": boldStyle.id,
              "alignment": { "wrapText": true }
          };
          var formatter = stylesheet.createFormat(aFormatDefn);
          $scope.formatters['bold'] = formatter;
          var dateFormatter = stylesheet.createSimpleFormatter('date');
          $scope.formatters['date'] = dateFormatter;

          aFormatDefn = {
              "font": stdStyle.id,
             // "fill": { "type": "pattern", "patternType": "solid", "fgColor": "FFFFC7CE" },
              "alignment": { "wrapText": true }
          };
          var singleDefn = {
              font: stdStyle.id,
              format: '#,##0.0'
          };
          formatter = stylesheet.createFormat(aFormatDefn);
          $scope.formatters['red'] = formatter;

          Object.assign(docDefinition.styles, $scope.formatters);

          return docDefinition;
      },
      exporterExcelHeader: function (grid, workbook, sheet, docDefinition) {
          var stylesheet = workbook.getStyleSheet();
          var aFormatDefn = {
              "font": { "size": 15, "fontName": "Calibri", "bold": true },
              "alignment": { "wrapText": true }
          };
          var formatterId = stylesheet.createFormat(aFormatDefn);
          sheet.mergeCells('B1', 'C1');
          var cols = [];
          cols.push({ value: '' });
          cols.push({ value: 'Employee Master', metadata: { style: formatterId.id } });
          sheet.data.push(cols);
      },
      exporterFieldFormatCallback: function (grid, row, gridCol, cellValue) {
          var formatterId = null;
          if (gridCol.field === 'name' && cellValue && cellValue.startsWith('W')) {
              formatterId = $scope.formatters['red'].id;
          }

          if (gridCol.field === 'updatedDate') {
              formatterId = $scope.formatters['date'].id;
          }

          if (formatterId) {
              return { metadata: { style: formatterId } };
          } else {
              return null;
          }
      },
      exporterColumnScaleFactor: 4.5,
      exporterFieldApplyFilters: true,
  };
  $scope.toggleFiltering = function () {
      $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
      $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
  };

 
  $scope.cancel = function () {
      $scope.EmpDetails = false;
  }
  //bind Employee with grid
  $scope.GetEmployee = function () {
      $http.get(AppModule.baseurl + 'Master/GetEmployeeDtls?EmpCodd=&EmpType=&DesgCode=&isactive=').then(function (response) {
          if (response.data.StatusCode != 0) {
              $scope.gridOptions.data = response.data.Data;
              AppModule.Smartalert.Success(response.data.Message);
          }
          else {
            AppModule.Smartalert.Errmsg(response.data.Message);
          }
      })
  }
  $scope.GetEmployee();

  //for edit button
  $scope.EmployeeEdit = function (data) {
      if (data != null) {
          sessionStorage.EmployeeData =JSON.stringify(data);
          AppModule.router.navigate(['/master/employee_details']);
      }
  }

  $scope.addNew = function () {
      sessionStorage.data = null;
  }
  this.$onInit = function() {}

}],
template: '<div ui-grid="gridOptions" ui-grid-resize-columns ui-grid-exporter ui-grid-auto-resize ui-grid-pagination class="grid" style="width:100%;"></div>'
};
