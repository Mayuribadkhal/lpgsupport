import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AppModule } from '@app/app.module';
import * as CryptoJs from '../../../../../node_modules/crypto-js';

@Component({
  selector: 'sa-issue-status-details',
  templateUrl: './issue-status-details.component.html',
  styleUrls: ['./issue-status-details.component.css']
})
export class IssueStatusDetailsComponent implements OnInit {
  public issuestatus: any = {IsActive:true,IsOpen:'',StatType:''};loadershow;
  public toEnData;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadershow = false;
    if(sessionStorage.issuedata != null) {
      this.issuestatus = JSON.parse(sessionStorage.issuedata);
      this.issuestatus.IsActive = this.issuestatus.IsActive == 'Y'? true : false;
      this.issuestatus.IsOpen = this.issuestatus.IsOpen == 'Y'? true : false;
      sessionStorage.removeItem ('issuedata');
  }
  }

  PostIssue(){
    this.loadershow = true;
    this.issuestatus.Flag =this.issuestatus.StatusCode == null ? 'IN': 'UP';
    this.issuestatus.EmpCode = sessionStorage.EmpCode;
    //this.issuestatus.Flag =this.issuestatus.StatusCode == null ? (this.issuestatus.CreatedBy =sessionStorage.EmpCode,'IN'): (this.issuestatus.UpdatedBy = sessionStorage.EmpCode,'UP');
    this.issuestatus.IsActive = this.issuestatus.IsActive == true ?'Y' : 'N';
    this.issuestatus.IsOpen = this.issuestatus.IsOpen == true ?'Y' : 'N';
    //this.issuestatus.StatType =this.issuestatus.StatType;
    //encryption
    this.toEnData = JSON.stringify(this.issuestatus); 
    let encrypted = CryptoJs.AES.encrypt(this.toEnData,AppModule.secureKey,{iv:AppModule.secureKey});
    let ciphertext = encrypted.ciphertext.toString(CryptoJs.enc.Base64);
    this.http.post(AppModule.baseurl + 'Master/ManageIssueStatus',{Data:ciphertext}).subscribe((response:any) => {
      if(response.StatusCode != "0") {
        AppModule.Smartalert.Success(response.Message);
        AppModule.router.navigate(['/master/issue_status_list']);
      }else {
        AppModule.Smartalert.Errmsg(response.Message);
       }
      this.loadershow = false;
    })
  }
}
