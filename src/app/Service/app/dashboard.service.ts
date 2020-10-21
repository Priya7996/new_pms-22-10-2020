import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private token:TokenService,private http:HttpClient) { }

  tenantId = this.token.getTenantID();

  dashboard(tenant_id):Observable<any>{
    return this.http.get('latest_dashboard?tenant_id='+tenant_id)
  }
  dashboard_full(id):Observable<any>{
    return this.http.get('single_machine_live_status?machine_id='+id)
  }

}
