import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDetailsComponent } from './customer-details.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: CustomerDetailsComponent }];



@NgModule({
  declarations: [CustomerDetailsComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule, SharedModule
  ]
})
export class CustomerDetailsModule { }
