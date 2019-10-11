import { Component, OnInit } from '@angular/core';
import { AppModule } from '@app/app.module';
import {HttpClient} from '@angular/common/http';
import * as CryptoJs from '../../../../../node_modules/crypto-js';


@Component({
  selector: 'sa-product-suit-details',
  templateUrl: './product-suit-details.component.html',
  styleUrls: ['./product-suit-details.component.css']
})
export class ProductSuitDetailsComponent implements OnInit {
  productsuit: any=  { IsActive:true, DomainCode:""};
  DomainName: any;
  toEncData;
  public loadershow;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    if (sessionStorage.productsuitdata != null)
    this.productsuit =JSON.parse(sessionStorage.productsuitdata);
    this.productsuit.IsActive = this.productsuit.IsActive == 'N' ? false : true;
    //sessionStorage.removeItem('productsuitdata');
    this.GetDomainDetails();
    this.loadershow=false;
  }


GetDomainDetails(){
this.http.get(AppModule.baseurl+'Master/GetDomain?DomainCode&isactive=Y').subscribe((response:any)=>{
  if(response.StatusCode !="0"){
      this.DomainName=response.Data;
  }
  else{
    this.DomainName=[];
      AppModule.Smartalert.Errmsg(response.Message);
  }
})

}
save()
{
  this.loadershow=true;
  this.productsuit.EmpCode = sessionStorage.EmpCode;
  //this.productsuit.PsuiteCode="1";
  

  this.productsuit.IsActive=this.productsuit.IsActive == true ? 'Y' : 'N' ;
  this.productsuit.Flag=this.productsuit.PsuiteCode == null ? (this.productsuit.CreatedBy = sessionStorage.EmpCode,"IN") : (this.productsuit.UpdatedBy = sessionStorage.EmpCode,"UP")
  this.toEncData =JSON.stringify(this.productsuit);
  let encrypted = CryptoJs.AES.encrypt(this.toEncData, AppModule.secureKey, {iv: AppModule.secureKey});
  let ciphertext= encrypted.ciphertext.toString(CryptoJs.enc.Base64);
  this.http.post(AppModule.baseurl+'Master/ManageProdSuite ',{Data:ciphertext}).subscribe((response:any)=>{
    if(response.StatusCode != '0'){
      AppModule.Smartalert.Success(response.Message);
      AppModule.router.navigate(['master/Product_suit_list']);
      
    }
    else{
      AppModule.Smartalert.Errmsg(response.Message);
    }
    this.loadershow=false;
  })
}
  



}
