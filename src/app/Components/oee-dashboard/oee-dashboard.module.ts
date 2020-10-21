import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { OeeDashboardComponent } from './oee-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
const routes: Routes = [{ path: '', component: OeeDashboardComponent }];

@NgModule({
  declarations: [OeeDashboardComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,HighchartsChartModule,
    NgCircleProgressModule.forRoot({
      "backgroundColor": "#212226",
      backgroundOpacity: 1,
      "backgroundStroke": "#212226",
      backgroundStrokeWidth: 18,
      backgroundPadding: 0,
      radius: 83,
      "responsive": true,
      space: -17,
      "titleFontSize": "40",
      "titleFontWeight": "800",
      "titleColor": "#ffffff",
      toFixed: 0,
      maxPercent: 100,
      outerStrokeWidth: 17,
      innerStrokeWidth: 17,
      "showSubtitle": true,
      "showUnits": false,
      "subtitle": [
        "OEE"
      ],
    })
  ]
})
export class OeeDashboardModule { }
