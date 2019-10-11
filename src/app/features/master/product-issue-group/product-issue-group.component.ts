import { Component, OnInit, Directive, OnChanges, DoCheck, OnDestroy, Input, EventEmitter, Output, ElementRef, Injector, SimpleChanges } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import { AppModule } from '@app/app.module';
import * as angular from 'angular';


@Component({
  selector: 'sa-product-issue-group',
  templateUrl: './product-issue-group.component.html',
  styleUrls: ['./product-issue-group.component.css']
})
export class ProductIssueGroupComponent implements OnInit {
public gridOptions;
  constructor() { }

  ngOnInit() {
  }

}


@Directive({selector: 'product-issue-group-grid'})
//This is Facade
export class ProdIssueGrpDirective extends UpgradeComponent implements OnInit, OnChanges, DoCheck,
OnDestroy {
   @Input() data: {}; 
   @Output() onUpdate: EventEmitter<{}>;
  constructor(elementRef: ElementRef, injector: Injector) {
    super('product-issue-group-grid', elementRef, injector);
  }
  ngOnInit() { super.ngOnInit(); }
  ngOnChanges(changes: SimpleChanges) {  super.ngOnChanges(changes); }
  ngDoCheck() { super.ngDoCheck(); }
  ngOnDestroy() { super.ngOnDestroy(); }
 }


//This is const, which will be used in .component()
  export const prodIssueGrpComponent: angular.IComponentOptions = {
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
          enableCellEdit:false,//this is added by dadasaheb
          //enableGridMenu: false,
          paginationPageSizes: [25, 50, 100, 500, 1000],
          paginationPageSize: 25,
          columnDefs:
          [
            { name: 'Edit', displayName: '', headerCellTemplate: '<div style="margin:2px;"></div>', 
              cellTemplate: '<button class="btn-primary btn-xs" style="margin:2px 11px;" ng-click="grid.appScope.Edit(row.entity)" data-title=""><span class="glyphicon glyphicon-pencil"></span></button>', 
              width: "50", enableFiltering: false },
            { name: 'DomainName',   displayName: 'Domain Name',         width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader,  cellClass: 'left-align' },
            { name: 'PsuiteName',   displayName: 'Product Suite Name',  width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader,   cellClass: 'left-align' },
            { name: 'ProductName',  displayName: 'Product Name',        width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader,   cellClass: 'left-align' },
            { name: 'ProdgDesc',    displayName: 'Product Issue Type',  width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader,   cellClass: 'left-align' },
            { name: 'CreateDt',     displayName: 'Created Date',        width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader,   cellClass: 'right-align' },
            { name: 'CreatedBy',    displayName: 'Created By',          width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader,   cellClass: 'left-align' },
            { name: 'UpdateDt',     displayName: 'Updated Date',        width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader,   cellClass: 'right-align' },
            { name: 'UpdatedBy',    displayName: 'Updated By',          width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader,   cellClass: 'left-align' },
            { name: 'IsActive',     displayName: 'Is Active',           width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader,   cellClass: 'text-c' }
         
          // { name: 'ProductCode', displayName: 'Product Code', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          // { name: 'DomainCode', displayName: 'Domain Code', width: "150", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          // { name: 'ProdissueCode', displayName: 'Product Issue Code', width: "150", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        

          ],

          enableGridMenu: true,
          enableSelectAll: true,
          exporterMenuCsv: false,
          exporterMenuPdf: false,
          exporterMenuExcel:true,
          exporterExcelFilename: 'Bank Master.xlsx',
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
              cols.push({ value: 'Product Issue Group Master', metadata: { style: formatterId.id } });
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
      
        $scope.ProductIssueGroup=function(){
          $http.get(AppModule.baseurl+'Master/GetProductIG?ProdissueCode&ProductCode&DomainCode&isactive').then(function (response) {
            if (response.data.StatusCode == 1) {
                $scope.gridOptions.data = response.data.Data;
                AppModule.Smartalert.Success(response.data.Message);
            }
            else {
                AppModule.Smartalert.Errmsg(response.data.Message);
                $scope.gridOptions.data.length = 0;
            }
        })
        }
        $scope.ProductIssueGroup();
          
        $scope.Edit=function(data){
          sessionStorage.productIssueGroupdata = JSON.stringify(data);
            AppModule.router.navigate(['/master/Product_issue_group_details']);
        }
        this.$onInit = function() {}
      }],
      template: '<div ui-grid="gridOptions" ui-grid-exporter ui-grid-pagination ui-grid-grouping ui-grid-edit ui-grid-selection class="grid" style="width:100%;"></div>'// {{msg.lastCellEdited}}'
    };