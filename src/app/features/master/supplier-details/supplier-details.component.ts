import { Component, OnInit } from '@angular/core';
import { AppModule } from '@app/app.module';
import { HttpClient } from '@angular/common/http';
import * as CryptoJs from '../../../../../node_modules/crypto-js';
import { element } from '@angular/core/src/render3';


@Component({
  selector: 'sa-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {
  public toEnData;
  public supplier:any={IsActive:true};
  public loadershow:boolean=false;

  constructor(private http:HttpClient) 
  { 

  }
    
  ngOnInit()
  {    
     if(sessionStorage.supplierDetailsdata!=null)
        {
          this.supplier = JSON.parse(sessionStorage.supplierDetailsdata);
          this.supplier.IsActive = this.supplier.IsActive == 'Y'? true :false;     
          sessionStorage.removeItem ('supplierDetailsdata');
        }
        this.loadershow=false;
  }


  OnSubmit()
  {
    this.loadershow=true;
    this.supplier.Flag=this.supplier.SuplierId == null? (this.supplier.CreatedBy=sessionStorage.EmpCode,'IN'):(this.supplier.UpdatedBy=sessionStorage.EmpCode,'UP');
    this.supplier.IsActive = this.supplier.IsActive == true? 'Y':'N';
    this.supplier.SupMobileAlt = this.supplier.SupMobileAlt== null? null:this.supplier.SupMobileAlt;
    this.supplier.BccEmail = this.supplier.BccEmail== null? null:this.supplier.BccEmail;
    this.supplier.CCEmail = this.supplier.CCEmail== null? null:this.supplier.CCEmail;
    this.supplier.EmpCode=sessionStorage.EmpCode;
    
    //encryption
    this.toEnData = JSON.stringify(this.supplier);
    let encrypted = CryptoJs.AES.encrypt(this.toEnData,AppModule.secureKey,{iv:AppModule.secureKey});
    let ciphertext = encrypted.ciphertext.toString(CryptoJs.enc.Base64);
    
    //post
    this.http.post(AppModule.baseurl + 'Master/ManageSuplier', {Data:ciphertext} ).subscribe((response:any) => 
    {
      if(response.StatusCode != "0")
            { 
                AppModule.Smartalert.Success(response.Message);
                AppModule.router.navigate(['/master/Supplier_list']);
            }
      else
            {
                AppModule.Smartalert.Errmsg(response.Message);
            }
      this.loadershow=false; 
    })
    
  }

  
}