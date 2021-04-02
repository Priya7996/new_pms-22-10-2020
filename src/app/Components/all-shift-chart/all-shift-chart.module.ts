import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AllShiftChartComponent } from './all-shift-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DatePipe } from '@angular/common';
import { AllShiftChartService} from '../../Service/app/all-shift-chart.service';

import { SharedModule} from '../shared/shared.module';
const routes: Routes = [{ path: '', component: AllShiftChartComponent }];

@NgModule({
  declarations: [AllShiftChartComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,HighchartsChartModule 
  ],
  providers:[AllShiftChartService,DatePipe]

})
export class AllShiftChartModule { }
