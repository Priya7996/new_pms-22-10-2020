import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MachineDetailsComponent } from './machine-details.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: MachineDetailsComponent }];

@NgModule({
  declarations: [MachineDetailsComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,
    NgCircleProgressModule.forRoot({
      "radius": 50,
      "space": -12,
      "outerStrokeWidth": 12,
      "innerStrokeWidth": 12,
      "showSubtitle": true,
      "subtitle": 'Utilization'
    })
  ]
})
export class MachineDetailsModule { }
