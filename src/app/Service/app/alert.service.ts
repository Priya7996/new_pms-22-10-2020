import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  token2: any;

  constructor(private http:HttpClient, private token: TokenService ) { 
    

  }  

  tenantId = this.token.getTenantID();

  alert(tenantId,pageNo):Observable<any> {
    return this.http.get('alerts?tenant_id='+tenantId + '&&page='+pageNo+'&&per_page='+10)
  }}
