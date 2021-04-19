import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class PartService {

  constructor(private http:HttpClient,private token:TokenService) { } 
  tenantId = this.token.getTenantID();

  part(tenantId):Observable<any> {
    return this.http.get('part_configurations?tenant_id='+tenantId)
  }
  post(value):Observable<any>{
    return this.http.post('part_configurations',value)
  }
  put(id,val):Observable<any>{
    return this.http.put('part_configurations/'+id,val)

  }
delete_row(id):Observable<any>{
    return this.http.delete('part_configurations/'+id)

}
}
