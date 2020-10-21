import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private token:TokenService,private http:HttpClient) { }
 
  tenantId = this.token.getTenantID();
 

  tenant_id(tenantId):Observable<any>{
    return this.http.get('machines?tenant_id='+tenantId)
  }

  shift(tenantId):Observable<any> {
    return this.http.get('shifttransactions?shift_id='+tenantId)
  }
  operator(tenantId):Observable<any> {
   
    return this.http.get('operators?tenant_id='+tenantId);
  }
  report(report,tenant_id):Observable<any>{
    return this.http.get('resport_split_value?report_type='+report + '&&tenant_id=' + tenant_id)
  }
  table(register):Observable<any>{
    return this.http.get('hour_reports?tenant_id='+register.tenant_id + '&&start_date=' +register.start_date + '&&end_date=' +register.end_date +'&&machine_id=' + register.machine_id + '&&operator_id=' + register.operator_id +'&&shift_id=' +register.shift_id + '&&report_type=' + register.report_type +'&&hourwise='+register.hourwise+'&&programnumber='+register.programnumber  )
  }
  shiftidentity(tenantId):Observable<any>{
    return this.http.get('shifts?tenant_id='+tenantId)
  }
  cnc_jobs(tenantId):Observable<any>{
    return this.http.get('cncjobs?tenant_id='+tenantId)
  }
  data(tenantId):Observable<any>{
    return this.http.get('report_value?tenant_id='+tenantId)
  }

}
