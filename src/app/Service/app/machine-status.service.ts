import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { TokenService } from '../core/authentication/token.service';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MachineStatusService {

  constructor(private http:HttpClient,private token:TokenService) { }
  tenantId = this.token.getTenantID();
  // url = environment.serverUrl;



  firstapi():Observable<any>{
    return this.http.get('machines/status')
  }
}
