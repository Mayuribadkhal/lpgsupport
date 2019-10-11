import { Component, OnInit, Directive, OnChanges, DoCheck, OnDestroy, Input, EventEmitter, Output, ElementRef, Injector, SimpleChanges } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UpgradeComponent } from '@angular/upgrade/static';
import * as CryptoJs from '../../../../../node_modules/crypto-js';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import * as angular from 'angular';
import {NotificationService} from '../../../../app/core/services/notification.service';
import {AppModule} from '../../../app.module';

@Component({
  selector: 'sa-assignproduct',
  templateUrl: './assignproduct.component.html',
  styleUrls: ['./assignproduct.component.css']
})
export class AssignproductComponent implements OnInit {
  public assignprod: any = {IsActive: true,DomainCode:"",PsuiteCode:"",EmpCode:"",ProductCode:""};
  public bulkdata: any = [];
  public postproduct: any =[];
  public Pdata: any ={};loadershow;
  public disablesubmit;addloadershow;

  public DomainData;PsuiteData;ProductData;editassigndata;EmployeeData;aproduct;buttonDisabled;
  public GridShow = false;
  public EmpCode:number; lookupid:number;

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.disablesubmit=true;
    sessionStorage.finaldata='';
    
    // For Edit
    if(sessionStorage.AssignProductData!=null){
      this.buttonDisabled=true;
      this.aproduct = JSON.parse(sessionStorage.AssignProductData);
      this.assignprod=this.aproduct;
      this.assignprod.DomainCode="";
      this.assignprod.PsuiteCode ="";
      this.assignprod.ProductCode= "";
      this.assignprod.IsActive=this.assignprod.IsActive=='Y'?true:false;
      this.EmpCode=this.aproduct.EmpCode;
      this.lookupid=this.aproduct.LookUpID;
      this.http.get(AppModule.baseurl + 'Transactional/GetProdToEmp?LookUpId=&EmpCode='+ this.EmpCode +'&ProductCode&=&IsActive').subscribe((response: any) => {
      if (response.StatusCode != '0') {
        //assign to bulk insert and display grid data
        for(var i=0;i<response.Data.length;i++){
        this.bulkdata.push(response.Data[i]);
        this.disablesubmit=false;
        }
        this.postproduct= this.bulkdata;
        //end
        sessionStorage.AssProdData = JSON.stringify(response.Data);
        this.GridShow = true;
        } 
        else {
          // alert("No Record Found");
              }
        });
        sessionStorage.removeItem('AssignProductData');
      }
      else
      {
      this.buttonDisabled=false;
      }


      //for employee
      this.http.get(AppModule.baseurl + 'Master/GetEmployeeDtls?EmpCodd=&EmpType=&DesgCode=&isactive=Y').subscribe((response: any) => {
      if (response.StatusCode != '0') {
          this.EmployeeData = response.Data;
            } 
      else 
            {
      this.EmployeeData = [];
            }
      });

