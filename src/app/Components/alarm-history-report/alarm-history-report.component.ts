import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { AlarmHistoryService} from '../../Service/app/alarm-history.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2'; 
@Component({
  selector: 'app-alarm-history-report',
  templateUrl: './alarm-history-report.component.html',
  styleUrls: ['./alarm-history-report.component.scss']
})
export class AlarmHistoryReportComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','alarmtype','alarmnumber','alarmmessage','alarmtime'];
  dataSource = new MatTableDataSource();
  show: boolean=false;
  login:FormGroup;
  machine_response: any;
  shift_response: any;
  tenant: any;
  operator_response: any;
  valuesplit:any;
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

    this.service.shiftidentity(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.service.shift(res.id).subscribe(res => {
       this.shift_response=res; 
      })
    })
    this.service.operator(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
     this.operator_response=res;
    })
  }



getsplit(val){
   this.valuesplit = val;
}


loginfunc(){

    this.service.table(this.login.value,this.valuesplit).subscribe(res =>{
      console.log(res);
    })
}

ngOnDestroy(){

}
}
