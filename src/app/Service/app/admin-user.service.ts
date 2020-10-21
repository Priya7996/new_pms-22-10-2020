import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService} from '../../Service/core/authentication/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http:HttpClient,private token:TokenService) { }

  tenantId = this.token.getTenantID();

  third_api():Observable<any>{
    return this.http.get('users/admin_user')
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
