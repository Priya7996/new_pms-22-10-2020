import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MachineDetailsComponent } from './machine-details.component';

const routes: Routes = [{ path: '', component: MachineDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachineDetailsRoutingModule { }
