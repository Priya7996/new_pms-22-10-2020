import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartDoucumentationComponent } from './part-doucumentation.component';

const routes: Routes = [{ path: '', component: PartDoucumentationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartDoucumentationRoutingModule { }
