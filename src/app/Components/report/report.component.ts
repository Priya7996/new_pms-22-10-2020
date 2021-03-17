import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { ReportService} from '../../Service/app/report.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  type:any;
  new_date:any;
  docku:any;
  new_date1:any;
  startDate:any;
  endDate:any;
  report_response: any;
  tenant: any;
  myLoader = false;
  shift_response: any;
  operator_response: any;
  selecttype:any;
  show:any;
   export_excel: any[] = [];
  login: FormGroup;
  displayedColumns: string[] = ['position','date', 'shift_no', 'time', 'operator_name','operator_id','machine_name','machine_type','program_number','job_description','parts_produced','cycle_time','cutting_time','spendle_speed','feed_rate','actual_running','idle_time','total_downtime','actual_working_hours','actual_working_hours1','utilization','spindle_load','spindle_m_temp','servo_load','servo_m_temp','puls_code'];
  dataSource = new  MatTableDataSource();
  displayedColumns1: string[] = ['position','date', 'machine_name', 'machine_type', 'utilization'];
  dataSource1 = new  MatTableDataSource();
  list_data:any;
  listin_data:any;
  reports: unknown[];
  drop_value:any;
  split:any;
  types:any;
  selectsplit:any;
  wise:any;
  operator_id: any;
  ShiftID: any;
  hourtype: any;
  programNo: any;
  constructor(private datepipe: DatePipe,private nav:NavbarService,private service:ReportService,private fb:FormBuilder, ) {
    this.nav.show();

   }


  ngOnInit() {

    this.tenant=localStorage.getItem('tenant_id')

    this.login = this.fb.group({
      machine_id:["",Validators.required],
      report_split:["",Validators.required],

      shift_id:["",Validators.required],
      operator_id:["",Validators.required],
      start_date:["",Validators.required],
      end_date:["",Validators.required],
      report_type:["",Validators.required]
    })
    
    this.service.tenant_id(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      this.report_response=res;
    });

      
      this.service.shiftidentity(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
        this.service.shift(res.id).subscribe(res => {
         this.shift_response=res; 
        })
      })
       
        
      this.service.operator(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
       this.operator_response=res;
      })


      this.service.cnc_jobs(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{

      })

      this.service.data(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
        this.selecttype = res.data;

      })

  }

  getmachine(value){
    this.show = value;
    this.service.report(value,this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.split = res.data;
    })
   

  
  }
  getresult(valu){
    this.docku = valu;

  }
 
  reporttable(){
    if(this.login.value.report_type === 'Datewise Utilization'){
      this.new_date = new DatePipe('en-US').transform(this.login.value.start_date, 'dd-MM-yyyy');
      this.new_date1 = new DatePipe('en-US').transform(this.login.value.end_date, 'dd-MM-yyyy');
      this.service.table(this.login.value,this.new_date,this.new_date1,this.show,this.tenant,this.docku).subscribe(res =>{
        this.listin_data = res;
        this.dataSource1 = new MatTableDataSource(this.listin_data);
  
      })
    }

    else if(this.login.value.report_type === 'Monthwise Utilization'){
      this.new_date = new DatePipe('en-US').transform(this.login.value.start_date, 'dd-MM-yyyy');
      this.new_date1 = new DatePipe('en-US').transform(this.login.value.end_date, 'dd-MM-yyyy');
      this.service.table(this.login.value,this.new_date,this.new_date1,this.show,this.tenant,this.docku).subscribe(res =>{
        this.listin_data = res;
        this.dataSource1 = new MatTableDataSource(this.listin_data);
  
      })
    }
    else{
    this.new_date = new DatePipe('en-US').transform(this.login.value.start_date, 'dd-MM-yyyy');
    this.new_date1 = new DatePipe('en-US').transform(this.login.value.end_date, 'dd-MM-yyyy');
    this.service.table(this.login.value,this.new_date,this.new_date1,this.show,this.tenant,this.docku).subscribe(res =>{
      this.list_data = res;
      this.dataSource = new MatTableDataSource(this.list_data);

    })
    
  
  }
  

  }
  check(value){
    
  }
  
  ngOnDestroy(){

  }
  
  
}
