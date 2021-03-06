import { Component, OnInit, Directive, OnChanges, DoCheck, OnDestroy, Input, Output, EventEmitter, ElementRef, Injector, SimpleChanges } from '@angular/core';
import { AppModule } from '@app/app.module';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UpgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';
import { PlatformLocation } from '@angular/common';


@Component({
  selector: 'sa-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.css']
})
export class OpenComponent implements OnInit {
 public opened: any={ ProductCode:"", ProdissueCode:""};
  
  datepipe = new DatePipe('en-US');
  maxdate = new Date();
  mindate = 0;
  ProdDetails: any;
  ProdIssueDetails: any;
  gridHide=true;
  btnshow;


  constructor(private http:HttpClient,private location: PlatformLocation) { }

  ngOnInit() {

    sessionStorage.removeItem('openeddata');
    // For back disable
    history.pushState(null, null, location.href);
    this.location.onPopState(() => {   console.log('pressed back in add!!!!!');
    history.forward();
    });


   this.btnshow=false;
    
   this.GetDetails();
   this.GetProductDetails();
   

if(sessionStorage.ticketdata!=null)
{
   this.opened=JSON.parse(sessionStorage.ticketdata);
  // this.opened.FDate= sessionStorage.FDate
  // this.opened.TDate= sessionStorage.TDate

  this.opened.ProductCode=this.opened.ProductCode==null||this.opened.ProductCode== undefined?'':this.opened.ProductCode;
  //this.opened.ProdissueCode=this.opened.ProdissueCode==null||this.opened.ProdissueCode== undefined?"":this.opened.ProdissueCode;
    this.opened.ProdissueCode="";
    this.opened.ProductCode="";
   //sessionStorage.removeItem('ticketdata');
   sessionStorage.removeItem('FDate');
   sessionStorage.removeItem('TDate');
   
   this.GetProductIssue(this.opened.ProdissueCode)
 
}

      
      
 }
  onValueChange(value: Date): void {
    // this.opened.ToMon = this.datepipe.transform(value,'dd-MMM-yyyy');
  }

 

  GetProductDetails(){
    //let Emp = Number(sessionStorage.EmpCode);
    this.http.get(AppModule.baseurl+'Transactional/GetProdToEmp?LookUpId=&EmpCode='+ sessionStorage.EmpCode +'&ProductCode&=&IsActive=Y').subscribe((response:any)=>{
      if(response.StatusCode !="0"){
              this.ProdDetails=response.Data;
      }else{
        this.ProdDetails =[];
      }
    })
  }


  GetProductIssue(ProductCode){
   
    this.http.get(AppModule.baseurl+'Master/GetProductIG?ProdissueCode&ProductCode='+ProductCode+'&DomainCode&isactive=Y').subscribe((response:any)=>{
      if(response.StatusCode !="0"){
              this.ProdIssueDetails=response.Data;
      }else{
        this.ProdIssueDetails =[];
      }
     
    })
  }

  GetDetails(){
    this.btnshow=true;
    this.gridHide=false;
    // if(this.opened.FDate == null && this.opened.TDate == null){
    //   this.opened.FDate = new Date();
    //   this.opened.TDate = new Date();
    // }
    var FDate = this.opened.FDate == null?"" : this.datepipe.transform(this.opened.FDate, 'dd-MMM-yyyy');
    var TDate = this.opened.TDate == null?"": this.datepipe.transform (this.opened.TDate,'dd-MMM-yyyy');
    sessionStorage.FDate=this.opened.FDate;
    sessionStorage.TDate=this.opened.TDate;
                                                                 
    this.http.get(AppModule.baseurl+'Transactional/GetOpenTicketsToEmp?ProductCode='+this.opened.ProductCode+'&ProdissueCode='+ this.opened.ProdissueCode +'&PsuiteCode=&DomainCode=&isactive=Y&TicketNo=&CustCode=&StatusCode=&StatType=PE&FDate='+FDate+'&TDate='+TDate +'&IsAutoClosed&EmpCode').subscribe((response:any)=>{
      if(response.StatusCode == 1) {
        sessionStorage.gridData = JSON.stringify(response.Data);
       
        AppModule.Smartalert.Success(response.Message);
      }
      else{
        AppModule.Smartalert.Errmsg(response.Message);
        sessionStorage.removeItem('gridData');
      }
      this.btnshow=false;
      this.gridHide=true;
    })
  }

}
@Directive({selector: 'opened-grid'})
export class openedmasterDirective extends UpgradeComponent implements OnInit, OnChanges, DoCheck,
OnDestroy {
   @Input() data: {}; 
   @Output() onUpdate: EventEmitter<{}>;
  constructor(elementRef: ElementRef, injector: Injector) {
    super('opened-grid', elementRef, injector);
  }
  ngOnInit() { super.ngOnInit(); }
  ngOnChanges(changes: SimpleChanges) {  super.ngOnChanges(changes); }
  ngDoCheck() { super.ngDoCheck(); }
  ngOnDestroy() { super.ngOnDestroy(); }
 }

 export const openedComponent: angular.IComponentOptions = {
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
      //     cellTemplate: '<button class="btn-primary btn-xs"  style="margin:2px;" ng-click="grid.appScope.Edit(row.entity)" data-title="Select"><span class="glyphicon glyphicon-pencil"></span></button>',
      //     width: "45", enableFiltering: false
      // },
      { name: 'Edit', displayName: '', headerCellTemplate: '<div style="margin:2px;"></div>', cellTemplate: '<button class="btn-primary btn-xs" style="margin:2px 11px;" ng-click="grid.appScope.Edit(row.entity)" data-title=""><span class="glyphicon glyphicon-pencil"></span></button>', width: "50", enableFiltering: false },
      
      { name: 'TicketNo', displayName: 'Ticket No.', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'IssueDate', displayName: 'Ticket Date', width: "150", cellTooltip: true,cellClass: 'right-align', headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'CustCode', displayName: 'Client Code', width: "150", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'CustName', displayName: 'Client Name', width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'ProductName', displayName: 'Product', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'ProdgDesc', displayName: 'Issue Type', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'ProdsgDesc', displayName: 'Issue Sub Type', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      { name: 'ImpLeveludesc', displayName: 'Priority', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      { name: 'IssueSubject', displayName: 'Subject', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      { name: 'IssueDetails', displayName: 'Issue Description', width: "400", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      
      // { name: 'CreateDt', displayName: 'Created Date', width: "150",cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
      // { name: 'UpdatedBy', displayName: 'Updated By', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      // { name: 'UpdateDt', displayName: 'Updated Date', width: "150", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, visible: true },
      
      
      ],
      enableGridMenu: true,
      enableSelectAll: true,
      exporterMenuCsv: false,
      exporterMenuPdf: false,
      exporterMenuExcel:true,
      exporterExcelFilename: 'Open Tickets.xlsx',
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
          cols.push({ value: 'Open Tickets', metadata: { style: formatterId.id } });
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
  
  

    if(sessionStorage.gridData!=null){
      $scope.gridOptions.data=JSON.parse(sessionStorage.gridData);      
    }  

    $scope.Edit=function(data){

      sessionStorage.openeddata = JSON.stringify(data);

      
      AppModule.router.navigate(['/transaction/open_view']);
      
      


    }
    this.$onInit = function() {}
  }],
  template: '<div ui-grid="gridOptions" ui-grid-exporter ui-grid-pagination ui-grid-grouping ui-grid-edit ui-grid-selection class="grid" style="width:100%;"></div>'// {{msg.lastCellEdited}}'
};