import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as CryptoJs from '../../../../../node_modules/crypto-js';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';

import {NotificationService} from '../../../../app/core/services/notification.service';
import {AppModule} from '../../../app.module';
// import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// import * as moment from 'moment';


@Component({
  selector: 'sa-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public product: any = {IsActive: true,DomainCode:"",PsuiteCode:"",};

  public DomainData;PsuiteData;loadershow;toEncData

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.loadershow=false;
  
    // Edit Grid
    if (sessionStorage.productdata != null){
    this.product =JSON.parse(sessionStorage.productdata);
    this.product.IsActive = this.product.IsActive == 'N' ? false : true;
    this.GetProductSuite(this.product.DomainCode);
    sessionStorage.removeItem('productdata');
    }

     //For Domain dropdown 
     this.http.get(AppModule.baseurl + 'Master/GetDomain?DomainCode&isactive=Y').subscribe((response: any) => {
      if (response.StatusCode != '0') {
          this.DomainData = response.Data;
      } else {
        this.DomainData = [];
      }
    });

  }


  GetProductSuite(DomainCode){
    this.http.get(AppModule.baseurl + 'Master/GetProdSuite?PsuiteCode=&DomainCode='+ this.product.DomainCode+'&isactive=Y').subscribe((response: any) => {
      if (response.StatusCode != '0') {
          this.PsuiteData = response.Data;
      } else {
        this.PsuiteData = [];
      }
    });

  }

  Productsave() {
    this.loadershow=true;
    this.product.IsActive = this.product.IsActive == true ? 'Y' : 'N';
    this.product.Flag = this.product.ProductCode == null ||  this.product.ProductCode == undefined ?(this.product.CreatedBy=sessionStorage.EmpCode,"IN"):(this.product.UpdatedBy=sessionStorage.EmpCode,"UP");
    this.product.PlatformCode=null;
    this.product.EmpCode=sessionStorage.EmpCode;
   
    this.toEncData = JSON.stringify(this.product);
    let encrypted = CryptoJs.AES.encrypt(this.toEncData, AppModule.secureKey, {iv: AppModule.secureKey});
    let ciphertext = encrypted.ciphertext.toString(CryptoJs.enc.Base64);
    this.http.post(AppModule.baseurl + 'Master/ManageProductDtls', {Data: ciphertext}).subscribe((response: any) => {
      if (response.StatusCode != "0"  ) {
        this.loadershow=false;
        AppModule.Smartalert.Success(response.Message);
        AppModule.router.navigate(['master/Product_list']);
      } else {
    
        AppModule.Smartalert.Errmsg(response.Message);
      }
      this.loadershow=false;
    });
  }

}
