import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  {
    path: 'edit_profile',
    component: EditProfileComponent,
    data: {
        pageTitle: 'edit_profile'
    }
  },
  {
    path: 'change_password',
    component: ChangePasswordComponent,
    data: {
        pageTitle: 'change_password'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
