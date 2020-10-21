import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MachineViewComponent } from './machine-view.component';

const routes: Routes = [{ path: '', component: MachineViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachineViewRoutingModule { }
