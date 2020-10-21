import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';

import { CycleTimeStartToStartComponent } from './cycle-time-start-to-start.component';
import { SharedModule} from '../shared/shared.module';
import { CycleStartService} from '../../Service/app/cycle-start.service';
import { DatePipe } from '@angular/common';

const routes: Routes = [{ path: '', component: CycleTimeStartToStartComponent }];


@NgModule({
  declarations: [CycleTimeStartToStartComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,    HighchartsChartModule

  ],
  providers:[CycleStartService,DatePipe],
})
export class CycleTimeStartToStartModule { }
