import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as CryptoJs from '../../../../../node_modules/crypto-js';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {NotificationService} from '../../../../app/core/services/notification.service';
import {AppModule} from '../../../app.module';

@Component({
  selector: 'sa-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public editp: any = {DesgCode:"",EmpType:""};
  public loadershow;toEncData;DesigData

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.loadershow=false;
        //For Designation.
        this.http.get(AppModule.baseurl + 'Master/GetDesignation?DesgCode=&DesgLevel&isactive=Y').subscribe((response: any) => {
          if (response.StatusCode != '0') {
              this.DesigData = response.Data;
          } else {
            this.DesigData = [];
          }
        });

    this.http.get(AppModule.baseurl + 'Master/GetEmployeeDtls?EmpCodd='+ sessionStorage.EmpCode +'&EmpType&DesgCode&isactive=Y ')
    .subscribe((response: any) => {
      if (response.StatusCode != '0') {
        this.editp = response.Data[0];
      } 
    });
  }

  EditProfile(){
    this.loadershow=true;
      this.editp.Flag = "UP";
      // this.editp.IsActive = this.employeed.IsActive == false ? 'N' : 'Y';
       this.toEncData = JSON.stringify(this.editp);
       let encrypted = CryptoJs.AES.encrypt(this.toEncData, AppModule.secureKey, {iv: AppModule.secureKey});
       let ciphertext = encrypted.ciphertext.toString(CryptoJs.enc.Base64);
      this.http.post(AppModule.baseurl + 'Master/ManageEmployee', {Data:ciphertext}).subscribe((response: any) => {
        if (response.StatusCode != "0") {
          this.loadershow=false;
          AppModule.Smartalert.Success(response.Message);
          AppModule.router.navigate(['/transaction/open']);
          // this.editp=null;
        } else {
          AppModule.Smartalert.Errmsg(response.Message);
          this.loadershow=false;
        }
      });
  
    }


}
