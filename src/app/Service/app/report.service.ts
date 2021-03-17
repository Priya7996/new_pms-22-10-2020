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

  table(register,new_date,new_date1,type,tenant_id,docku):Observable<any>  {
    if(type === 'Shiftwise' && docku === 'Hourwise'){ 
      

      return this.http.get('hour_reports?tenant_id='+tenant_id+ '&&start_date=' + new_date + '&&end_date=' + new_date1 +'&&machine_id=' + register.machine_id + '&&shift_id=' + register.shift_id + '&&report_type=' + type + '&&operator_id=' + undefined + '&&hour_wise=' + true )

    }else if(type === 'Shiftwise' && docku === 'ProgramNumber'){

      return this.http.get('hour_reports?tenant_id='+tenant_id+ '&&start_date=' + new_date + '&&end_date=' + new_date1 +'&&machine_id=' + register.machine_id + '&&shift_id=' + register.shift_id + '&&report_type=' + type + '&&operator_id=' + undefined + '&&hour_wise=' + false + '&&program_wise=' + true)
 

    }

    else if(type === 'Operatorwise' && docku === 'Hourwise'){

      return this.http.get('hour_reports?tenant_id='+tenant_id+ '&&start_date=' + new_date + '&&end_date=' + new_date1 +'&&machine_id=' + register.machine_id + '&&shift_id=' + undefined + '&&report_type=' + type + '&&operator_id=' +  register.operator_id + '&&hour_wise=' + true)
 

    }
    else if(type === 'Operatorwise' && docku === 'ProgramNumber'){

      return this.http.get('hour_reports?tenant_id='+tenant_id+ '&&start_date=' + new_date + '&&end_date=' + new_date1 +'&&machine_id=' + register.machine_id + '&&shift_id=' + undefined + '&&report_type=' + type + '&&operator_id=' + register.operator_id + '&&hour_wise=' + false + '&&program_wise=' + true)
 

    }
    
  
    else{

      return this.http.get('utilization_reports?tenant_id='+tenant_id+ '&&start_date=' + new_date + '&&end_date=' + new_date1 +'&&machine_id=' + register.machine_id + '&&report_type=' + type)
 

    }

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
