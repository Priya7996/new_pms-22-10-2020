// // Angular Components
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// // App Components
import {environment} from '../../../../environments/environment';
 import { TokenService } from '../authentication/token.service';
//import {TokenService} from '../../token.service';
// // App Services
import { Logger } from '../logger.service';
//  import {  TokenService } from 'app/services';

const successLog = new Logger('SuccessHandlerInterceptor');
const errorLog = new Logger('ErrorHandlerInterceptor');

@Injectable()
export class SuccessErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {
   } 

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       let self = this;
  return next.handle(request).pipe(
           map(response =>
               self.successHandler(response)
           ),
                   catchError(error => self.errorHandler(error))
       )
    }
//     successHandler(response: HttpEvent<any>): any {
//         throw new Error("Method not implemented.");
//     }

//     // Handle the success responses and its messages
successHandler = (response: HttpEvent<any>): HttpEvent<any> => {
  if (response instanceof HttpResponse) {
              if (!environment.production) {
           successLog.info('http success event-->>', response);
       }
      if (response.body.token) {
            this.tokenService.setToken(response.body.token);
      }
    }
  return response;
} 

//     // Customize the default error handler here if needed
errorHandler = (error: HttpEvent<any>): Observable<HttpEvent<any>> => {
    if (error instanceof HttpErrorResponse) {
        if (!environment.production) {
           errorLog.error('http error event-->>', error);
       }
       return throwError(error);
 }
}
}