      //For Domain dropdown 
      this.http.get(AppModule.baseurl + 'Master/GetDomain?DomainCode&isactive=Y').subscribe((response: any) => {
        if (response.StatusCode != '0') {
              this.DomainData = response.Data;
          } else {
            this.DomainData = [];
          }
        });
        }

    //For Product Suite dropdown 
      GetProductSuite(DomainCode){
        this.http.get(AppModule.baseurl + 'Master/GetDomain?DomainCode='+ this.assignprod.DomainCode +'&isactive=Y').subscribe((response: any) => {
        if (response.StatusCode != '0') {
         this.assignprod.DomainName = response.Data[0].DomainName;
        } 
        });
        this.http.get(AppModule.baseurl + 'Master/GetProdSuite?PsuiteCode=&DomainCode='+ this.assignprod.DomainCode+'&isactive=Y').subscribe((response: any) => {
        if (response.StatusCode != '0') {
          this.PsuiteData = response.Data;
       } else {
        this.PsuiteData = [];
        // alert(response.Message);
       }
      });
     }

    //For Product dropdown 
    GetProduct(PsuiteCode){
    this.http.get(AppModule.baseurl + 'Master/GetProdSuite?PsuiteCode='+ this.assignprod.PsuiteCode +'&DomainCode='+ this.assignprod.DomainCode+'&isactive=Y').subscribe((response: any) => {
      if (response.StatusCode != '0') {
        this.assignprod.PsuiteName = response.Data[0].PsuiteName;
      }
      });
     this.http.get(AppModule.baseurl + 'Master/GetProductDtls?ProductCode=&PsuiteCode='+ this.assignprod.PsuiteCode +'&DomainCode=&isactive=').subscribe((response: any) => {
      if (response.StatusCode != '0') {
          this.ProductData = response.Data;
      } else {
        this.ProductData = [];
       }
      });
    }


  //For Product Name 
  GetProductName(ProductCode){
    this.http.get(AppModule.baseurl + 'Master/GetProductDtls?ProductCode='+ this.assignprod.ProductCode +'&PsuiteCode='+ this.assignprod.PsuiteCode +'&DomainCode=&isactive=').subscribe((response: any) => {
      if (response.StatusCode != '0') {
   
        this.assignprod.ProductName = response.Data[0].ProductName;
      }
    });
  }

  AddAssProd(){
    this.addloadershow=true;
    let assignp;
    this.bulkdata.filter(ob => {  if (ob.ProductCode == this.assignprod.ProductCode ) {  assignp= ob;  }     });
    if(assignp==undefined){
    if(this.assignprod.ProductCode!='' && this.assignprod.ProductCode!=null && this.assignprod.ProductCode!=undefined){
    this.GridShow = false;
    this.assignprod.IsActive=this.assignprod.IsActive == true? 'Y' : 'N' ;
   
    this.bulkdata.push({DomainName: this.assignprod.DomainName, PsuiteName: this.assignprod.PsuiteName, ProductCode: this.assignprod.ProductCode,ProductName: this.assignprod.ProductName,IsActive: this.assignprod.IsActive });
    this.postproduct= this.bulkdata;
  if(this.bulkdata.length!=0){
    this.disablesubmit=false;
  }else{
    this.disablesubmit=true;
  }
      
  
    //  this.postproduct.push({LookUpID:null,ProductCode: this.assignprod.ProductCode,IsActive: this.assignprod.IsActive});
    sessionStorage.AssProdData=JSON.stringify(this.bulkdata);
 
    //this.addloadershow=false;
    this.assignprod.IsActive=true;
    // AppModule.Smartalert.Success("Record Added Successfully");
    setTimeout(()=>{this.GridShow = true;   this.disablesubmit=false;},200)
      }
      }
    else
    {
      //this.addloadershow=false;
  AppModule.Smartalert.Errmsg("Record already exists");  
    }
    this.addloadershow=false;
  }


//call function in post function 

postEMpAssignProd(){
  this.assignprod.UEmpCode = sessionStorage.EmpCode;
  this.Pdata={
    data: this.postproduct,
    EmpCode:Number(this.assignprod.EmpCode),
    UEmpCode:Number(sessionStorage.EmpCode),
    flag: this.assignprod.Flag
  }
  
    this.http.post(AppModule.baseurl+'Transactional/ManageProdToEmp',this.Pdata ).subscribe((response:any)=>{
      if(response.StatusCode != '0' && response.StatusCode != ""){
        AppModule.Smartalert.Success(response.Message);
        this.loadershow=false;
        AppModule.router.navigate(['/master/Assign_product_list']);
      }
      else{ 
        this.loadershow=false;
         AppModule.Smartalert.Errmsg(response.Message);       
      }
    
    })
}

//To Post Bulk Data on submit

AssignProductsave() {
  this.loadershow=true;
  if (sessionStorage.finaldata != "") {
    this.postproduct = JSON.parse(sessionStorage.finaldata);
    sessionStorage.finaldata = '';
    this.assignprod.EmpCode = this.EmpCode==undefined?this.assignprod.EmpCode:this.EmpCode;
    this.assignprod.Flag = "UP";
    this.postEMpAssignProd();

  } else
    if (this.postproduct.length > 0) {
      this.assignprod.IsActive = this.assignprod.IsActive == true ? 'Y' : 'N';
      this.assignprod.Flag = "IN";
      this.postEMpAssignProd();
    }
    else {
      this.loadershow=false;
      AppModule.Smartalert.Errmsg("No Record to Update");
    }
  }
}



