import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppModule } from '@app/app.module';
import * as CryptoJs from '../../../../../node_modules/crypto-js'

@Component({
  selector: 'sa-designation-details',
  templateUrl: './designation-details.component.html',
  styleUrls: ['./designation-details.component.css']
})
export class DesignationDetailsComponent implements OnInit {
  public designation:any={IsActive:true};loadershow;
  public toEnData;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadershow = false;
    if(sessionStorage.designationdata != null) {
      this.designation = JSON.parse(sessionStorage.designationdata);
      this.designation.IsActive = this.designation.IsActive == 'Y'? true : false;
      sessionStorage.removeItem ('designationdata');
  }
  }
  PostDesignation(){
    this.loadershow = true;
    this.designation.Flag =this.designation.DesgCode == null ? (this.designation.CreatedBy =sessionStorage.EmpCode,'IN'): (this.designation.UpdatedBy = sessionStorage.EmpCode,'UP');
    this.designation.IsActive = this.designation.IsActive == true ? 'Y' : 'N';
    this.designation.EmpCode = sessionStorage.EmpCode;
    //encryption
    this.toEnData = JSON.stringify(this.designation);
    let encrypted = CryptoJs.AES.encrypt(this.toEnData,AppModule.secureKey,{iv:AppModule.secureKey});
    let ciphertext = encrypted.ciphertext.toString(CryptoJs.enc.Base64);
    this.http.post(AppModule.baseurl + 'Master/ManageDesignation',{Data:ciphertext}).subscribe((response:any) => {
      if(response.StatusCode != "0") {
        AppModule.Smartalert.Success(response.Message);
        AppModule.router.navigate(['/master/designation_list']);
      }else {
        AppModule.Smartalert.Errmsg(response.Message);
       }
      this.loadershow = false;
    })
  }
}
