import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root' 
})
export class CycleStartService {
  date1: string;

  constructor(private token:TokenService,private http:HttpClient,private datePipe: DatePipe) { }

  tenantId = this.token.getTenantID();


  machine(tenantId):Observable<any>{
    return this.http.get('machines?tenant_id='+tenantId)
  }
  
   shift(tenantId):Observable<any> {
    return this.http.get('shifttransactions?shift_id='+tenantId)
  }
  cycle_start_to_start(register):Observable<any>{
    this.date1=  this.datePipe.transform(register.date, 'yyyy-MM-dd');

    return this.http.get('cycle_start_to_start?machine_id=' + register.machine_id + '&&shift_id=' + register.shift_id + '&&tenant_id=' + register.tenant_id + '&&date=' + this.date1 )
  }
  shiftidentity(tenantId):Observable<any>{
    return this.http.get('shifts?tenant_id='+tenantId)
  }
  current_status(tenantId):Observable<any>{
    return this.http.get('current_shift?tenant_id='+tenantId)
  }
}
