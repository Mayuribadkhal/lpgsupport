import { Component, OnInit } from '@angular/core';
import { AppModule } from '@app/app.module';
import { HttpClient } from '@angular/common/http';
import * as CryptoJs from '../../../../../node_modules/crypto-js';
@Component({
  selector: 'sa-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit 
{
  public toEnData;
  // public prodIssueType:any={IsActive:"Y", DomainCode:"", PsuiteCode:"", ProductCode:""};
  // domainname;
  // productsuitename;
  // productname;
  loadershow: boolean;
  changePassword: any={};

  inputTypeOne;
  classNameOne:string;
  inputTypeTwo;
  classNameTwo:string;
  inputTypeThree;
  classNameThree:string;

  // show: boolean;//toggle variable declared


  constructor(private http:HttpClient) { 
    // this.show = false; // initialize variable value
    // var datePipe = new DatePipe("en-US");
  }
   
  ngOnInit() {
 
     this.inputTypeOne ='password';
     this.classNameOne = 'glyphicon-eye-close'

     this.inputTypeTwo ='password';
     this.classNameTwo = 'glyphicon-eye-close'

     this.inputTypeThree ='password';
     this.classNameThree = 'glyphicon-eye-close'


    // if(sessionStorage.productIssueGroupdata!=null){
    //   this.changePassword = JSON.parse(sessionStorage.productIssueGroupdata);
    //     this.changePassword.IsActive = this.changePassword.IsActive == 'Y'? true :false;
        

        sessionStorage.removeItem ('productIssueGroupdata');
    //   }
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

  HideShowPasswordThree(){
    if(this.inputTypeThree == 'password'){
      this.classNameThree = 'glyphicon-eye-open';
    this.inputTypeThree = 'text';
   
    }else{
      this.inputTypeThree = 'password';
      this.classNameThree = 'glyphicon-eye-close';
    }
  };

// click event function toggle
// password() {
//     this.show = !this.show;
// }




OnSubmit(){
  this.loadershow=true;
  this.changePassword.Flag="CP";
  this.changePassword.EmpCode=sessionStorage.EmpCode;
  this.changePassword.OldEmpPwd=sessionStorage.OldEmpPwd;
  this.changePassword.EmpEmail=sessionStorage.EmpEmail;


    if (this.changePassword.currPass==this.changePassword.OldEmpPwd)
    {
        if (this.changePassword.newPass==this.changePassword.retypePass)
        {
            if (this.changePassword.newPass!=this.changePassword.currPass)
            {
                  this.changePassword.EmpPwd=this.changePassword.newPass;
                  //encryption
                  this.toEnData = JSON.stringify(this.changePassword);
                  let encrypted = CryptoJs.AES.encrypt(this.toEnData,AppModule.secureKey,{iv:AppModule.secureKey});
                  let ciphertext = encrypted.ciphertext.toString(CryptoJs.enc.Base64);
                  //post
                  this.http.post(AppModule.baseurl + 'Authentication/PostChangePwd', {Data:ciphertext} ).subscribe((response:any) => {
                    if(response.StatusCode != "0")
                        {              
                            AppModule.Smartalert.Success("Password changed successfully");
                            AppModule.router.navigate(['/auth/login']);
                            
                        }
                    else{
                        AppModule.Smartalert.Errmsg("Password not changed");
                      }
                        this.loadershow=false;
                  })
            }
            else
            {
              AppModule.Smartalert.Errmsg("New Password and Current Password should be different"); 
              this.loadershow=false;
            }
        }
        else
        {
          AppModule.Smartalert.Errmsg("New Password and Retype Password should be same"); 
          this.loadershow=false;
        }
    }
    else{
      AppModule.Smartalert.Errmsg("Invalid Current Password"); 
      this.loadershow=false;
    }
          
  }
}

