import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { MachineLmwComponent } from './machine-lmw.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: MachineLmwComponent }];


@NgModule({
  declarations: [MachineLmwComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,
    NgCircleProgressModule.forRoot({
      "backgroundColor": "#212226",
      backgroundOpacity: 1,
      "backgroundStroke": "#212226",
      backgroundStrokeWidth: 18,
      backgroundPadding: 0,
      radius: 36,
      space: -17,
      "titleFontSize": "40",
  "titleFontWeight": "800",
  "titleColor": "#ffffff",
      toFixed: 0,
      maxPercent: 100,
      outerStrokeWidth: 17,
      innerStrokeWidth: 17,
      "showSubtitle": false,
      "showUnits": false
    })
    
  ]
})
export class MachineLmwModule { }
