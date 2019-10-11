import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotRoutingModule } from './forgot-routing.module';
import { ForgotComponent } from './forgot.component';


import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ForgotRoutingModule,
    FormsModule
  ],
  declarations: [ForgotComponent]
})
export class ForgotModule { }
