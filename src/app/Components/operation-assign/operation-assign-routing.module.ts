import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperationAssignComponent } from './operation-assign.component';

const routes: Routes = [{ path: '', component: OperationAssignComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationAssignRoutingModule { }
