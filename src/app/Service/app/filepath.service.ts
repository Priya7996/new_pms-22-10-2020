import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService} from '../core/authentication/token.service';

@Injectable({
  providedIn: 'root'
})
export class FilepathService {

  token1: any;
  headers: any;
  options: any;

  constructor(private http:HttpClient, private token: TokenService ) { 
    this.token1 = localStorage.getItem('token');
    console.log(this.token1)
    let headers1: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token1}`
    });
  console.log(headers1)
  }
  // url = environment.serverUrl;
  tenantId = this.token.getTenantID();
 
  tenant_id() {
    console.log(this.headers);
    return this.http.get('machines?tenant_id='+this.tenantId, this.headers);
  }
 
  popup(params)
  {console.log(params)
   return this.http.post('/program_confs',params)
  }
  edit(value,val)
  {
    return this.http.put('program_confs/'+value,val)
  }
  machine(tenantid):Observable<any>{
     return this.http.get('/machines?tenant_id='+tenantid)
  }
  show_filepath(tenantId):Observable<any>{
    return this.http.get('program_confs?tenant_id='+tenantId)
  }
  delete_row(id):Observable<any>{
    return this.http.delete('program_confs/'+id)
  }
  file_list(id):Observable<any>{
    return this.http.get('file_list?id='+id)
  }
}

