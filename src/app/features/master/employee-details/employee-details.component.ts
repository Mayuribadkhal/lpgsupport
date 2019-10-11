import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppModule} from '../../../app.module';
import *as CryptoJS from '../../../../../node_modules/crypto-js';

@Component({
  selector: 'sa-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  public eMessage;msg2;
  public toEncData;DesigData;
  public employeed: any = {IsActive: 'Y',DesgCode:"",Gender:"",EmpType:""};
  public submit:boolean= true;
  public btnshow:boolean =false;
  inputTypeOne;
  classNameOne:string;
  inputTypeTwo;
  classNameTwo:string;
  inputTypeThree;
  classNameThree:string;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.inputTypeOne ='password';
    this.classNameOne = 'glyphicon-eye-close'

    this.inputTypeTwo ='password';
    this.classNameTwo = 'glyphicon-eye-close'

    this.inputTypeThree ='password';
    this.classNameThree = 'glyphicon-eye-close'

    //For Designation.
    this.http.get(AppModule.baseurl + 'Master/GetDesignation?DesgCode=&DesgLevel&isactive=Y').subscribe((response: any) => {
      if (response.StatusCode != '0') {
          this.DesigData = response.Data;
      } else {
        this.DesigData = [];
      }
    });


    if (sessionStorage.EmployeeData!=null) {
      this.employeed = JSON.parse(sessionStorage.EmployeeData);
      this.employeed.cnfPwd =this.employeed.EmpPwd;
      this.employeed.IsActive = this.employeed.IsActive == 'Y' ? true : false;
      sessionStorage.removeItem('EmployeeData');
    }
  }

  HideShowPasswordOne(){
    if(this.inputTypeOne == 'password'){
      this.classNameOne = 'glyphicon-eye-open';
    this.inputTypeOne = 'text';
   
    }else{
      this.inputTypeOne = 'password';
      this.classNameOne = 'glyphicon-eye-close';
    }
  };

  HideShowPasswordTwo(){
    if(this.inputTypeTwo == 'password'){
      this.classNameTwo = 'glyphicon-eye-open';
    this.inputTypeTwo = 'text';
   
    }else{
      this.inputTypeTwo = 'password';
      this.classNameTwo = 'glyphicon-eye-close';
    }
  };


// Check Password
  ConfirmPassword = function (employeed) {
    this.employeed = employeed;
    if (this.employeed.EmpPwd != this.employeed.cnfPwd) {
        this.eMessage = "Password does not match";
      this.submit=true;
    }
    else {
      this.eMessage="";
      this.submit=false;
        }
    }



  postemp(){
  this.btnshow=true;
    this.employeed.Flag = this.employeed.EmpCode == null ? ( this.employeed.UEmpCode = sessionStorage.UEmpCode, "IN") : ( this.employeed.UEmpCode = sessionStorage.UEmpCode, "UP");
    this.employeed.IsActive = this.employeed.IsActive == false ? 'N' : 'Y';
     this.toEncData = JSON.stringify(this.employeed);
     let encrypted = CryptoJS.AES.encrypt(this.toEncData, AppModule.secureKey, {iv: AppModule.secureKey});
     let ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    this.http.post(AppModule.baseurl + 'Master/ManageEmployee', {Data:ciphertext}).subscribe((response: any) => {
      if (response.StatusCode != "0") {
        this.btnshow=false;
        AppModule.Smartalert.Success(response.Message);
        AppModule.router.navigate(['/master/employee_list']);
      } else {
        AppModule.Smartalert.Errmsg(response.Message);
        this.btnshow=false;
      }
    });

  }

}
