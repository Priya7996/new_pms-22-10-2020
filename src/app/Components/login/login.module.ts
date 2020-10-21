import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent,Dialog} from './login.component';
import { SharedModule} from '../shared/shared.module';
import { LoginService} from '../../Service/app/login.service'
const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent,Dialog],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule

  ],
  providers:[LoginService],
  entryComponents:[Dialog]

})
export class LoginModule { }
