import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class ReasonService {

  constructor(private token:TokenService,private http:HttpClient) { }

  tenantId = this.token.getTenantID();
   
  tenant_id(tenantId):Observable<any> {
    return this.http.get('machines?tenant_id='+tenantId)
  }
  display_reason(id):Observable<any>{
    return this.http.get('code_compare_reasons?id='+id)
  }
}
