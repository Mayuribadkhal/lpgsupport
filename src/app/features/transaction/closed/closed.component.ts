import { Component, OnInit, Directive, OnChanges, DoCheck, OnDestroy, Input, EventEmitter, Output, ElementRef, Injector, SimpleChanges } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import { AppModule } from '@app/app.module';
import * as angular from 'angular';
import * as CryptoJs from '../../../../../node_modules/crypto-js';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'sa-closed',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.css']
})
export class ClosedComponent implements OnInit 
{
  public toEnData;
  public closedTicket:any={ ProdissueCode:"", EmpCode:"", ProductCode:""};
  public Pissue:boolean=false;
  public Autoclosed:boolean=true;
  public statusType;
  productissuetypename;
  issueStatusTypeName;
  loadershow:boolean=false;
  productname: any;
  datepipe = new DatePipe('en-US');
  public ShowGrid=false;
  
  maxdate= new Date();
  mindate=0;

  constructor(private http:HttpClient) 
  { 
      // var datePipe = new DatePipe("en-US");
  }
    
  ngOnInit()
  {
  

    if (this.closedTicket.FDate==null && this.closedTicket.TDate==null)
    {

      this.closedTicket.FDate= new Date();
      this.closedTicket.TDate= new Date();
    
    }
    this.GetProduct();
    this.OnGetDetails();
    
    if(sessionStorage.closedTicketsdata!=null)
        {
          this.closedTicket = JSON.parse(sessionStorage.closedTicketsdata);
          sessionStorage.removeItem ('closedTicketsdata');
        }
   
  }

  GetProduct()

  {  
      this.closedTicket.EmpCode=sessionStorage.EmpCode;
      this.http.get(AppModule.baseurl + 'Transactional/GetProdToEmp?LookUpId=&EmpCode='+this.closedTicket.EmpCode+'&ProductCode&=&IsActive').subscribe((response:any) => 
      {
        if(response.StatusCode != "0" )
            {
              this.productname=response.Data;
            }
        else
            {
             this.productname=[];
            }   
      })
  }
  


  GetProductIssueTypeNames(productcode)
  {
      this.http.get(AppModule.baseurl + 'Master/GetProductIG?ProdissueCode=&ProductCode='+productcode+'&DomainCode&isactive=&PsuiteCode=').subscribe((response:any) => 
      {
        if(response.StatusCode != "0")
            {
              this.productissuetypename=response.Data;
            }
        else{
              this.productissuetypename=[];
            }   
      })
  }

 
  
  MakeFromAndToDateSame()
  {
    this.closedTicket.TDate=this.closedTicket.FDate;
  }

  

  OnGetDetails()
  {
    this.loadershow=true;
    this.closedTicket.FDate = this.datepipe.transform(this.closedTicket.FDate, 'dd-MMM-yyyy');
    this.closedTicket.TDate = this.datepipe.transform(this.closedTicket.TDate, 'dd-MMM-yyyy');
    this.closedTicket.EmpCode=sessionStorage.EmpCode;

    //get
    this.closedTicket.ProductCode;
    this.closedTicket.ProdissueCode;
    this.closedTicket.FDate;
    this.closedTicket.TDate;
    this.ShowGrid=false;

    if(sessionStorage.DesgLevel>=10){
      this.http.get(AppModule.baseurl + 'Transactional/GetProdIssueTran?ProductCode='+this.closedTicket.ProductCode+'&ProdissueCode='+this.closedTicket.ProdissueCode+'&PsuiteCode=&DomainCode=&isactive=&TicketNo=&CustCode=&StatusCode=&FDate='+this.closedTicket.FDate+'&TDate='+this.closedTicket.TDate+'&IsAutoClosed=&StatType=CL&EmpCode').subscribe((response:any) => 
      {
        if(response.StatusCode != "0")
  
            {
              this.ShowGrid=true;
              sessionStorage.gridData=JSON.stringify(response.Data);
              AppModule.Smartalert.Success(response.Message);
            }
        else{
              this.ShowGrid=true;
              AppModule.Smartalert.Errmsg(response.Message);
            } 
            this.loadershow=false;  
      })

    }else{
      this.http.get(AppModule.baseurl + 'Transactional/GetProdIssueTran?ProductCode='+this.closedTicket.ProductCode+'&ProdissueCode='+this.closedTicket.ProdissueCode+'&PsuiteCode=&DomainCode=&isactive=&TicketNo=&CustCode=&StatusCode=&FDate='+this.closedTicket.FDate+'&TDate='+this.closedTicket.TDate+'&IsAutoClosed=&StatType=CL&EmpCode='+this.closedTicket.EmpCode).subscribe((response:any) => 
      {
        if(response.StatusCode != "0")
  
            {
              this.ShowGrid=true;
              sessionStorage.gridData=JSON.stringify(response.Data);
              AppModule.Smartalert.Success(response.Message);
            }
        else{
              this.ShowGrid=true;
              AppModule.Smartalert.Errmsg(response.Message);
            } 
            this.loadershow=false;  
      })

    }
     
  }

  
}





//grid
@Directive({selector: 'closed-trans-grid'})
//This is Facade
export class ClosedTicketsDirective extends UpgradeComponent implements OnInit, OnChanges, DoCheck,
OnDestroy {
   @Input() data: {}; 
   @Output() onUpdate: EventEmitter<{}>;
  constructor(elementRef: ElementRef, injector: Injector) {
    super('closed-trans-grid', elementRef, injector);
  }
  ngOnInit() { super.ngOnInit(); }
  ngOnChanges(changes: SimpleChanges) {  super.ngOnChanges(changes); }
  ngDoCheck() { super.ngDoCheck(); }
  ngOnDestroy() { super.ngOnDestroy(); }
 }


