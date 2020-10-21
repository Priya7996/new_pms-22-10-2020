import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http:HttpClient, private token: TokenService) { }


  tenantId = this.token.getTenantID();


  internet(tenantId):Observable<any> {
    return this.http.get('connection_logs?tenant_id='+tenantId)
  }

  power(tenantId):Observable<any> {
    return this.http.get('connection_logs?tenant_id='+tenantId)
  }
  
  ethernet(tenantId):Observable<any> {
    return this.http.get('ethernet_logs?tenant_id='+tenantId)
  }
}
