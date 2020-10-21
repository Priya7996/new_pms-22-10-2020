import { DeviceRegistrationService } from './../../Service/app/device-registration.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceRegistrationComponent,User,Edit} from './device-registration.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';

const routes: Routes = [{ path: '', component: DeviceRegistrationComponent }];

@NgModule({
  declarations: [DeviceRegistrationComponent,User,Edit],
  imports: [RouterModule.forChild(routes),
    CommonModule, SharedModule
      ],
      entryComponents:[User,Edit],
   providers:[DeviceRegistrationService]
})
export class DeviceRegistrationModule { }
