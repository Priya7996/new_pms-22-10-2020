import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService} from '../../Service/core/authentication/token.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AlarmHistoryService {
  s_date:any;
  e_date:any;
  constructor(private http:HttpClient,private token:TokenService,private datePipe: DatePipe) { }


  tenantId = this.token.getTenantID();

  alarm_history(tenantId):Observable<any> {
    return this.http.get('machines?tenant_id='+tenantId)
  }
  shift(tenantId):Observable<any> {
    return this.http.get('shifttransactions?shift_id='+tenantId)
  }
  operator(tenantId):Observable<any> {
   
    return this.http.get('operators?tenant_id='+tenantId);
  }
  table(register,type):Observable<any>  {
    if(type === 'ShiftWise'){ 
     this.s_date=  this.datePipe.transform(register.start_date, 'dd-MM-yyyy');
     this.e_date=  this.datePipe.transform(register.end_date, 'dd-MM-yyyy');
      return this.http.get('alarm_reports?tenant_id='+this.tenantId+ '&&start_date=' + this.s_date + '&&end_date=' + this.e_date +'&&machine_id=' + register.machine_id + '&&shift_id=' + register.shift_id + '&&report_type=' + type)
    }else{
      return this.http.get('alarm_reports?tenant_id='+this.tenantId+ '&&start_date=' + register.start_date + '&&end_date=' + register.end_date +'&&machine_id=' + register.machine_id + '&&operator_id=' + register.operator_id + '&&report_type=' + type)
    }
    
  }
  shiftidentity(tenantId):Observable<any>{
    return this.http.get('shifts?tenant_id='+tenantId)
  }
}

