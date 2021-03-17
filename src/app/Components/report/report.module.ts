import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';
import { ReportComponent } from './report.component';
import { DatePipe } from '@angular/common';

const routes: Routes = [{ path: '', component: ReportComponent }];

@NgModule({
  declarations: [ReportComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule
    
  ],
  providers: [
    DatePipe,
  ]
})
export class ReportModule { }
