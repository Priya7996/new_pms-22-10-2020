import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachineLmwService {

  constructor(private http:HttpClient) { }

  machine_lmw():Observable<any> {
    return this.http.get('tab_machine_list');
}

}
