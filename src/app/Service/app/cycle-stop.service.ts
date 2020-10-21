import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class CycleStopService {

  constructor(private token:TokenService,private http:HttpClient) { }

  tenantId = this.token.getTenantID();


  machine(tenantId):Observable<any>{
    return this.http.get('machines?tenant_id='+tenantId)
  }
  
   shift(tenantId):Observable<any> {
    return this.http.get('shifttransactions?shift_id='+tenantId)
  }
  cycle_time_stop(register):Observable<any>{
   return this.http.get ('cycle_stop_to_start?machine_id=' + register.machine_id + '&&shift_id=' + register.shift_id + '&&tenant_id=' + register.tenant_id + '&&date=' + register.date )
  }
  shiftidentity(tenantId):Observable<any>{
    return this.http.get('shifts?tenant_id='+tenantId)
  }
  current_status(tenantId):Observable<any>{
    return this.http.get('current_shift?tenant_id='+tenantId)
  }
}
