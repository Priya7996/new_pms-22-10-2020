import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(private http:HttpClient,private token:TokenService) { } 
  tenantId = this.token.getTenantID();

  operator(tenantId):Observable<any> {
    return this.http.get('process_plans?tenant_id='+tenantId) 
  }
  post(value):Observable<any>{
    return this.http.post('process_plans',value)
  }
  put(id,val):Observable<any>{
    return this.http.put('process_plans/'+id,val)

  }
  part(tenantId):Observable<any> {
    return this.http.get('part_configurations?tenant_id='+tenantId)
  }
delete_row(id):Observable<any>{
    return this.http.delete('process_plans/'+id)

}
}
