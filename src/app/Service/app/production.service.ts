import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class ProductionService {

  constructor(private http:HttpClient) { }

  namakkal(machine):Observable<any>{
  console.log(machine)
  return this.http.get('live_production_part?machine=' + machine)
  }
  getmachines():Observable<any>{
    return this.http.get('tab_machine_list')
 }
 getshift():Observable<any>{
   return this.http.get('tab_shift_list')
 }
 overall_report(register):Observable<any>{
   return this.http.get('production_results?machine=' + register.machine +'&&shift_num=' +register.shift_num +'&&date='+ register.date )
 }
 accept(data){
   console.log(data)
   return this.http.put('production_results_remarks',data)
   
 }
 reject(data):Observable<any>{
  console.log(data)
  return this.http.put('production_results_remarks',data)
  
}

//  first_page_loading():Observable<any>{
//   return this.http.get('previous_shift')
// }
}
