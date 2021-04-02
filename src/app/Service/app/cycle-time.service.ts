import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
import { register } from 'ts-node';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CycleTimeService {
  date1:any;
  constructor(private http:HttpClient,private token: TokenService,private datePipe: DatePipe) { }
  
  
  machine(tenantId):Observable<any>{
    return this.http.get('machines?tenant_id='+tenantId)
  }
  shift(tenant_id):Observable<any> {
    return this.http.get('shifttransactions?shift_id='+tenant_id)
  }
  
  shifttransaction(id):Observable<any> {
    return this.http.get('shifttransactions?shift_id='+id)
  }
  // First chart Api//
  all_time_chart(register):Observable<any>{
    this.date1=  this.datePipe.transform(register.date, 'yyyy-MM-dd');

    return this.http.get('all_cycle_time_chart?machine_id=' + register.machine_id + '&&shift_id=' + register.shift_id + '&&tenant_id=' + register.tenant_id + '&&date=' + this.date1)
  }
  // Third Api
  shift_machine_status(register):Observable<any>{
    this.date1=  this.datePipe.transform(register.date, 'yyyy-MM-dd');

    return this.http.get('hour_machine_status_chart?machine_id=' + register.machine_id + '&&shift_id=' + register.shift_id + '&&tenant_id=' +register.tenant_id + '&&date=' + this.date1)
  }
 
  // Second Chart Api//
  hour_parts_count(register):Observable<any>{
    this.date1=  this.datePipe.transform(register.date, 'yyyy-MM-dd');

      return this.http.get('hour_parts_count_chart?machine_id=' + register.machine_id + '&&shift_id=' + register.shift_id + '&&tenant_id=' + register.tenant_id + '&&date=' + this.date1 )
  }

 
// Fourth Api
hour_machine_utilization(register):Observable<any>{
  this.date1=  this.datePipe.transform(register.date, 'yyyy-MM-dd');

  return this.http.get('hour_machine_utliz_chart?machine_id=' + register.machine_id + '&&shift_id=' + register.shift_id + '&&tenant_id=' + register.tenant_id + '&&date=' + this.date1 )
}
shiftidentity(tenantId):Observable<any>{
  return this.http.get('shifts?tenant_id='+tenantId)
}
current_status(tenantId):Observable<any>{
  return this.http.get('current_shift?tenant_id='+tenantId)
}
}

// hour_machine_status_chart(register):Observable<any>{
//   return this.http.get('hour_parts_count_chart?machine_id=' + register.machine_id + '&&shift_id=' + register.shift_id + '&&tenant_id=' + register.tenant_id + '&&date=' + register.date )
// }