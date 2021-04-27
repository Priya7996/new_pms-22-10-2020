import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperationManComponent } from './operation-man.component';

const routes: Routes = [{ path: '', component: OperationManComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationManRoutingModule { }
