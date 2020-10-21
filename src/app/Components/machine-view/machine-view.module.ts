import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { MachineViewComponent } from './machine-view.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HighchartsChartModule } from 'highcharts-angular';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: MachineViewComponent }];

@NgModule({
  declarations: [MachineViewComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,
    SharedModule,HighchartsChartModule,
    NgCircleProgressModule.forRoot({
      "radius": 50,
      "space": -12,
      "outerStrokeWidth": 12,
      "innerStrokeWidth": 12,
      "showSubtitle": true,
      // "subtitle": 'Utlization'
    })
  ]
})
export class MachineViewModule { }
