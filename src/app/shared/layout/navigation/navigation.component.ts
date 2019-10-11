import {Component, OnInit} from '@angular/core';
import {LoginInfoComponent} from "../../user/login-info/login-info.component";


@Component({

  selector: 'sa-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  public hidemenu=false;

  constructor() {

    if(sessionStorage.DesgLevel>=10){
      this.hidemenu=true;
    }



  }

  ngOnInit() {
  }

}
