import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient,private token:TokenService) { }
  
  tenantId = this.token.getTenantID();

  notification(tenant_id):Observable<any>{
    return this.http.get('set_alarm_settings?tenant_id='+tenant_id)
  }

  setStatus(data):Observable<any> {
    return this.http.put('set_status',data);
  }
  timeinterval(id,time):Observable<any> {
    return this.http.put('set_alarm_settings/'+id,time);
  }

  
}
