import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PartDoucumentationComponent } from './part-doucumentation.component';

const routes: Routes = [{ path: '', component: PartDoucumentationComponent }];


@NgModule({
  declarations: [PartDoucumentationComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule, 
  ]
})
export class PartDoucumentationModule { }
