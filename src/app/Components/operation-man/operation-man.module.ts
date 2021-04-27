import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { OperatorService} from  '../../Service/app/operator.service';
import { OperationManRoutingModule } from './operation-man-routing.module';
import { OperationManComponent,Edit,Add} from './operation-man.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


@NgModule({
  declarations: [OperationManComponent,Edit,Add],
  imports: [
    CommonModule,SharedModule,
    OperationManRoutingModule,NgxMaterialTimepickerModule
  ],
  entryComponents:[Edit,Add],
  providers:[OperatorService]
})
export class OperationManModule { }
