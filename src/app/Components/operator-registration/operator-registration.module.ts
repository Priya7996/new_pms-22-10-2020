import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OperatorRegistrationComponent,Edit,Add} from './operator-registration.component';
import { SharedModule} from '../shared/shared.module';
import { OperatorService} from  '../../Service/app/operator.service';
const routes: Routes = [{ path: '', component: OperatorRegistrationComponent }];


@NgModule({
  declarations: [OperatorRegistrationComponent,Edit,Add],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule
  ],
  entryComponents:[Edit,Add],
  providers:[OperatorService]
})
export class OperatorRegistrationModule { }
