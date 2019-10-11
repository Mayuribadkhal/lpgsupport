import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import * as CryptoJS from '../../../CryptoJs';
import {NotificationService} from '../../../../app/core/services/notification.service';
import {AppModule} from '../../../app.module';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styles: []
})
export class ForgotComponent implements OnInit {
  public forgot:any={};
  public loadershow=false;

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit() {
  }

  ForgotPass() {
    this.loadershow=true;
    this.http.get(AppModule.baseurl + 'Authentication/GetForgotPwdDtls?Flag=EM&EmpEmail='+ this.forgot.EmpEmail +'&EmpPwd=&EmpCode=&EmpMobile=&OldEmpPwd=')
    .subscribe((response: any) => {
    
      if (response.StatusCode != '0' && response.StatusCode != "") {
       this.loadershow=false;
        AppModule.Smartalert.Success("Password has been sent to your registered Email address");
        AppModule.router.navigate(['/auth/login']);
       
      } else {
        this.loadershow=false;
        // this.forgot=[];
        AppModule.Smartalert.Errmsg(response.Message);
      }
    });
  }
}
