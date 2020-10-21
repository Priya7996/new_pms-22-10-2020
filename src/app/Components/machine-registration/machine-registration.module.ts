import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineRegistrationComponent,Add,Edit,Settings } from './machine-registration.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';
import { MachineService} from '../../Service/app/machine.service';
const routes: Routes = [{ path: '', component: MachineRegistrationComponent }];

@NgModule({
  declarations: [MachineRegistrationComponent,Add,Edit,Settings],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule
    
  ],
  entryComponents:[Add,Edit,Settings],
  providers:[MachineService]
})
export class MachineRegistrationModule { }
