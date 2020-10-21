import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor(private http:HttpClient,private token:TokenService) { }
  tenantId = this.token.getTenantID();

  operator(tenantId):Observable<any> {
    return this.http.get('operators?tenant_id='+tenantId)
  }
  post(value):Observable<any>{
    return this.http.post('operators',value)
  }
  put(id,val):Observable<any>{
    return this.http.put('operators/'+id,val)

  }
delete_row(id):Observable<any>{
    return this.http.delete('operators/'+id)

}
}
