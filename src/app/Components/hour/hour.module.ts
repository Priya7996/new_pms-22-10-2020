import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HourRoutingModule } from './hour-routing.module';
import { HourComponent } from './hour.component';
import { SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [HourComponent],
  imports: [
    CommonModule,SharedModule,
    HourRoutingModule
  ]
})
export class HourModule { }
