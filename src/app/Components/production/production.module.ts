import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionComponent } from './production.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '@angular/common';


const routes: Routes = [{ path: '', component: ProductionComponent }];

@NgModule({
  declarations: [ProductionComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule
  ],
  providers: [
    DatePipe
  ]
})
export class ProductionModule { }
