import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalComponent } from './approval.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: ApprovalComponent }]

@NgModule({
  declarations: [ApprovalComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule, SharedModule, 
  ]
})
export class ApprovalModule { }
