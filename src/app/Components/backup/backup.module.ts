import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BackupComponent,Backup } from './backup.component';
import { SharedModule} from '../shared/shared.module';
//import { BackupService} from '../../Service/app/backup.service';
const routes: Routes = [{ path: '', component: BackupComponent }];


@NgModule({
  declarations: [BackupComponent,Backup],
  imports: [RouterModule.forChild(routes),
  CommonModule,SharedModule
    
  ],
  entryComponents:[Backup],
//  providers:[BackupService]

})
export class BackupModule { }