@Directive({selector: 'assproduct-grid'})
export class AssignproductDirective extends UpgradeComponent implements OnInit, OnChanges, DoCheck,
OnDestroy {
   @Input() data: {}; 
   @Output() onUpdate: EventEmitter<{}>;
  constructor(elementRef: ElementRef, injector: Injector) {
    super('assproduct-grid', elementRef, injector);
  }
  ngOnInit() { super.ngOnInit(); }
  ngOnChanges(changes: SimpleChanges) {  super.ngOnChanges(changes); }
  ngDoCheck() { super.ngDoCheck(); }
  ngOnDestroy() { super.ngOnDestroy(); }
 }



  export const AssproductComponent: angular.IComponentOptions = {
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
          // $scope.gridOptions.data =angular.fromJson(sessionStorage.AssProdData);
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
          { name: 'Delete', displayName: '', headerCellTemplate: '<div style="margin:2px;"></div>', cellTemplate: '<button ng-if="row.entity.IsActive==\'Y\'" class="btn-danger btn-xs" style="margin:2px 11px;" ng-click="grid.appScope.DeleteAssignProduct(row.entity)" data-title=""><span class="glyphicon glyphicon-trash"></span></button><button ng-if="row.entity.IsActive==\'N\'" class="btn-primary btn-xs" style="margin:2px 11px;" ng-click="grid.appScope.DeleteAssignProduct(row.entity)" data-title=""><span class="glyphicon glyphicon-plus"></span></button>', width: "50", enableFiltering: false },
         
          { name: 'DomainName', displayName: 'Domain Name', width: "*", cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader},
          { name: 'PsuiteName', displayName: 'Product Suite', width: "*",  cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'ProductName', displayName: 'Product Name', width: "*",  cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
          { name: 'IsActive', displayName: 'Is Active', width: "*",  cellClass: 'text-c',cellTooltip: true, headerCellClass: $scope.highlightFilteredHeader },
         
          ],

          enableGridMenu: true,
          enableSelectAll: true,
          exporterMenuCsv: false,
          exporterMenuPdf: false,
          exporterMenuExcel:true,
          exporterExcelFilename: 'Assign Product.xlsx',
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
              cols.push({ value: 'Assign Product', metadata: { style: formatterId.id } });
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
      
        $scope.productData=[];
        $scope.TempDeletedData=[];
        $scope.ReadyData=[];

        if(sessionStorage.AssProdData!=null)
        {
         
            $scope.gridOptions.data =angular.fromJson(sessionStorage.AssProdData);
            $scope.productData=$scope.gridOptions.data;
            sessionStorage.removeItem("AssProdData");
          }
        else
        {
          $scope.gridOptions.data = [];
          AppModule.Smartalert.Success(" No record found");
        } 
        
      //For Delete Function

        $scope.DeleteAssignProduct=function(prod){
        if(prod!=null){
        sessionStorage.finaldata='';
        //  prod.IsActive="N";
        prod.IsActive=prod.IsActive=="N"?"Y":"N";
         $scope.TempDeletedData.push(prod);
         var pindex = $scope.productData.indexOf(prod);
         $scope.productData.splice(pindex, 1);
         $scope.gridOptions.data=[];
         $scope.gridOptions.data = $scope.productData;
         $scope.ReadyData=$scope.productData;
         for (var i=0; i < $scope.TempDeletedData.length; i++) {
        $scope.ReadyData.push($scope.TempDeletedData.pop());
           }
           sessionStorage.finaldata=JSON.stringify($scope.ReadyData);

        }
           
      }
      
        this.$onInit = function() {}
      }],
      template: '<div ui-grid="gridOptions" ui-grid-exporter ui-grid-pagination ui-grid-grouping ui-grid-edit ui-grid-selection class="grid" style="width:100%;"></div>'// {{msg.lastCellEdited}}'
    };

