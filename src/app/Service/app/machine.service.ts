import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http:HttpClient,private token:TokenService) { }
   
  tenantId = this.token.getTenantID();

  card(tenantId):Observable<any> {
    return this.http.get('machines?tenant_id='+tenantId)
  }
  machine(value):Observable<any>{
    return this.http.post('machines',value)
  }
  settinglist(machine,tenant):Observable<any>{
    return this.http.get('machine_setting_list?machine_id='+machine + '&&tenant_id='+tenant)
  }
  edit(id,val):Observable<any>{
    return this.http.put('machines/'+id,val)
  }
  statuschange(id,active):Observable<any>{
    return this.http.get('machine_setting_update?machine_setting_list_id='+ id + '&&is_active=' + active)
  }
  delete_row(id):Observable<any>{
    return this.http.delete('machines/' + id)
  }
}
