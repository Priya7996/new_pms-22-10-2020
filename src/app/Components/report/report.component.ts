import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { ReportService} from '../../Service/app/report.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DatePipe } from '@angular/common';
import { ExportService } from '../shared/export.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  type:any;
  new_date:any;
  docku:any;
  pulse:any;
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
   export_excel1: any[] = [];

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
  constructor(private exportService: ExportService,private datepipe: DatePipe,private nav:NavbarService,private service:ReportService,private fb:FormBuilder, ) {
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

  export1(){
    this.myLoader = true;
    // this.alarmreport = res;
    console.log(this.listin_data)

     this.myLoader = false;
     console.log(this.listin_data);
     if(this.listin_data.length==0){
       console.log(this.listin_data)
       Swal.fire('Exporting!, No Data Found')
     }else{
     for(var i=0;i<this.listin_data.length;i++){
       this.export_excel1.push({
          "S.No": i+1,
          "Date": this.listin_data[i].date || '---',
          "Machine Id": this.listin_data[i].machine_name || '---',
          "Machine Name": this.listin_data[i].machine_type || '---',
          "Utilization(%.)": this.listin_data[i].utilization || '---',
      

 
 
       });
     }
       this.exportService.exportAsExcelFile(this.export_excel1, 'Report Details');
   }
 
  }

  export(){
    this.myLoader = true;
    // this.alarmreport = res;
    console.log(this.list_data)

     this.myLoader = false;
     console.log(this.list_data);
     if(this.list_data.length==0){
       console.log(this.list_data)
       Swal.fire('Exporting!, No Data Found')
     }else{
     for(var i=0;i<this.list_data.length;i++){
       this.export_excel.push({
          "S.No": i+1,
          "Date": this.list_data[i].date || '---',
          "Shift": this.list_data[i].shift_no || '---',
          "Time":this.list_data[i].time || '---',
          "Operator Name": this.list_data[i].operator_name || '---',
          "Operator Id": this.list_data[i].operator_id || '---',
          "Machine Name": this.list_data[i].machine_name || '---',
          "Machine Type": this.list_data[i].machine_type || '---',
           "Program Number": this.list_data[i].program_number || '---',
           "Job Description": this.list_data[i].job_description || '---',
           "Parts Produced": this.list_data[i].parts_produced || '---',
           "Cycle Time(H:M:S)": this.list_data[i].cycle_time || '---',
           "Cutting Time(H:M:S)": this.list_data[i].cutting_time || '---',
           "Spindle Speed(R.P.M)": this.list_data[i].spendle_speed || '---',
           "Feed(mm/min)": this.list_data[i].feed_rate || '---',
           "Run Time(Hrs)": this.list_data[i].actual_running || '---',
           "Idle Time(Hrs)": this.list_data[i].idle_time || '---',
           "Stop Time(Hrs)": this.list_data[i].total_downtime || '---',
           "Total(Hrs) Run + Idle + Stop": this.list_data[i].actual_working_hours || '---',
           "Actual Working Hours": this.list_data[i].actual_working_hours || '---',
           "Utilization(%)": this.list_data[i].utilization || '---',
           "Spindle Load(%)": this.list_data[i].spindle_load || '---',
           "Spindle Motor Temp(℃)": this.list_data[i].spindle_m_temp || '---',
           "Servo Load(%)": this.list_data[i].servo_load || '---',
           "Servo Motor Temp(℃)": this.list_data[i].servo_m_temp || '---',
           "Pulse Coder Temp(℃)": this.list_data[i].puls_code || '---',


 
 
       });
     }
       this.exportService.exportAsExcelFile(this.export_excel, 'Report Details');
   }
 
 
  }
  getmachine(value){
    this.show = value;
    this.myLoader = true;
    this.service.report(value,this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.myLoader = false;

      this.split = res.data;
    })
   

  
  }
  getresult(valu){
    this.docku = valu;
    console.log( this.docku);

  }
 
  reporttable(){
    console.log(this.login.value.report_split)
    if(this.login.value.report_type === 'Datewise Utilization'){
      this.new_date = new DatePipe('en-US').transform(this.login.value.start_date, 'dd-MM-yyyy');
      this.new_date1 = new DatePipe('en-US').transform(this.login.value.end_date, 'dd-MM-yyyy');

      this.myLoader = true;

      this.service.table(this.login.value,this.new_date,this.new_date1,this.show,this.tenant,this.docku).subscribe(res =>{
        this.myLoader = false;

        this.listin_data = res;
        this.dataSource1 = new MatTableDataSource(this.listin_data);
  
      })
    }

    else if(this.login.value.report_type === 'Monthwise Utilization'){
      this.new_date = new DatePipe('en-US').transform(this.login.value.start_date, 'dd-MM-yyyy');
      this.new_date1 = new DatePipe('en-US').transform(this.login.value.end_date, 'dd-MM-yyyy');
      this.myLoader = true;

      this.service.table(this.login.value,this.new_date,this.new_date1,this.show,this.tenant,this.docku).subscribe(res =>{
        this.myLoader = false;

        this.listin_data = res;
        this.dataSource1 = new MatTableDataSource(this.listin_data);
  
      })
    }
    else if(this.login.value.report_split === 'undefined'){
       
      alert("GODVAPMSTHANKS")
      this.new_date = new DatePipe('en-US').transform(this.login.value.start_date, 'dd-MM-yyyy');
      this.new_date1 = new DatePipe('en-US').transform(this.login.value.end_date, 'dd-MM-yyyy');
      this.myLoader = true;

      this.service.reportall(this.login.value,this.new_date,this.new_date1,this.show,this.tenant).subscribe(res =>{
        this.myLoader = false;
        console.log(res);
        this.list_data = res;
        
        this.dataSource = new MatTableDataSource(this.list_data);
  
      })
    }


    else{
    this.new_date = new DatePipe('en-US').transform(this.login.value.start_date, 'dd-MM-yyyy');
    this.new_date1 = new DatePipe('en-US').transform(this.login.value.end_date, 'dd-MM-yyyy');
    this.myLoader = true;

    this.service.table(this.login.value,this.new_date,this.new_date1,this.show,this.tenant,this.docku).subscribe(res =>{
      this.myLoader = false;

      this.list_data = res;
      this.dataSource = new MatTableDataSource(this.list_data);
      console.log(res);
      for(let i in this.list_data){
        // console.log(i)
        this.pulse = this.list_data[i].puls_code;
        // console.log(this.puls_code)  
      }

    })
    
  
  }
  

  }
  check(value){
    
  }
  
  ngOnDestroy(){

  }
  
  
}
