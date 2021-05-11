import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HmiComponent } from './hmi.component';
import { SharedModule} from '../shared/shared.module';
import { HmiService} from '../../Service/app/hmi.service';
import {DatePipe} from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

const routes: Routes = [{ path: '', component: HmiComponent }];


@NgModule({
  declarations: [HmiComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,HighchartsChartModule
  ],
  providers:[HmiService,DatePipe]
})
export class HmiModule { }
