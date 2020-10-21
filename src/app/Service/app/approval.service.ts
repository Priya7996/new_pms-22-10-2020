import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../core/authentication/token.service';
import { environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  constructor(private http:HttpClient,private token:TokenService) { }
  
  tenantId = this.token.getTenantID();

  second_api():Observable<any>{
    return this.http.get('pending_approvals')
  }
}
