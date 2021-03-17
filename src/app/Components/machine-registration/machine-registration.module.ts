import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineRegistrationComponent,Add,Edit,Settings,Distance } from './machine-registration.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';
import { MachineService} from '../../Service/app/machine.service';
const routes: Routes = [{ path: '', component: MachineRegistrationComponent }];

@NgModule({
  declarations: [MachineRegistrationComponent,Add,Edit,Settings,Distance],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule
    
  ],
  entryComponents:[Add,Edit,Settings,Distance],
  providers:[MachineService]
})
export class MachineRegistrationModule { }
