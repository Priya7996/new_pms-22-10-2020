import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class  ProgramListService {
 
  constructor(private token:TokenService,private http:HttpClient) { }
  tenantId = this.token.getTenantID();


  machine(tenantId):Observable<any>{
    return this.http.get('machines?tenant_id='+tenantId)
  }
  file_upload(value):Observable<any>{
    return this.http.post('file_upload',value)
  }
  // filelist(id):Observable<any>{
  //   return this.http.get('file_list?id='+id)
  // }
  display_reason(id):Observable<any>{
    return this.http.get('file_list?id='+id)
  }
}
