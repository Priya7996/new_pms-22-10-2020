import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartDoucumentationRoutingModule } from './part-doucumentation-routing.module';
import { PartDoucumentationComponent } from './part-doucumentation.component';


@NgModule({
  declarations: [PartDoucumentationComponent],
  imports: [
    CommonModule,
    PartDoucumentationRoutingModule
  ]
})
export class PartDoucumentationModule { }
