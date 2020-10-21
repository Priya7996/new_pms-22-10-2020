import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class OperatorAllocationService {
   

  token1: any;
  headers: any;
  options: any;

  constructor(private http:HttpClient,private token:TokenService) { 
  this.token1 = localStorage.getItem('token');
  console.log(this.token1)
  let headers1: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token1}`
  });
console.log(headers1)
}
// url = environment.serverUrl;
tenantId = this.token.getTenantID();


  list(tenantId):Observable<any>{
    return this.http.get('operator_allocations?tenant_id='+tenantId)
  }
  machine(tenantId):Observable<any> {
    console.log(this.headers);
    return this.http.get('machines?tenant_id='+tenantId );
  }
  operator():Observable<any> {
    return this.http.get('operators?tenant_id='+this.tenantId, this.headers);
  }
  shift(tenantId):Observable<any> {
    return this.http.get('shifts?tenant_id='+tenantId)

  }
  operator_create(value):Observable<any>{
    return this.http.post('operator_allocations',value)
  }
  delete_row(id):Observable<any>{
    return this.http.delete('operator_allocations/'+id)

}
shifttransaction(id):Observable<any> {
  return this.http.get('shifttransactions?shift_id='+id)
}
}