//This is const, which will be used in .component()
  export const closedTicketsComponent: angular.IComponentOptions = {
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
       
          { name: 'TicketNo',         displayName: 'Ticket No',                 width: "120",   cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'right-align' },
          { name: 'CustCode',         displayName: 'Client Code',                 width: "100",   cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'right-align' },            
          { name: 'CustName',         displayName: 'Client Name',                 width: "200",   cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },
          { name: 'ProductName',      displayName: 'Product Name',              width: "150",   cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },
          { name: 'ProdgDesc',        displayName: 'Product Issue Type',      width: "250",   cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },
          { name: 'ProdsgDesc',       displayName: 'Product Issue Sub Type',  width: "250",   cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },
          { name: 'ImpLevelddesc',    displayName: 'Priority',                width: "150",   cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },
          { name: 'IssueSubject',     displayName: 'Issue Subject',               width: "150",   cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },            
          { name: 'IssueDetails',     displayName: 'Issue Details',               width: "150",   cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },            
          { name: 'LastRemark',       displayName: 'Remark',                  width: "150",   cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },         
          { name: 'IsAutoClosed',     displayName: 'IsAutoClosed',              width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'text-c' },
          { name: 'CreateDt',         displayName: 'Created Date',              width: "150",   cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'right-align' },
          { name: 'UpdateDt',         displayName: 'Updated Date',              width: "200",   cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'right-align' },
          { name: 'UpdatedBy',        displayName: 'Updated By',                width: "150",   cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },            
          { name: 'IsActive',         displayName: 'Is Active',               width: "100",   cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'text-c'}
            
          // { name: 'CreatedBy',        displayName: 'Created By',              width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },
            
            // { name: 'CreatedBy1',       displayName: 'Created By 1',            width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'right-align' },
            // { name: 'CurEmpCode',       displayName: 'Created By',              width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },
            // { name: 'CustCode',         displayName: 'Cust Code',            width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'right-align' },
             // { name: 'DomainCode',       displayName: 'Domain Code',            width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },
            // { name: 'ImpLeveld',        displayName: 'ImpLeveld',            width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'right-align' },
            // { name: 'ImpLevelu',        displayName: 'ImpLevelu By',              width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },
            // { name: 'IsAutoClosed',     displayName: 'IsAutoClosed',              width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },            
            // { name: 'ProductCode',      displayName: 'Product Code',                width: "300", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },
            // { name: 'LastIssueasigndt', displayName: 'LastIssueasigndt',            width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'right-align' },
            // { name: 'ProductISCode',    displayName: 'ProductSCode',              width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },
            // { name: 'PsuiteCode',       displayName: 'Product Suite Code',              width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },            
            // { name: 'UpdateDt',         displayName: 'Updated Date',            width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'right-align' },
            // { name: 'UpdatedBy',        displayName: 'Updated By',              width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },            
            // { name: 'attachmentA',      displayName: 'Attachment A',          width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'text-c' },
            // { name: 'attachmentB',      displayName: 'Attachment B',            width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'right-align' },
            // { name: 'attachmentC',      displayName: 'Attachment C',              width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'left-align' },            
            // { name: 'ProdissueCode',    displayName: 'Product Issue Code',            width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader, cellClass: 'right-align' },
           
           

          
          
          //   { name: 'ProductISCode', displayName: 'Product Issue Sub Code', width: "150", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          // { name: 'ProdissueCode', displayName: 'Product Issue Code', width: "150", cellClass: 'right-align', cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader }
          
          ],

          enableGridMenu: true,
          enableSelectAll: true,
          exporterMenuCsv: false,
          exporterMenuPdf: false,
          exporterMenuExcel:true,
          exporterExcelFilename: 'Closed Tickets.xlsx',
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
              cols.push({ value: 'Closed Tickets', metadata: { style: formatterId.id } });
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

        if (sessionStorage.gridData!=null)
        {
          // $scope.gridOptions.data=angular.fromJson(sessionStorage.gridData);
          $scope.gridOptions.data=angular.fromJson(sessionStorage.gridData);
          sessionStorage.removeItem("gridData");
       
        }


        $scope.ClosedTicketsDetails=function()
        {
          
        //   $http.get(AppModule.baseurl+'Transactional/GetProdIssueTran?ProductCode=&ProdissueCode=&PsuiteCode=&DomainCode=&isactive=&TicketNo=&CustCode=&StatusCode=&FDate='+"01-Aug-2019"+'&TDate='+"03-Aug-2019"+'&IsAutoClosed=&StatusType='+"CL"+'').then(function (response) {
        //     if (response.data.StatusCode == 1) {
        //         $scope.gridOptions.data = response.data.Data;
        //         AppModule.Smartalert.Success(response.data.Message);
        //     }
        //     else {
        //         AppModule.Smartalert.Errmsg(response.data.Message);
        //         $scope.gridOptions.data.length = 0;
        //     }
        // })
        }
        $scope.ClosedTicketsDetails();
          
        // $scope.Edit=function(data){
        //   sessionStorage.closedTicketsdata = JSON.stringify(data);
        //     // AppModule.router.navigate(['/master/product_issue_sub_group_details']);
        // }
        this.$onInit = function() {}
      }],
      template: '<div ui-grid="gridOptions" ui-grid-exporter ui-grid-pagination ui-grid-grouping ui-grid-edit ui-grid-selection class="grid" style="width:100%;"></div>'// {{msg.lastCellEdited}}'
    };



