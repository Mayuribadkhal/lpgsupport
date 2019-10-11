import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
// import * as CryptoJS from '../../../CryptoJs';
import {NotificationService} from '../../../../app/core/services/notification.service';
import {AppModule} from '../../../app.module';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public login:any={};
  public loadershow;

  constructor(private router: Router,public http: HttpClient,private location: PlatformLocation) { }

  ngOnInit() {
    this.loadershow=false;
    
    // For back disable
    history.pushState(null, null, location.href);
    this.location.onPopState(() => {   console.log('pressed back in add!!!!!');
    history.forward();
    });
  }

  // login(event){
  //   event.preventDefault();
  //   this.router.navigate(['/transaction/pending'])
  // }



  LoginAccount(){
    this.loadershow=true;
    if (this.login != null) {
    if (this.login.EmpEmail != null && this.login.EmpPwd != null && this.login.EmpPwd != '') {

    this.http.get(AppModule.baseurl + 'Authentication/GetLoginDtls?Panel&EmpEmail='+ this.login.EmpEmail +'&EmpPwd='+ this.login.EmpPwd +'&isactive=Y')
    .subscribe((response: any) => {
    if (response.StatusCode != '0') {
     this.loadershow=false;
     this.login = response.Data[0];
     sessionStorage.EmpCode = this.login.EmpCode;
     sessionStorage.UEmpCode = this.login.EmpCode;
     sessionStorage.EmpType = this.login.EmpType;
     sessionStorage.EmpName = this.login.EmpName;
     sessionStorage.CompanyName = this.login.CompanyName;
     sessionStorage.Gender = this.login.Gender;
     sessionStorage.EmpMobile = this.login.EmpMobile;
     sessionStorage.EmpEmail = this.login.EmpEmail;
     sessionStorage.DesgCode = this.login.DesgCode;
     sessionStorage.EmpPwd = this.login.EmpPwd;
     sessionStorage.OldEmpPwd = this.login.EmpPwd;
     sessionStorage.DesgLevel=this.login.DesgLevel
     AppModule.Smartalert.Success("Logged in successfully");
     this.router.navigate(['/transaction/open'])
   } else {
     this.loadershow=false;
     AppModule.Smartalert.Errmsg(response.Message);
   }
 });
}}
}


}
