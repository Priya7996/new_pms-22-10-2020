import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class ReasonMacroService {

  constructor(private http:HttpClient,private token:TokenService) { }
  // url = environment.serverUrl;

  tenantId = this.token.getTenantID();

  
  // user(value):Observable<any> {
  //   return this.http.post('users',value)
  // }

  // edit(id,val):Observable<any> {
  //   return this.http.put('users/'+id,val)
  // }
  list(tenantId):Observable<any> {
    return this.http.get('users?tenant_id='+tenantId)
  }
  delete_row(id):Observable<any>{
    return this.http.delete('users/'+id)
  }
}
