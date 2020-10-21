import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetailsComponent } from './device-details.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: DeviceDetailsComponent }];



@NgModule({
  declarations: [DeviceDetailsComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,
      ]
})
export class DeviceDetailsModule { }
