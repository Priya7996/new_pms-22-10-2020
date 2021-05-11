import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRoutingModule } from './password-routing.module';
import { PasswordComponent } from './password.component';
import { SharedModule} from '../shared/shared.module';
import { LoginService} from '../../Service/app/login.service'

@NgModule({
  declarations: [PasswordComponent],
  imports: [
    CommonModule,SharedModule,
    PasswordRoutingModule
  ],
  providers:[LoginService],

})
export class PasswordModule { }
