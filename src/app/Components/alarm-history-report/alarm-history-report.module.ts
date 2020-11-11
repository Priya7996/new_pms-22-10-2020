import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AlarmHistoryReportComponent } from './alarm-history-report.component';
import { SharedModule} from '../shared/shared.module';
import { AlarmHistoryService} from '../../Service/app/alarm-history.service';
import { ExcelService} from '../../Service/app/excel.service';
import { DatePipe } from '@angular/common';

const routes: Routes = [{ path: '', component: AlarmHistoryReportComponent }];

@NgModule({
  declarations: [AlarmHistoryReportComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule],
    providers:[AlarmHistoryService,ExcelService,DatePipe],
})
export class AlarmHistoryReportModule { }