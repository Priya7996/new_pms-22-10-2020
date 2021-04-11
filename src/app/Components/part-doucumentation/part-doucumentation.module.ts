import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';

import { PartDoucumentationComponent,Edit,Add} from './part-doucumentation.component';
import { PartService} from  '../../Service/app/part.service';

const routes: Routes = [{ path: '', component: PartDoucumentationComponent }];


@NgModule({
  declarations: [PartDoucumentationComponent,Edit,Add],
  imports: [RouterModule.forChild(routes),
    CommonModule, SharedModule
  ],
  entryComponents:[Edit,Add],

  providers:[PartService]

})
export class PartDoucumentationModule { }
