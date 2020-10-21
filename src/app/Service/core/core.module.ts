import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard} from '../core/authentication/auth.guard';
import { TokenService} from '../core/authentication/token.service';
import { Tokentinterceptor} from '../core/http/tokentinterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuard,
    TokenService,
   Tokentinterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Tokentinterceptor,
      multi: true
    }
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
