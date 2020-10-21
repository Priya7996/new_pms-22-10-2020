import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MachineDetailsRoutingModule } from './machine-details-routing.module';
import { MachineDetailsComponent } from './machine-details.component';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  declarations: [MachineDetailsComponent],
  imports: [
    CommonModule,SharedModule,
    MachineDetailsRoutingModule,
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
