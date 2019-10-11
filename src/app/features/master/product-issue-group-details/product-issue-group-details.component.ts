import { Component, OnInit } from '@angular/core';
import { AppModule } from '@app/app.module';
import { HttpClient } from '@angular/common/http';
import * as CryptoJs from '../../../../../node_modules/crypto-js';
@Component({
  selector: 'sa-product-issue-group-details',
  templateUrl: './product-issue-group-details.component.html',
  styleUrls: ['./product-issue-group-details.component.css']
})
export class ProductIssueGroupDetailsComponent implements OnInit 

{
  public toEnData;
  public prodIssueType:any={IsActive:true, DomainCode:"", PsuiteCode:"", ProductCode:""};
  domainname;
  productsuitename;
  productname;
  loadershow: boolean=false;


  constructor(private http:HttpClient) { 
    // var datePipe = new DatePipe("en-US");
  }
   
  ngOnInit() {
 
    this.GetDomainNames();



    if(sessionStorage.productIssueGroupdata!=null){
      this.prodIssueType = JSON.parse(sessionStorage.productIssueGroupdata);
      this.prodIssueType.IsGlobal = this.prodIssueType.IsActive == 'G' ? true : false ;
      this.prodIssueType.IsActive = this.prodIssueType.IsGlobal == true ? (false) : (this.prodIssueType.IsActive == 'Y'?true : false) ;//nested if for IsActive
        this.GetProductSuiteNames(this.prodIssueType.DomainCode);
        this.GetProductNames(this.prodIssueType.PsuiteCode, this.prodIssueType.DomainCode);

        sessionStorage.removeItem ('productIssueGroupdata');
      }



  }

  IsGlobalChanged()
  {
    if(this.prodIssueType.IsGlobal==true)
    {
      this.prodIssueType.IsActive=null;

    }

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
  

OnSubmit(){
  this.loadershow=true;
    this.prodIssueType.Flag=this.prodIssueType.ProdissueCode == null? (this.prodIssueType.CreatedBy=sessionStorage.EmpCode,'IN'):(this.prodIssueType.UpdatedBy=sessionStorage.EmpCode,'UP');
    this.prodIssueType.IsGlobal = this.prodIssueType.IsGlobal == true ? 'Y' : 'N' ;
    this.prodIssueType.IsActive = this.prodIssueType.IsGlobal == 'Y' ? ('G') : (this.prodIssueType.IsActive == true?'Y' : 'N') ;//nested if for IsActive
    this.prodIssueType.EmpCode=sessionStorage.EmpCode;
    // this.employee.OffDocBirthDt= this.employee.datePipe.transform(new Date(),"dd-MM-yyyy");

     //encryption
        this.toEnData = JSON.stringify(this.prodIssueType);
        let encrypted = CryptoJs.AES.encrypt(this.toEnData,AppModule.secureKey,{iv:AppModule.secureKey});
        let ciphertext = encrypted.ciphertext.toString(CryptoJs.enc.Base64);
     //post
      this.http.post(AppModule.baseurl + 'Master/ManageProductIG', {Data:ciphertext} ).subscribe((response:any) => {
         if(response.StatusCode != "0"){
         
            AppModule.Smartalert.Success(response.Message);
              AppModule.router.navigate(['/master/Product_issue_group']);
              }
         else{
           
            AppModule.Smartalert.Errmsg(response.Message);
              }
      this.loadershow=false;
     })
     
  }
}




