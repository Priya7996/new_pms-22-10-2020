import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShiftComponent,Edit,Add } from './shift.component';
import { SharedModule} from '../shared/shared.module';
import { ShiftService} from '../../Service/app/shift.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

const routes: Routes = [{ path: '',component: ShiftComponent }];

@NgModule({
  declarations: [ShiftComponent,Edit,Add],
  imports: [RouterModule.forChild(routes), 
  CommonModule,SharedModule,NgxMaterialTimepickerModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

  entryComponents:[Edit,Add],
  providers:[ShiftService]
})
export class ShiftModule { }
