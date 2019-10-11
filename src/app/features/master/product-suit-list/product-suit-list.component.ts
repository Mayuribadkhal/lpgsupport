import { Component, OnInit, Directive, OnDestroy, OnChanges, DoCheck, Input, Output, EventEmitter, ElementRef, Injector, SimpleChanges } from '@angular/core';
import { AppModule } from '@app/app.module';
import{HttpClient} from '@angular/common/http';
import * as angular from 'angular';
import * as CryptoJs from '../../../../../node_modules/crypto-js'

import { UpgradeComponent } from '@angular/upgrade/static';

@Component({
  selector: 'sa-product-suit-list',
  templateUrl: './product-suit-list.component.html',
  styleUrls: ['./product-suit-list.component.css']
})
export class ProductSuitListComponent implements OnInit {
  
  public productsuit: any = {IsActive: true};
  public toEncData: any = {};gridOptions;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    sessionStorage.removeItem('productsuitdata');
  }

}
@Directive({selector: 'productsuit-grid'})
export class productsuitDirective extends UpgradeComponent implements OnInit, OnChanges, DoCheck,
OnDestroy {
   @Input() data: {}; 
   @Output() onUpdate: EventEmitter<{}>;
  constructor(elementRef: ElementRef, injector: Injector) {
    super('productsuit-grid', elementRef, injector);
  }
  ngOnInit() { super.ngOnInit(); }
  ngOnChanges(changes: SimpleChanges) {  super.ngOnChanges(changes); }
  ngDoCheck() { super.ngDoCheck(); }
  ngOnDestroy() { super.ngOnDestroy(); }
 }

 export const productsuitComponent: angular.IComponentOptions = {
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
      enableCellEdit: false,
      //enableGridMenu: false,
      paginationPageSizes: [25, 50, 100, 500, 1000],
      paginationPageSize: 25,
      columnDefs:
      [
      //   {
      //     name: 'Select', headerCellTemplate: '<div style="text-align: left;margin-top: 5px; margin-left:5px;"></div>',
      //     cellTemplate: '<button class="btn btn-primary btn-md"  style="margin:2px;" ng-click="grid.appScope.Edit(row.entity)" data-title="Select"><span class="glyphicon glyphicon-pencil"></span></button>',
      //     width: "45", enableFiltering: false
      // },
      { name: 'Edit', displayName: '', headerCellTemplate: '<div style="margin:2px;"></div>', cellTemplate: '<button class="btn-primary btn-xs" style="margin:2px 11px;" ng-click="grid.appScope.Edit(row.entity)" data-title=""><span class="glyphicon glyphicon-pencil"></span></button>', width: "50", enableFiltering: false },
     
      { name: 'DomainName', displayName: 'Domain Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'PsuiteName', displayName: 'Product Suite Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      
     
      { name: 'CreateDt', displayName: 'Created Date', width: "150", cellClass: 'right-align',cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'CreatedBy', displayName: 'Created By', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'UpdateDt', displayName: 'Updated Date', width: "150", cellClass: 'right-align',cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'UpdatedBy', displayName: 'Updated By', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'IsActive', displayName: 'Is Active', width: "100",  cellClass: 'text-c',cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      //{ name: 'DomainCode', displayName: 'Domain Code', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
     
      


      ],
      enableGridMenu: true,
      enableSelectAll: true,
      exporterMenuCsv: false,
      exporterMenuPdf: false,
      exporterMenuExcel:true,
      exporterExcelFilename: 'Product Suite Master.xlsx',
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
          cols.push({ value: 'Product Suite Master', metadata: { style: formatterId.id } });
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
  
    $scope.Getproductsuit=function(){
      $http.get(AppModule.baseurl+'Master/GetProdSuite?PsuiteCode=&DomainCode&isactive=  ').then(function (response) {
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
    $scope.Getproductsuit();
      
    $scope.Edit=function(data){
      sessionStorage.productsuitdata = JSON.stringify(data);
      AppModule.router.navigate(['/master/Product_suit_details']);


    }
    this.$onInit = function() {}
  }],
  template: '<div ui-grid="gridOptions" ui-grid-exporter ui-grid-pagination ui-grid-grouping ui-grid-edit ui-grid-selection class="grid" style="width:100%;"></div>'// {{msg.lastCellEdited}}'
};