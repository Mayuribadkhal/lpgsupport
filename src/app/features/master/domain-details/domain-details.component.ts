import { Component, OnInit } from '@angular/core';
import { AppModule } from '@app/app.module';
import{HttpClient} from '@angular/common/http';
import * as CryptoJs from '../../../../../node_modules/crypto-js'

@Component({
  selector: 'sa-domain-details',
  templateUrl: './domain-details.component.html',
  styleUrls: ['./domain-details.component.css']
})
export class DomainDetailsComponent implements OnInit {
  public domain: any = {IsActive: true};
  public toEncData: any = {}
  public loadershow;


  constructor(private http:HttpClient) { }

  ngOnInit() {
    if (sessionStorage.domaindata != null)
    this.domain =JSON.parse(sessionStorage.domaindata);
    this.domain.IsActive = this.domain.IsActive == 'N' ? false : true;
    //sessionStorage.removeItem('domaindata');
    this.loadershow=false;
  }
  
  save()
 
  {
    this.loadershow=true;
    this.domain.EmpCode = sessionStorage.EmpCode;
    this.domain.IsActive=this.domain.IsActive == true ? 'Y' : 'N' ;
    this.domain.Flag=this.domain.DomainCode == null ? (this.domain.CreatedBy = sessionStorage.EmpCode,"IN") : (this.domain.UpdatedBy = sessionStorage.EmpCode,"UP") ;
    this.toEncData =JSON.stringify(this.domain);
    let encrypted = CryptoJs.AES.encrypt(this.toEncData, AppModule.secureKey, {iv: AppModule.secureKey});
    let ciphertext= encrypted.ciphertext.toString(CryptoJs.enc.Base64);
    this.http.post(AppModule.baseurl+'Master/ManageDomainDtls',{Data:ciphertext}).subscribe((response:any)=>{
      if(response.StatusCode != '0'){
        AppModule.Smartalert.Success(response.Message);
        AppModule.router.navigate(['/master/domain_list']);
      }
      else{
        AppModule.Smartalert.Errmsg(response.Message);
        
      }
      this.loadershow=false;
    })
  }

}

