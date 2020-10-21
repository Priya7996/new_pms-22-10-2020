import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceRegistrationService {

  constructor(private http:HttpClient, private token:TokenService) { }

  device_types = this.token.getTenantID();

  sixth_api():Observable<any>{
    return this.http.get('device_types')
  }
  user(value):Observable<any> {
    return this.http.post('users',value)
  }

  edit(id,val):Observable<any> {
    return this.http.put('users/'+id,val)
  }

  delete_row(id):Observable<any>{
    return this.http.delete('users/'+id)
  }
}
