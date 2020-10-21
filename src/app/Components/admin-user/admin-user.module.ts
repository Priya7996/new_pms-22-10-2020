import { from } from 'rxjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserComponent,User,Edit } from './admin-user.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminUserService } from 'src/app/Service/app/admin-user.service';

const routes: Routes = [{ path: '', component: AdminUserComponent }];



@NgModule({
  declarations: [AdminUserComponent,User,Edit],
  imports: [RouterModule.forChild(routes),
    CommonModule, SharedModule, 
      ],
      entryComponents:[User,Edit],
   providers:[AdminUserService]
})
export class AdminUserModule { }
