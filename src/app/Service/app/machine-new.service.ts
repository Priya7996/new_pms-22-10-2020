import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class MachineNewService {

  constructor(private http:HttpClient, private token: TokenService) { }
  
  tenantId = this.token.getTenantID();

  
  machine(tenantId):Observable<any>{
    return this.http.get('machines?tenant_id='+tenantId)
  }
  getoption(tenantId):Observable<any>{
    return this.http.get('machine_current_shit?tenant_id='+tenantId)
  }
  changemachine(tenantid,machineid):Observable<any>{
    return this.http.get('current_shift_hour_wise?tenant_id='+tenantid + '&&machine_id='+machineid)
  }
  

}

