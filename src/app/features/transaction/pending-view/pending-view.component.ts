import { Component, OnInit } from '@angular/core';
import { AppModule } from '@app/app.module';
import{HttpClient} from '@angular/common/http';
import * as CryptoJs from '../../../../../node_modules/crypto-js'
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'sa-pending-view',
  templateUrl: './pending-view.component.html',
  styleUrls: ['./pending-view.component.css']
})
export class PendingViewComponent implements OnInit {

  pendingview: any={IsOpen:'', EmpCode:'',StatusType:'', StatusCode:'',Impleveld:'',assignemp:false};
  toEncData: string; 
  maxdate=new Date();
  empName:any=[];fileA;fileB;fileC;
  status: any =[];selectedFile;
  btnshow;
  public subdes=false;
  public IsActive=true; 
  public para:any={};

  constructor(private http:HttpClient) { }

  ngOnInit() {

    this.btnshow=false;
    if(sessionStorage.pendingdata!=null){
    this.pendingview = JSON.parse(sessionStorage.pendingdata);
    //this.pendingview.EmpCode=this.pendingview.EmpCode== null? '':this.pendingview.EmpCode;
    //this.openview.StatusType=this.openview.StatusType== null? '':this.openview.StatusType;
    //this.openview.StatusCode=this.openview.StatusCode== null? '':this.openview.StatusCode;
    //this.openview.EmpCode='';
     this.pendingview.StatusType='';
     this.pendingview.StatusCode='';
     this.pendingview.Impleveld='';
    this.pendingview.IsActive = this.pendingview.IsActive=='N' ?false :true;
    this.subdes=true;
    this.IsActive=false;
    sessionStorage.removeItem('pendingdata');
    // this.para=this.pendingview;
    //this.para.StatusType=this.openview.StatusType;
    
    //this.para.EmpCode=this.pendingview.EmpCode;
   
    this.para.TicketNo=this.pendingview.TicketNo;
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
        this.pendingview.StatusCode="";
          this.status=response.Data;
      }
    else{
      this.status=[];
    }  
    }) 
  }

  fileone(){
    if(this.pendingview.attachmentA != null){
    window.open(AppModule.fileurl + this.pendingview.attachmentA);
    this.fileA= this.pendingview.attachmentA;
  }else{
    AppModule.Smartalert.Errmsg("File does not Exist");
  }
  }
  
  filetwo(){
    if(this.pendingview.attachmentB != null){
    window.open(AppModule.fileurl + this.pendingview.attachmentB);  
    this.fileB= this.pendingview.attachmentB;
  }else{
    AppModule.Smartalert.Errmsg("File does not Exist");
  } 
  }
  
  filethree(){
    if(this.pendingview.attachmentB != null){
    window.open(AppModule.fileurl + this.pendingview.attachmentC);
    this.fileC= this.pendingview.attachmentC;
  }else{
    AppModule.Smartalert.Errmsg("File does not Exist");
  }
  }

  save(){
    this.btnshow=true;
    // this.para.EmpCode = sessionStorage.EmpCode;
    // this.para.CurEmpCode = sessionStorage.EmpCode;
    
    // this.para=this.pendingview;
    this.para.UEmpCode = sessionStorage.EmpCode;
    // this.para.CurEmpCode = this.pendingview.EmpCode;
    this.para.StatusType = this.pendingview.StatusType;
    this.para.StatDesc = this.pendingview.StatDesc;
    this.para.Impleveld = this.pendingview.Impleveld;
   // this.para.Impleveld = this.pendingview.Impleveld;
    this.para.LastRemark = this.pendingview.LastRemark;
    // this.para.EmpCode=null;
    this.para.Flag= this.pendingview.assignemp==true?"AS":"UP";
    this.para.CurEmpCode= this.para.Flag=="UP"?sessionStorage.EmpCode:this.pendingview.EmpCode;
 
    this.para.StatusCode=this.pendingview.StatusCode;
    this.para.IsActive=this.pendingview.IsActive == true ? 'Y' : 'N' ;
    this.para.StatusType=this.pendingview.StatusType;
    this.toEncData =JSON.stringify(this.para);
    let encrypted = CryptoJs.AES.encrypt(this.toEncData, AppModule.secureKey, {iv: AppModule.secureKey});
    let ciphertext= encrypted.ciphertext.toString(CryptoJs.enc.Base64);
    this.http.post(AppModule.baseurl+'Transactional/ManageProdIssueTran',{Data:ciphertext}).subscribe((response:any)=>{
      if(response.StatusCode != '0')
      {
        AppModule.Smartalert.Success(response.Message);
        
        sessionStorage.ticketdata = JSON.stringify(this.pendingview)
      
        AppModule.router.navigate(['/transaction/pending']);

      }
      else{
        AppModule.Smartalert.Errmsg(response.Message);
        
      }
      this.btnshow=false;

  })

}

}
