import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationAssignRoutingModule } from './operation-assign-routing.module';
import { OperationAssignComponent,Edit,Add } from './operation-assign.component';
import { SharedModule} from '../shared/shared.module';
import { OperatorService} from  '../../Service/app/operator.service'
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [OperationAssignComponent,Edit,Add],
  imports: [
    CommonModule,SharedModule,
    OperationAssignRoutingModule
  ],
  entryComponents:[Edit,Add], 
  providers:[OperatorService,DatePipe]
})
export class OperationAssignModule { }
