import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { SharedModule} from '../shared/shared.module';
import { RegisterService} from '../../Service/app/register.service'
const routes: Routes = [{ path: '', component: RegisterComponent }];


@NgModule({
  declarations: [RegisterComponent],
  imports: [RouterModule.forChild(routes),
  CommonModule,SharedModule
    
  ],
  providers:[RegisterService],

})
export class RegisterModule { }
