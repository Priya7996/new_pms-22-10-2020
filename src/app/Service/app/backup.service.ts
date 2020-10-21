import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment';
import { TokenService } from '../core/authentication/token.service';
@Injectable({
  providedIn: 'root'
})
export class BackupService {

  constructor(private http:HttpClient) { }

  machine(tenantId):Observable<any>{
    return this.http.get('machines?tenant_id='+tenantId)
  }
  display_reason(id):Observable<any>{
    return this.http.get('backup_file_list?id='+id)
  }

  machine_lock(tenantId):Observable<any>{
    return this.http.get('machines?tenant_id='+tenantId)
  }
  backup_folder(value):Observable<any>{
    return this.http.post('backup_upload',value)
  }
}
