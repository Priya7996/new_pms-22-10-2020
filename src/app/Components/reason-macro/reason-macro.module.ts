import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule} from '../shared/shared.module';
import { ReasonMacroService} from '../../Service/app/reason-macro.service'

import { ReasonMacroComponent,User,Edit,Dialog } from './reason-macro.component';

const routes: Routes = [{ path: '', component: ReasonMacroComponent }];

@NgModule({
  declarations: [ReasonMacroComponent,User,Edit,Dialog],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule,
  ],
  entryComponents:[User,Edit,Dialog],
  providers:[ReasonMacroService]


})
export class ReasonMacroModule { }
