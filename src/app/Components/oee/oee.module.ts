import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';
import { OeeComponent,Shift} from './oee.component';
import {OEEService} from '../../Service/app/oee.service';
const routes: Routes = [{ path: '', component: OeeComponent }];

@NgModule({
  declarations: [OeeComponent,Shift],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule
    ],
    entryComponents:[Shift],
    providers:[OEEService]
})
export class OeeModule { }
