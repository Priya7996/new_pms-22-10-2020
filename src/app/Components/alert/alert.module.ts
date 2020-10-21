import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AlertComponent } from './alert.component';
import { SharedModule} from '../shared/shared.module';
import { AlertService} from '../../Service/app/alert.service';

const routes: Routes = [{ path: '', component: AlertComponent }];

@NgModule({
  declarations: [AlertComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule],
    providers:[AlertService],
})
export class AlertModule { }
