import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShiftComponent,Edit,Sedit,Add } from './shift.component';
import { SharedModule} from '../shared/shared.module';
import { ShiftService} from '../../Service/app/shift.service';
// import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

const routes: Routes = [{ path: '',component: ShiftComponent }];

@NgModule({
  declarations: [ShiftComponent,Edit,Sedit,Add],
  imports: [RouterModule.forChild(routes),
  CommonModule,SharedModule,
  ],
  entryComponents:[Edit,Sedit,Add],
  providers:[ShiftService]
})
export class ShiftModule { }
