import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class HmiService {

  constructor(private token:TokenService,private http:HttpClient) { }
  
  tenantId = this.token.getTenantID();


  machine(tenantId):Observable<any>{
    return this.http.get('machines?tenant_id='+tenantId)
  }
  
   shift(tenantId):Observable<any> {
    return this.http.get('shifttransactions?shift_id='+tenantId)
  }
  table(register):Observable<any>{
    return this.http.get('hmi_reason?tenant_id='+ register.tenant_id+ '&&start_date=' + register.start_date + '&&end_date=' + register.end_date + '&&machine_id=' + register.machine_id + '&&shift_id=' +register.shift_id)
  }
  chart(register):Observable<any>{
    return this.http.get('hmi_reason_chart?tenant_id='+ register.tenant_id+ '&&start_date=' + register.start_date + '&&end_date=' + register.end_date + '&&machine_id=' + register.machine_id + '&&shift_id=' +register.shift_id)
   
  }
  shiftidentity(tenantId):Observable<any>{
    return this.http.get('shifts?tenant_id='+tenantId)
  }

}
// return this.http.get('reports?report_type=' + type + '&&from_date=' + from + '&&to_date=' + to +'&&dealer_id=' + dealer 
//     +'&&customer_id='+customer+'&&city_id='+city + '&&service_type_id='+service+'&&mac_model='+model+'&&si_circle=' + si_circle)
