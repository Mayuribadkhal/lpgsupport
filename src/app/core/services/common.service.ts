import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  isLoggedIn(){
    if(sessionStorage.EmpCode!=null){
      return true;
    }else{
      return false;
    } 
  }
  
}
