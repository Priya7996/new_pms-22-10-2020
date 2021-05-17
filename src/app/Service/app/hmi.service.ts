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
    return this.http.get('idle_report?machine='+ register.machine + '&&date=' + register.date + '&&shift=' +register.shift)
  }
  chart(register):Observable<any>{
    return this.http.get('idle_report_chart?machine='+ register.machine+ '&&date=' + register.date + '&&shift=' + register.shift )
   
  }
  shiftidentity(tenantId):Observable<any>{
    return this.http.get('shifts?tenant_id='+tenantId)
  }
  paretto_chart(register):Observable<any>{
    return this.http.get('idle_report_pareto?machine='+ register.machine+ '&&date=' + register.date + '&&shift=' + register.shift )
   
  }
}
// return this.http.get('reports?report_type=' + type + '&&from_date=' + from + '&&to_date=' + to +'&&dealer_id=' + dealer 
//     +'&&customer_id='+customer+'&&city_id='+city + '&&service_type_id='+service+'&&mac_model='+model+'&&si_circle=' + si_circle)




// http://15.207.212.223:3000/api/v1/idle_report_pareto?machine=1&&shift=4&&date=05/10/2021-05/10/2021