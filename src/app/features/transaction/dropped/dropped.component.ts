import { Component, OnInit, Directive, OnChanges, DoCheck, OnDestroy, Input, Output, EventEmitter, ElementRef, Injector, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppModule } from '@app/app.module';
import { DatePipe } from '@angular/common';
import { UpgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';

@Component({
  selector: 'sa-dropped',
  templateUrl: './dropped.component.html',
  styleUrls: ['./dropped.component.css']
})
export class DroppedComponent implements OnInit {
  dropped: any={ProductCode:'',ProdissueCode:''};ProdDetails;ProdIssueDetails;
  datepipe = new DatePipe('en-US');
  gridOptions;
  gridHide=false;
  btnshow;
  maxdate=new Date();
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.btnshow=false;
    if(this.dropped.FDate == null && this.dropped.TDate == null){
      this.dropped.FDate=new Date();
      this.dropped.TDate=new Date();
    
  }
    this.GetProductDetails();
    this.GetDetails();
  }

  onValueChange(value: Date): void {
    this.dropped.ToMon = this.datepipe.transform(value,'dd-MMM-yyyy');
  }

  GetProductDetails(){
    this.http.get(AppModule.baseurl+'Transactional/GetProdToEmp?LookUpId=&EmpCode='+sessionStorage.EmpCode+'&ProductCode&=&IsActive=Y').subscribe((response:any)=>{
      if(response.StatusCode !="0"){
        this.ProdDetails=response.Data;
        } else {
          this.ProdDetails = [];
        } 
      })
  }

  GetProductIssue(ProductCode){
    this.http.get(AppModule.baseurl+'Master/GetProductIG?ProdissueCode&ProductCode='+ ProductCode +'&DomainCode&isactive=Y').subscribe((response:any)=>{
      if(response.StatusCode !="0"){
        this.ProdIssueDetails=response.Data;
        } else {
          this.ProdIssueDetails = [];
        } 
      })
  }
  GetDetails(){
    this.gridHide=false;
    this.btnshow = true;
    this.dropped.EmpCode = sessionStorage.EmpCode;
    this.dropped.FDate = this.datepipe.transform(this.dropped.FDate, 'dd-MMM-yyyy');
    this.dropped.TDate = this.datepipe.transform (this.dropped.TDate,'dd-MMM-yyyy');

    if(sessionStorage.DesgLevel>=10){
        this.http.get(AppModule.baseurl+'Transactional/GetProdIssueTran?ProductCode='+this.dropped.ProductCode+'&ProdissueCode='+this.dropped.ProdissueCode+'&PsuiteCode=&DomainCode=&isactive=&TicketNo=&CustCode=&StatusCode=&FDate='+this.dropped.FDate+'&TDate='+this.dropped.TDate+'&IsAutoClosed=&StatType=DR&EmpCode').subscribe((response:any)=>{
            if(response.StatusCode == 1) {
              sessionStorage.gridData = JSON.stringify(response.Data);
              AppModule.Smartalert.Success(response.Message);
            }
            else{
              AppModule.Smartalert.Errmsg(response.Message);
              sessionStorage.removeItem('gridData');
            }
            this.btnshow =false;
            this.gridHide=true;
          })
    }
    else{
        this.http.get(AppModule.baseurl+'Transactional/GetProdIssueTran?ProductCode='+this.dropped.ProductCode+'&ProdissueCode='+this.dropped.ProdissueCode+'&PsuiteCode=&DomainCode=&isactive=&TicketNo=&CustCode=&StatusCode=&FDate='+this.dropped.FDate+'&TDate='+this.dropped.TDate+'&IsAutoClosed=&StatType=DR&EmpCode='+this.dropped.EmpCode).subscribe((response:any)=>{
            if(response.StatusCode == 1) {
              sessionStorage.gridData = JSON.stringify(response.Data);
              AppModule.Smartalert.Success(response.Message);
            }
            else{
              AppModule.Smartalert.Errmsg(response.Message);
              sessionStorage.removeItem('gridData');
            }
            this.btnshow =false;
            this.gridHide=true;
          })

    }



    
  }
}


@Directive({selector: 'dropped-grid'})
export class droppedmasterDirective extends UpgradeComponent implements OnInit, OnChanges, DoCheck,
OnDestroy {
   @Input() data: {}; 
   @Output() onUpdate: EventEmitter<{}>;
  constructor(elementRef: ElementRef, injector: Injector) {
    super('dropped-grid', elementRef, injector);
  }
  ngOnInit() { super.ngOnInit(); }
  ngOnChanges(changes: SimpleChanges) {  super.ngOnChanges(changes); }
  ngDoCheck() { super.ngDoCheck(); }
  ngOnDestroy() { super.ngOnDestroy(); }
 }

 export const droppedComponent: angular.IComponentOptions = {
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
      //{ name: 'Edit', displayName: '', headerCellTemplate: '<div style="margin:2px;"></div>', cellTemplate: '<button class="btn-primary btn-xs" style="margin:2px 11px;" ng-click="grid.appScope.EmployeeEdit(row.entity)" data-title=""><span class="glyphicon glyphicon-pencil"></span></button>', width: "50", enableFiltering: false, },

      
      { name: 'TicketNo', displayName: 'Ticket No', width: "120", cellClass: 'right-align',cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'IssueDate', displayName: 'Ticket Date', width: "150", cellTooltip: true,cellClass: 'right-align', headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'CustCode', displayName: 'Client Code', width: "100", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'CustName', displayName: 'Client Name', width: "200", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'ProductName', displayName: 'Product', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'ProdgDesc', displayName: 'Issue Type', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'ProdsgDesc', displayName: 'Issue Sub Type', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'ImpLeveludesc', displayName: 'Priority', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      { name: 'IssueSubject', displayName: 'Subject', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
        
      { name: 'IssueDetails', displayName: 'Issue Details', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'LastRemark', displayName: 'Remark', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
     
      // { name: 'CreatedBy', displayName: 'Created By', width: "200", type: "number",  cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      { name: 'CreateDt', displayName: 'Created Date', width: "150", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      { name: 'UpdatedBy', displayName: 'Updated By', width: "200", cellTooltip: true,  headerCellClass: $scope.highlightFilteredHeader },
      { name: 'UpdatedDt', displayName: 'Updated Date', width: "150", cellTooltip: true, cellClass: 'right-align', headerCellClass: $scope.highlightFilteredHeader },
      { name: 'IsActive', displayName: 'Is Active', width: "100", cellTooltip: true, cellClass: 'text-c', headerCellClass: $scope.highlightFilteredHeader },


      ],
      enableGridMenu: true,
      enableSelectAll: true,
      exporterMenuCsv: false,
      exporterMenuPdf: false,
      exporterExcelFilename: 'Dropped Tickets.xlsx',
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
          cols.push({ value: 'Dropped Tickets', metadata: { style: formatterId.id } });
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
  
  

    if(sessionStorage.gridData!=null){
      $scope.gridOptions.data=JSON.parse(sessionStorage.gridData);      
    }  

    this.$onInit = function() {}

}],
template: '<div ui-grid="gridOptions" ui-grid-resize-columns ui-grid-exporter ui-grid-auto-resize ui-grid-pagination class="grid" style="width:100%;"></div>'
};