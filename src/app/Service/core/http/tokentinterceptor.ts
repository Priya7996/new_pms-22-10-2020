import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService  } from '../authentication/token.service';
import { environment} from '../../../../environments/environment';

@Injectable({      
  providedIn: 'root'
})
export class Tokentinterceptor implements HttpInterceptor{
  encodedToken: any;

  constructor(private token:TokenService) { 
  this.encodedToken = this.token.getEncodedToken(); 
  
}

  intercept(request : HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>> {

    if (!/^(http|https):/i.test(request.url)) {
      if (request.url.includes('/register && sessions/forgot_pwd && check_status')) {
          request = request.clone({ url: environment.serverUrl + request.url });
      }
      else {
          this.encodedToken = this.token.getEncodedToken();
          let headers: HttpHeaders = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.encodedToken}`
          });
          request = request.clone({ url: environment.serverUrl + request.url, headers });
      }
  }
  return next.handle(request);
  }
  
}
