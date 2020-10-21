import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService} from '../../Service/core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  // url = environment.serverUrl;

  signin(login):Observable<any> {
      return this.http.post('login', login);
  }
  forgot(params):Observable<any> {
    return this.http.get('sessions/forgot_pwd='+params)
  }
}
