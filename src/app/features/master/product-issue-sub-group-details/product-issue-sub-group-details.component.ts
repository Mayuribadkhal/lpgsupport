import { Component, OnInit } from '@angular/core';
import { AppModule } from '@app/app.module';
import { HttpClient } from '@angular/common/http';
import * as CryptoJs from '../../../../../node_modules/crypto-js';
import { element } from '@angular/core/src/render3';

@Component({
    selector: 'sa-product-issue-sub-group-details',
    templateUrl: './product-issue-sub-group-details.component.html',
    styleUrls: ['./product-issue-sub-group-details.component.css']
})

export class ProductIssueSubGroupDetailsComponent implements OnInit 
{
    public toEnData;
    public prodIssueSubType:any={IsActive:true, ProdissueCode:"", EmpCode:"",DefEmpCode:"", IsMailSend:false, IsAutoClose:false, StatusCode:"", SuplierId:"", DomainCode:"",PsuiteCode:"",ProductCode:"" };
    public Pissue:boolean=false;
    public Autoclosed:boolean=true;
    public employeename;
    public supplyname;
    public statusType;
    productissuetypename;
    issueStatusTypeName;
            isProdIssueTypeNew;
            loadershow:boolean=false;
  productname: any;
  productsuitename: any[];
  domainname: any[];

    constructor(private http:HttpClient) 
    { 
        // var datePipe = new DatePipe("en-US");
    }
      
    ngOnInit()
    {
      this.GetDomainNames();
      
       this.GetEmployees();
       this.GetSupplierId();
       this.GetStatusType();  
      
       if(sessionStorage.productIssueDubGroupdata!=null)
          {
            this.prodIssueSubType = JSON.parse(sessionStorage.productIssueDubGroupdata);
            this.Pissue=true;
            this.prodIssueSubType.IsGlobal = this.prodIssueSubType.IsActive == 'G' ? true : false ;
            this.prodIssueSubType.IsActive = this.prodIssueSubType.IsGlobal == true ? (false) : (this.prodIssueSubType.IsActive == 'Y'?true : false) ;//nested if for IsActive
            this.prodIssueSubType.SuplierId = this.prodIssueSubType.SuplierId==null ? "":this.prodIssueSubType.SuplierId;
            this.prodIssueSubType.IsMailSend = this.prodIssueSubType.IsMailSend == 'Y'? true :false;
            this.prodIssueSubType.IsAutoClose = this.prodIssueSubType.IsAutoClose == 'Y'? true :false;
            this.GetProductSuiteNames(this.prodIssueSubType.DomainCode);
            this.GetProductNames(this.prodIssueSubType.PsuiteCode,this.prodIssueSubType.DomainCode);
            this.GetProductIssueTypeNames(this.prodIssueSubType.PsuiteCode,this.prodIssueSubType.DomainCode,this.prodIssueSubType.ProductCode);
            sessionStorage.removeItem ('productIssueDubGroupdata');
          }
          this.loadershow=false;
    }


    GetDomainNames(){
      this.http.get(AppModule.baseurl + 'Master/GetDomain?DomainCode&isactive=Y').subscribe((response:any) => {
      if(response.StatusCode != "0")
          {
            this.domainname=response.Data;
          }
      else{
            this.domainname=[];
      
          }   
  })
  }
  
  GetProductSuiteNames(domaincode){
    this.http.get(AppModule.baseurl + 'Master/GetProdSuite?PsuiteCode&DomainCode='+domaincode+'&isactive=Y').subscribe((response:any) => {
    if(response.StatusCode != "0"){
        this.productsuitename=response.Data;
        }
    else{
        this.productsuitename=[];
  
    }   
  })
  }
  
  GetProductNames(productsuitecode, domaincode){
    this.http.get(AppModule.baseurl + 'Master/GetProductDtls?ProductCode&PsuiteCode='+productsuitecode+'&DomainCode='+domaincode+'&isactive=Y').subscribe((response:any) => {
    if(response.StatusCode != "0"){
        this.productname=response.Data;
        }
    else{
        this.productname=[];
    
    }   
  })
  }

