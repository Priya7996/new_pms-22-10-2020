import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachinenewComponent } from './machinenew.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';
import { HighchartsChartModule } from 'highcharts-angular';

import { MachineNewService} from '../../Service/app/machine-new.service';
const routes: Routes = [{ path: '', component: MachinenewComponent }];

@NgModule({
  declarations: [MachinenewComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,HighchartsChartModule
  ],
  providers:[MachineNewService]
})
export class MachinenewModule { }
