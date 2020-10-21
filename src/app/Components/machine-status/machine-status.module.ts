import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MachineStatusComponent } from './machine-status.component';
import { SharedModule} from '../shared/shared.module';
const routes: Routes = [{ path: '', component: MachineStatusComponent }];


@NgModule({
  declarations: [MachineStatusComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule
      ]
})
export class MachineStatusModule { }
