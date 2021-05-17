import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor(private http:HttpClient,private token:TokenService) { }


  tenantId = this.token.getTenantID();

  // alarm(tenantId):Observable<any> {
  //   return this.http.get('alarms?tenant_id='+tenantId)
  // }         

  alarm_history(tenantId,pageNo):Observable<any> {
    return this.http.get('alarm_histories?tenant_id='+tenantId +'&&page='+pageNo+'&&per_page='+20)
  }
  alarm_count():Observable<any> {

    return this.http.get('alarm_count')


  }
}

     