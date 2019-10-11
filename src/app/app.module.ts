import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { Router } from '@angular/router';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
// import * as CryptoJs from '../../node_modules/crypto-js';
import * as CryptoJs from '../../node_modules/crypto-js';
import {MydirectiveModule} from '../app/directive/mydirective.module';
import { UpgradeModule } from '@angular/upgrade/static';
import { downgradeComponent } from '@angular/upgrade/static';
import { NotificationService } from '../app/core/services/notification.service';
import { AuthenticatonGuard } from '../app/core/guards/authenticaton.guard';
import {environment} from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    MydirectiveModule,
    UpgradeModule
  ],
  providers: [AuthenticatonGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
   static Smartalert;
  static router: Router;
  static baseurl;
  static secureKey;
  static headers: HttpHeaders;
  static fileurl;
  constructor(public router: Router,public Smartalert: NotificationService) {
    AppModule.headers = new HttpHeaders({'content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('PGSS:PGSS@190726?')});

    //main reference given in envirement
    AppModule.baseurl = environment.baseurl;
    AppModule.fileurl = environment.fileurl;
    AppModule.secureKey = CryptoJs.enc.Utf8.parse(environment.secureKey);
    AppModule.router = router;
    AppModule.Smartalert = Smartalert;
  }
}
