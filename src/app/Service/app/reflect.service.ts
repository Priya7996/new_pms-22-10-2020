import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReflectService {

  constructor(private http:HttpClient) { }

  get_reason(){
    return this.http.get('tab_list_of_idel')
  }
  redirect(data):Observable<any>{
    return this.http.post('tab_reson_for_idle',data)
  }
}
