import { Injectable } from '@angular/core';
import { TokenService} from '../../Service/core/authentication/token.service';
import { environment} from '../../../environments/environment';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(private token:TokenService,private http:HttpClient) { }

  tenantId = this.token.getTenantID();

  
  shift(tenantId):Observable<any> {
    return this.http.get('shifts?tenant_id='+tenantId)
  }
  shifttransaction(shift_id):Observable<any>{
    return this.http.get('shifttransactions?shift_id='+shift_id)
  }
  edit(id, val):Observable<any>{
    return this.http.put('shifts/'+id, val)
  }
  delete_row(id):Observable<any>{
    return this.http.delete('shifttransactions/'+id)
  }
  shift_edit(id,val):Observable<any>{
    return this.http.put('shifttransactions/'+id,val)
  }
  post(value):Observable<any>{
    return this.http.post('shifttransactions',value)
  }
}
