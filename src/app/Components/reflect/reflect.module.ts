import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReflectComponent } from './reflect.component';
const routes: Routes = [{ path: '', component: ReflectComponent }];


@NgModule({
  declarations: [ReflectComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule
    
  ]
})
export class ReflectModule { }
