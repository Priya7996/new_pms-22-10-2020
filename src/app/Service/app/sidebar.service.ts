import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private http:HttpClient,private token:TokenService) { }
  // url = environment.serverUrl;

  tenantId = this.token.getTenantID();

  editvalue(id,val):Observable<any>{
    console.log(id,val)
    return this.http.put('users/'+id,val)
  }

}
