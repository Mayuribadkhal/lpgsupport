import { Component, OnInit, Directive, OnChanges, DoCheck, OnDestroy, Input, EventEmitter, Output, ElementRef, Injector, SimpleChanges } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UpgradeComponent } from '@angular/upgrade/static';
import * as CryptoJs from '../../../../../node_modules/crypto-js';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import * as angular from 'angular';
import {NotificationService} from '../../../../app/core/services/notification.service';
import {AppModule} from '../../../app.module';

@Component({
  selector: 'sa-assign-product-grid',
  templateUrl: './assign-product-grid.component.html',
  styleUrls: ['./assign-product-grid.component.css']
})
export class AssignProductGridComponent implements OnInit {
  public gridOptions=[];
  constructor() { }

  ngOnInit() {
  }

}



@Directive({selector: 'assproductlist-grid'})
export class AssignproductListDirective extends UpgradeComponent implements OnInit, OnChanges, DoCheck,
OnDestroy {
   @Input() data: {}; 
   @Output() onUpdate: EventEmitter<{}>;
  constructor(elementRef: ElementRef, injector: Injector) {
    super('assproductlist-grid', elementRef, injector);
  }
  ngOnInit() { super.ngOnInit(); }
  ngOnChanges(changes: SimpleChanges) {  super.ngOnChanges(changes); }
  ngDoCheck() { super.ngDoCheck(); }
  ngOnDestroy() { super.ngOnDestroy(); }
 }

  export const AssproductListComponent: angular.IComponentOptions = {
      bindings: {
        data: '<'
      },
      transclude: true,
      controller: ['$scope', '$http', 'uiGridConstants', function($scope, $http, uiGridConstants) {
       
        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
          if (col.filters[0].term) {
            return 'header-filtered grid-label-center';
          } else {
            return 'grid-label-center';
          }
        };

          $scope.formatters = {},
          $scope.gridOptions = {
          enableFiltering: true,
          showGridFooter: true,
          showColumnFooter: false,
          enableSorting: true,
          enableColumnResizing: true,
          enableRowSelection: false,
          treeRowHeaderAlwaysVisible: false,
          enableRowHeaderSelection: false,
          //enableGridMenu: false,
          paginationPageSizes: [25, 50, 100, 500, 1000],
          paginationPageSize: 25,
          columnDefs:
          [
            { name: 'Edit', displayName: '', headerCellTemplate: '<div style="margin:2px;"></div>', cellTemplate: '<button class="btn-primary btn-xs" style="margin:2px 11px;" ng-click="grid.appScope.EditAssignProduct(row.entity)" data-title=""><span class="glyphicon glyphicon-pencil"></span></button>', width: "50", enableFiltering: false },
         
            { name: 'EmpCode', displayName: 'Employee Code', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader ,visible:false},
            { name: 'EmpName', displayName: 'Employee Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader},
            { name: 'EmpMobile', displayName: 'Mobile No.', width: "300", cellTooltip: true, cellClass: 'right-align',headerCellClass: $scope.highlightFilteredHeader},
            { name: 'EmpEmail', displayName: 'Email ID', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
            { name: 'ProdAssign', displayName: 'Products', width: "150", cellTooltip: true,  cellClass: 'right-align', headerCellClass: $scope.highlightFilteredHeader },
  
          ],

          enableGridMenu: true,
          enableSelectAll: true,
          exporterMenuCsv: false,
          exporterMenuPdf: false,
          exporterMenuExcel:true,
          exporterExcelFilename: 'Assign Product To Employee Master.xlsx',
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
  
              var FormatDefn = {
                  "font": stdStyle.id,
                  "fill": { "type": "pattern", "patternType": "solid", "fgColor": "FFFFC7CE" },
                  "alignment": { "wrapText": true }
              };
              var singleDefn = {
                  font: stdStyle.id,
                  format: '#,##0.0'
              };
              formatter = stylesheet.createFormat(FormatDefn);
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
              cols.push({ value: 'Assign Product To Employee Master', metadata: { style: formatterId.id } });
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
  
          onRegisterApi: function (gridApi) {
              $scope.gridApi = gridApi;
          }
      };

        $scope.toggleFiltering = function () {
          $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
          $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        };
      
  //bind Employee with grid
  $scope.Assignprod = function () {
    $http.get(AppModule.baseurl + 'Transactional/GetProdToEmpSum?LookUpId=&EmpCode=&ProductCode&=').then(function (response) {
        if (response.data.StatusCode != 0) {
            $scope.gridOptions.data = response.data.Data;
            AppModule.Smartalert.Success(response.data.Message);
        }
        else {
          AppModule.Smartalert.Errmsg(response.data.Message);
        }
    })
}
$scope.Assignprod();
          
        $scope.EditAssignProduct=function(data){
          sessionStorage.AssignProductData = JSON.stringify(data);
            AppModule.router.navigate(['/master/Assign_product']);
        }
        this.$onInit = function() {}
      }],
      template: '<div ui-grid="gridOptions" ui-grid-exporter ui-grid-pagination ui-grid-grouping ui-grid-edit ui-grid-selection class="grid" style="width:100%;"></div>'// {{msg.lastCellEdited}}'
    };

