import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { AlarmHistoryService} from '../../Service/app/alarm-history.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import Swal from 'sweetalert2'; 
@Component({
  selector: 'app-alarm-history-report',
  templateUrl: './alarm-history-report.component.html',
  styleUrls: ['./alarm-history-report.component.scss']
})
export class AlarmHistoryReportComponent implements OnInit {
  public today: Date = new Date(new Date().toDateString());
  startDate = new Date(2020, 0, 1);
  endDate = new Date(2020,0,1);
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','alarmtype','alarmnumber','alarmmessage','alarmtime'];
  dataSource = new MatTableDataSource();
  show: boolean=false;
  type:any;
  login:FormGroup;
  machine_response: any;
  shift_response: any;
  tenant: any;
  operator_response: any;
  reports: any;
  valuesplit:any;
  data:any;
  reportList: boolean;
  // reportList = false;
  constructor(private http:HttpClient,private nav:NavbarService,private service:AlarmHistoryService,private fb:FormBuilder,) { 
    this.nav.show()
    this.tenant=localStorage.getItem('tenant_id')

  }
  ngOnInit() {
    this.login = this.fb.group({
      machine_id:[""],
      shift_id:[""],
      operator_id:[""],
      start_date:[""],
      end_date:[""],
      report_type:[""],
    })
    this.service.alarm_history(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      this.machine_response=res;
    })
    // this.service.shift( this.tenant).subscribe(res => {
    //   console.log(res);
    //   this.shift_response=res;
    //   console.log(localStorage.getItem('token'));})
    this.service.shiftidentity(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.service.shift(res.id).subscribe(res => {
       this.shift_response=res; 
      })
    })
    this.service.operator(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
    //  console.log(res);
     this.operator_response=res;
    //  console.log(localStorage.getItem('token'));
    })
  }

// shiftview()
// {
//   this.show=!this.show
// }
// operatorview()
// {
//   this.show=!this.show
// }

getsplit(val){
   this.valuesplit = val;
   console.log( this.valuesplit)
}
export(){
  
}

loginfunc(){
 console.log(this.login.value)
  

  
  let register = this.login.value;
  console.log(register)
  register.tenant_id = this.tenant;

this.service.table(register).subscribe(res =>{
  console.log(res);
})

 

   



          // this.http.get("api/v1/alarm_reports?tenant_id="+ register.tenant_id + '&&start_date=' + register.start_date + '&&end_date=' + register.end_date  + '&&machine_id=' + register.machine_id + '&&shift_id=' + register.shift_id +'&&report_type=' +register.report_type).subscribe(res => {             
          //   this.reports = res;
          //   this.reportList = true;
          //   this.dataSource = new MatTableDataSource(this.reports);
          //   this.reportList = true;
          //  })
         
}

ngOnDestroy(){

}
}
