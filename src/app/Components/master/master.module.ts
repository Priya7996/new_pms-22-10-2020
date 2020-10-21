import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent,Dialog,Delete } from './master.component';
import { SharedModule} from '../shared/shared.module';
import { ProgramListService} from '../../Service/app/programlist.service';
const routes: Routes = [{ path: '', component: MasterComponent }];


@NgModule({
  declarations: [MasterComponent,Dialog,Delete],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule
  ],
  entryComponents:[Dialog,Delete],
  providers:[ProgramListService]

})
export class MasterModule { }
