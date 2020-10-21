import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http:HttpClient, private token:TokenService) { }

  tenantId = this.token.getTenantID();

  fourth_api():Observable<any>{
    return this.http.get('settings')
  }
}
