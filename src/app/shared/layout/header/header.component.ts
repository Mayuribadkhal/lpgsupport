import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public user_name;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.user_name=sessionStorage.EmpName;
  }


  searchMobileActive = false;

  toggleSearchMobile(){
    this.searchMobileActive = !this.searchMobileActive;

    $('body').toggleClass('search-mobile', this.searchMobileActive);
  }

  onSubmit() {
    this.router.navigate(['/miscellaneous/search']);

  }
  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);



  }
  editProfile(){
    this.router.navigate(['/setting/edit_profile']);
  }
  changepassword(){
    this.router.navigate(['/setting/change_password']);
  }
}
