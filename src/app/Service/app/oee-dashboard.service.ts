import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OeeDashboardService {

  constructor(private http:HttpClient) { }

  live(machine):Observable<any>{
  console.log(machine)
  return this.http.get('live_oee_tab?machine=' + machine)
  }

  getmachines():Observable<any>{
    return this.http.get('tab_machine_list')
 }
 getshift():Observable<any>{
   return this.http.get('tab_shift_list')
 }
  overall_report(register):Observable<any>{
   return this.http.get('oee_past_dashboard?machine=' + register.machine +'&&shift_num=' +register.shift_num +'&&date='+ register.date )
 }
}
