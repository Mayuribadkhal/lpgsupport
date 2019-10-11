import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { SettingRoutingModule } from './setting-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import * as CryptoJs from '../../../../node_modules/crypto-js';

@NgModule({
  declarations: [EditProfileComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule
  ]
})
export class SettingModule { }
