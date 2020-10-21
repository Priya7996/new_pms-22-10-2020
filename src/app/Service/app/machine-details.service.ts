import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class MachineDetailsService {

  constructor(private token:TokenService,private http:HttpClient) { }

  tenantId = this.token.getTenantID();

  dashboard_lock(tenant_id):Observable<any>{
    return this.http.get('latest_dashboard?tenant_id='+tenant_id)
  }
}
