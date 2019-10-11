import { Component, OnInit } from '@angular/core';
import { AppModule } from '@app/app.module';
import{HttpClient} from '@angular/common/http';
import * as CryptoJs from '../../../../../node_modules/crypto-js'
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'sa-open-view',
  templateUrl: './open-view.component.html',
  styleUrls: ['./open-view.component.css']
})
export class OpenViewComponent implements OnInit {
  openview: any={IsOpen:'', EmpCode:'',StatusType:'', StatusCode:'',Impleveld:'',assignemp:false};
  toEncData: string; 
  maxdate=new Date();
  empName:any=[];fileA;fileB;fileC;
  status: any =[];selectedFile;
  btnshow;
  public subdes=false;
  public IsActive=true; 
  public para:any={};

  constructor(private http:HttpClient) { }
  ngOnInit()
   {
    this.btnshow=false;
    if(sessionStorage.openeddata!=null){
    this.openview = JSON.parse(sessionStorage.openeddata);
    this.openview.EmpCode=this.openview.EmpCode== null? '':this.openview.EmpCode;
    //this.openview.StatusType=this.openview.StatusType== null? '':this.openview.StatusType;
    //this.openview.StatusCode=this.openview.StatusCode== null? '':this.openview.StatusCode;
    //this.openview.EmpCode='';
     this.openview.StatusType='';
     this.openview.StatusCode='';
     this.openview.Impleveld='';
     this.openview.EmpCode='';
    this.openview.IsActive = this.openview.IsActive=='N' ?false :true;
    this.subdes=true;
    this.IsActive=false;
    // sessionStorage.removeItem('openeddata');
    
    //this.para.StatusType=this.openview.StatusType;
    this.para=this.openview;
    this.para.EmpCode=this.openview.EmpCode;
   
    this.para.TicketNo=this.openview.TicketNo;

    this.GetAssignTo();
    }
  }


GetAssignTo()
{
this.http.get(AppModule.baseurl+'Master/GetEmployeeDtls?EmpCodd=&EmpType=&DesgCode=&isactive=Y').subscribe((response:any)=>{
  if(response.StatusCode !="0"){
      this.empName=response.Data;
  }
else{
  this.empName=[];
}
})
}
GetStatus(StatusType)
{
  this.status=[]; 
  this.http.get(AppModule.baseurl+'Master/GetIssueStatus?StatusCode=&StatType='+StatusType+'&IsOpen=&isactive=Y').subscribe((response:any)=>{
    if(response.StatusCode !="0"){
      this.openview.StatusCode="";
        this.status=response.Data;
    }
  else{
    this.status=[];
  }  
  }) 
}

fileone(){
  if(this.openview.attachmentA != null){
  window.open(AppModule.fileurl + this.openview.attachmentA);
  this.fileA= this.openview.attachmentA;
}else{
  AppModule.Smartalert.Errmsg("File does not Exist");
}
}

filetwo(){
  if(this.openview.attachmentB != null){
  window.open(AppModule.fileurl + this.openview.attachmentB);  
  this.fileB= this.openview.attachmentB;
}else{
  AppModule.Smartalert.Errmsg("File does not Exist");
} 
}

filethree(){
  if(this.openview.attachmentB != null){
  window.open(AppModule.fileurl + this.openview.attachmentC);
  this.fileC= this.openview.attachmentC;
}else{
  AppModule.Smartalert.Errmsg("File does not Exist");
}
}

  save(){
    this.btnshow=true;
    this.para=this.openview;
    this.para.UEmpCode = sessionStorage.EmpCode;
    // this.para.CurEmpCode = this.openview.EmpCode;
    // this.para.EmpCode=this.openview.EmpCode;
    this.para.Flag= this.para.assignemp==true?"AS":"UP";
    this.para.CurEmpCode= this.para.Flag=="UP"?sessionStorage.EmpCode:this.openview.EmpCode;
    this.para.EmpCode= this.para.Flag=="UP"?sessionStorage.EmpCode:this.openview.EmpCode;
    this.para.StatusCode=this.openview.StatusCode;
    this.para.IsActive=this.openview.IsActive == true ? 'Y' : 'N' ;
    this.para.StatusType=this.openview.StatusType;
    this.toEncData =JSON.stringify(this.para);
    let encrypted = CryptoJs.AES.encrypt(this.toEncData, AppModule.secureKey, {iv: AppModule.secureKey});
    let ciphertext= encrypted.ciphertext.toString(CryptoJs.enc.Base64);
    this.http.post(AppModule.baseurl+'Transactional/ManageProdIssueTran',{Data:ciphertext}).subscribe((response:any)=>{
      if(response.StatusCode != '0')
      {
        AppModule.Smartalert.Success(response.Message);
        
        sessionStorage.ticketdata = JSON.stringify(this.openview)
      
        AppModule.router.navigate(['/transaction/open']);

      }
      else{
        AppModule.Smartalert.Errmsg(response.Message);
        
      }
      this.btnshow=false;

  })

}


}