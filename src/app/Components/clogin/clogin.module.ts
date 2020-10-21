import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CloginComponent } from './clogin.component';
import { SharedModule} from '../shared/shared.module';

const routes: Routes = [{ path: '', component: CloginComponent }];

@NgModule({
  declarations: [CloginComponent],
  imports: [RouterModule.forChild(routes),
  CommonModule,SharedModule
  ]
})
export class CloginModule { }

