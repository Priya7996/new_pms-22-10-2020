import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';
import { UserManagementComponent,User,Edit } from './user-management.component';
import {UserService} from '../../Service/app/user.service';
const routes: Routes = [{ path: '', component: UserManagementComponent }];

@NgModule({
  declarations: [UserManagementComponent,User,Edit],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,
  ],
   entryComponents:[User,Edit],
   providers:[UserService]
})
export class UserManagementModule { }
