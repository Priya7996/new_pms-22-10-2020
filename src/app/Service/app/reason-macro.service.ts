import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({ 
  providedIn: 'root'
})
export class ReasonMacroService {

  constructor(private http:HttpClient,private token:TokenService) { }
  // url = environment.serverUrl;

  tenantId = this.token.getTenantID();

  
  // user(value):Observable<any> {
  //   return this.http.post('hmi_reasons',value)
  // }
  // post(data):Observable<any> {
  //   return this.http.post('hmi_reasons',data)
  // }

  Send_data(data):Observable<any> {
    console.log(data)
    return this.http.post('hmi_reasons',data)
  }


  edit(id: any,data: any):Observable<any> { 
    return this.http.put('hmi_reasons/'+id,data)
  }
  list():Observable<any> {
    return this.http.get('hmi_reasons')
  }
  delete_row(id):Observable<any>{
    return this.http.delete('hmi_reasons/'+id)
  }

  VAPMS(value):Observable<any>{
    return this.http.post('post_hmi_reason',value)
  }
}
