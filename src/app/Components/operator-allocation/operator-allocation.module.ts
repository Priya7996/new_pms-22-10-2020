import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperatorAllocationComponent,New } from './operator-allocation.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';
import { OperatorAllocationService} from '../../Service/app/operator-allocation.service';
const routes: Routes = [{ path: '', component: OperatorAllocationComponent }];

@NgModule({
  declarations: [OperatorAllocationComponent,New],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule
  ],
  entryComponents:[New],
  providers:[OperatorAllocationService]
  
})
export class OperatorAllocationModule { }
