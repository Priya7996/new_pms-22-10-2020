import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: SettingComponent }];



@NgModule({
  declarations: [SettingComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule, SharedModule, 
  ]
})
export class SettingModule { }
