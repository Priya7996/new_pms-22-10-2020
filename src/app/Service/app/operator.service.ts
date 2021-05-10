import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor(private http:HttpClient,private token:TokenService) { } 
  tenantId = this.token.getTenantID();

  operator(tenantId):Observable<any> {
    return this.http.get('operators?tenant_id='+tenantId)
  }

  operator_get_ass():Observable<any> {
    return this.http.get('operator_allocations')
  }
  post(value):Observable<any>{
    return this.http.post('operators',value)
  }
  post1(value):Observable<any>{
    return this.http.post('operation_managements',value)
  }
  put(id,val):Observable<any>{
    return this.http.put('operators/'+id,val)

  }

  list_machine(tenantId):Observable<any> {
    return this.http.get('machines?tenant_id='+tenantId)
  }
  list_operator(tenantId):Observable<any> {
    return this.http.get('operators?tenant_id='+tenantId)
  }
delete_row(id):Observable<any>{
    return this.http.delete('operators/'+id)

}
shiftidentity(tenantId):Observable<any>{
  return this.http.get('shifts?tenant_id='+tenantId)
}
shift(tenantId):Observable<any> {
  return this.http.get('shifttransactions?shift_id='+tenantId)
}

operator1(tenantId):Observable<any> {
  return this.http.get('operation_managements?tenant_id='+tenantId)
}
put1(id,val):Observable<any>{
  return this.http.put('operation_managements/'+id,val)

}
delete_row_man(id):Observable<any>{
  return this.http.delete('operation_managements/'+id)

}

delete_row_operass(id):Observable<any>{
  return this.http.delete('operator_allocations/'+id)

}

list_operation_id(tenantId):Observable<any> {
  return this.http.get('operation_managements?tenant_id='+tenantId)
}


post_oper_ass(value):Observable<any>{
  return this.http.post('operator_allocations',value)
}

shift_put_ass(id,val):Observable<any>{
  return this.http.put('operator_allocations/'+id,val)

}




operator_proce(tenantId):Observable<any> {
  return this.http.get('process_plans?tenant_id='+tenantId) 
}
get_opm(macid):Observable<any> {
  return this.http.get('get_operation_management?process_plan_id='+macid) 
}
}
// operation_managements?process_plan_id=1