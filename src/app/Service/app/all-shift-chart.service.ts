import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AllShiftChartService {
  date1:any;

  constructor(private http:HttpClient,private token:TokenService,private datePipe: DatePipe) { }
  tenantId = this.token.getTenantID();
  
  machine(tenantId):Observable<any>{
    return this.http.get('machines?tenant_id='+tenantId)
  }
  shift(tenantId):Observable<any> {
    return this.http.get('shifttransactions?shift_id='+tenantId)
  }
  shift_machine_status_chart(register):Observable<any>{
    this.date1=  this.datePipe.transform(register.date, 'yyyy-MM-dd');

    return this.http.get('shift_machine_status_chart?machine_id=' + register.machine_id + '&&shift_id=' + register.shift_id + '&&tenant_id=' + register.tenant_id + '&&date=' +  this.date1)
  }
  shift_machine_utilization_chart(register):Observable<any>{
    this.date1=  this.datePipe.transform(register.date, 'yyyy-MM-dd');

    return this.http.get('shift_machine_utilization_chart?machine_id=' + register.machine_id + '&&shift_id=' + register.shift_id + '&&tenant_id=' + register.tenant_id + '&&date=' + this.date1)
  }
  all_cycle_time_chart_new(register):Observable<any>{
    this.date1=  this.datePipe.transform(register.date, 'yyyy-MM-dd');

    return this.http.get('all_cycle_time_chart_new?machine_id=' + register.machine_id + '&&shift_id=' + register.shift_id + '&&tenant_id=' + register.tenant_id + '&&date=' + this.date1)
}
shiftidentity(tenantId):Observable<any>{
  return this.http.get('shifts?tenant_id='+tenantId)
}
current_status(tenantId):Observable<any>{
  return this.http.get('current_shift?tenant_id='+tenantId)
}
}