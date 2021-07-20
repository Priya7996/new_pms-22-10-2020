import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HourComponent } from './hour.component';

const routes: Routes = [{ path: '', component: HourComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HourRoutingModule { }
