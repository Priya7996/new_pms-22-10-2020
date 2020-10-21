import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CycleTimeStopToStartComponent } from './cycle-time-stop-to-start.component';
import { SharedModule} from '../shared/shared.module';
import { CycleStopService} from '../../Service/app/cycle-stop.service';
import { HighchartsChartModule } from 'highcharts-angular';
import { DatePipe } from '@angular/common';

const routes: Routes = [{ path: '', component: CycleTimeStopToStartComponent }];



@NgModule({
  declarations: [CycleTimeStopToStartComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,
    HighchartsChartModule
  ],
  providers:[CycleStopService,DatePipe]
})
export class CycleTimeStopToStartModule { }
