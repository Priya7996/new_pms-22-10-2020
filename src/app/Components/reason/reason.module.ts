import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReasonComponent } from './reason.component';
import { SharedModule} from '../shared/shared.module';
const routes: Routes = [{ path: '', component: ReasonComponent }];


@NgModule({
  declarations: [ReasonComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,SharedModule
  ]
})
export class ReasonModule { }
                  