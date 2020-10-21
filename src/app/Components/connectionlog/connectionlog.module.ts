import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionlogComponent } from './connectionlog.component';
import { SharedModule} from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { LogService} from '../../Service/app/log.service';
const routes: Routes = [{ path: '', component:  ConnectionlogComponent}];


@NgModule({
  declarations: [ConnectionlogComponent],
  imports: [SharedModule,RouterModule.forChild(routes),
    CommonModule,
    
  ],
  providers:[LogService]
})
export class ConnectionlogModule { }