    GetProductIssueTypeNames(productsuitecode,domaincode,productcode)
    {
        this.http.get(AppModule.baseurl + 'Master/GetProductIG?ProdissueCode&PsuiteCode='+productsuitecode+'&ProductCode='+productcode+'&DomainCode='+domaincode+'&isactive=Y').subscribe((response:any) => 
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

    GetEmployees(){

      {  
          this.http.get(AppModule.baseurl + 'Master/GetEmployeeDtls?EmpCode&EmpType&DesgCode&isactive=Y').subscribe((response:any) => {
          if(response.StatusCode != "0" ){
              this.employeename=response.Data;
              }
          else{
              this.employeename=[];
            
          }   
        })
      }
    }

    GetSupplierId(){
      this.http.get(AppModule.baseurl + 'Master/GetSuplierDtls?SuplierId=&isactive=').subscribe((response:any) => {
      if(response.StatusCode != "0"){
          this.supplyname=response.Data;
          
          }
      else{
          this.supplyname=[];
        
      }   
    })
    }

    GetStatusType(){
      this.http.get(AppModule.baseurl + 'Master/GetIssueStatus?StatusCode=&StatType='+"CL"+'&IsOpen=&isactive=').subscribe((response:any) => {
      if(response.StatusCode != "0"){
            this.statusType=response.Data;
          
          }
      else{
            this.statusType=[];
          }   
    })
    }

    disableenable(){
      if(this.prodIssueSubType.IsAutoClose!='Y'){
        this.prodIssueSubType.DefEmpCode='';
        this.prodIssueSubType.StatusCode='';
      }else{
      }
    }
    IsGlobalChanged()
  {
    if(this.prodIssueSubType.IsGlobal==true)
    {
      this.prodIssueSubType.IsActive=null;

    }
  }


    OnSubmit()
    {
      this.loadershow=true;
      this.prodIssueSubType.Flag=this.prodIssueSubType.ProductISCode == null? (this.prodIssueSubType.CreatedBy=sessionStorage.EmpCode,'IN'):(this.prodIssueSubType.UpdatedBy=sessionStorage.EmpCode,'UP');
      if (this.prodIssueSubType.Flag=='UP')   { this.Pissue=true;}

      this.prodIssueSubType.IsGlobal = this.prodIssueSubType.IsGlobal == true ? 'Y' : 'N' ;
      this.prodIssueSubType.IsActive = this.prodIssueSubType.IsGlobal == 'Y' ? ('G') : (this.prodIssueSubType.IsActive == true?'Y' : 'N') ;//nested if for IsActive
      
      this.prodIssueSubType.IsMailSend = this.prodIssueSubType.IsMailSend == true? 'Y':'N';
      this.prodIssueSubType.IsAutoClose = this.prodIssueSubType.IsAutoClose == true? 'Y':'N';
      this.prodIssueSubType.DefEmpCode = this.prodIssueSubType.IsAutoClose== 'Y'? this.prodIssueSubType.DefEmpCode:null;
      this.prodIssueSubType.StatusType = this.prodIssueSubType.IsAutoClose== 'Y'? this.prodIssueSubType.StatusType:null;

      this.prodIssueSubType.EmpCode=sessionStorage.EmpCode;
      // this.employee.OffDocBirthDt= this.employee.datePipe.transform(new Date(),"dd-MM-yyyy");

      //encryption
      this.toEnData = JSON.stringify(this.prodIssueSubType);
      let encrypted = CryptoJs.AES.encrypt(this.toEnData,AppModule.secureKey,{iv:AppModule.secureKey});
      let ciphertext = encrypted.ciphertext.toString(CryptoJs.enc.Base64);
      
      //post
      this.http.post(AppModule.baseurl + 'Master/ManageProductISG', {Data:ciphertext} ).subscribe((response:any) => 
      {
        if(response.StatusCode != "0")
              { 
                  AppModule.Smartalert.Success(response.Message);
                  AppModule.router.navigate(['/master/product_issue_dub_group']);
              }
        else
              {
                  AppModule.Smartalert.Errmsg(response.Message);
              }
              this.loadershow=false; 
      })
      
    }

    
}