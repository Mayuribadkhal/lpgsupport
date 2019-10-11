import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {CommonService} from './../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatonGuard implements CanActivate {
  constructor(private loginService: CommonService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.isLoggedIn()) { 
        return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
}
}

