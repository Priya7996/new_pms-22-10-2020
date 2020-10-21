import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class OEEService {

  constructor(private token:TokenService,private http:HttpClient) { }
  tenantId = this.token.getTenantID();


  oee(tenantId):Observable<any>{
    return this.http.get('oee_calculations?tenant_id='+tenantId)
  }
  machine(tenantId):Observable<any>{
    return this.http.get('machines?tenant_id='+tenantId)
  }
  shift(tenantId):Observable<any> {
    return this.http.get('shifttransactions?shift_id='+tenantId)
  }
  oeeshift(id):Observable<any>{
    return this.http.get('calculate_time?shift_id='+ id)
  }
  shiftidentity(tenantId):Observable<any>{
    return this.http.get('shifts?tenant_id='+tenantId)
  }
  OEE(val):Observable<any>{
    return this.http.post('oee_calculations',val)
  }
  operator(tenantId):Observable<any>{
    return this.http.get('operator_allocations?tenant_id='+tenantId)
  }
  oee_show(data):Observable<any>{
    return this.http.post('oee_calculations',data)
  }
}
