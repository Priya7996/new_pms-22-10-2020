import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CycleTimeChartComponent } from './cycle-time-chart.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { CycleTimeService} from '../../Service/app/cycle-time.service';
import { DatePipe } from '@angular/common';

const routes: Routes = [{ path: '', component: CycleTimeChartComponent }];


@NgModule({
  declarations: [CycleTimeChartComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,
    HighchartsChartModule
  ],
  providers:[CycleTimeService,DatePipe]
})
export class CycleTimeChartModule { }
