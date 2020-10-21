import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class MachineViewService {

  constructor(private token:TokenService,private http:HttpClient) { }

  dashboard_full(id):Observable<any>{
    return this.http.get('single_machine_live_status?machine_id='+id)
  }
}
