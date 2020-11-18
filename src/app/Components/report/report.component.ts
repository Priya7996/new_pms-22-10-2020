import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { ReportService} from '../../Service/app/report.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  type:any;
  startDate = new Date(2020, 0, 1);
  endDate = new Date(2020,0,1);
  report_response: any;
  tenant: any;
  myLoader = false;
  shift_response: any;
  operator_response: any;
  selecttype:any;
  show:any;
   export_excel: any[] = [];
  login: FormGroup;
  displayedColumns: string[] = ['date', 'shift', 'time', 'operatorname','operatorid','machineid','machinename','idleduration','idletime','reason','cycle_time','cutting_time','spindle_speed','feed','run_time','idle_time','stop_time','total','hours','utilization','load','motor','servo_load','servo_motor','pulse_code'];
  dataSource = new  MatTableDataSource();
  displayedColumns1: string[] = ['date', 'shift', 'time', 'operatorid'];
  dataSource1 = new  MatTableDataSource();

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
  constructor(private nav:NavbarService,private service:ReportService,private fb:FormBuilder, ) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id')

   }


  ngOnInit() {
    this.login = this.fb.group({
      machine_id:["",Validators.required],
      report_split:["",Validators.required],

      shift_id:["",Validators.required],
      operator_id:["",Validators.required],
      start_date:["",Validators.required],
      end_date:["",Validators.required],
      report_type:["",Validators.required]
      // report_type:["",Validators.required],
    })
    
    this.service.tenant_id(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.report_response=res;
      console.log(localStorage.getItem('token'));});

      
      this.service.shiftidentity(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
        console.log(res);
        this.service.shift(res.id).subscribe(res => {
         console.log(res);
         this.shift_response=res; 
         console.log(localStorage.getItem('token'));})
      })
       
        
      this.service.operator(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
       console.log(res);
       this.operator_response=res;
       console.log(localStorage.getItem('token'));})


      this.service.cnc_jobs(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
        console.log(res);

      })

      this.service.data(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
        console.log(res);
        this.selecttype = res.data;
        console.log(this.selecttype)

      })

  }

  getmachine(value){
    console.log(value)
    this.show = value;
    console.log(this.show)
    this.service.report(value,this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      console.log(res);
      this.split = res.data;
    })
   

    // this.wise = value;
    // console.log( this.wise)
  
  }
  export(){
    
  }
  reporttable(){
    console.log(this.login.value);
    this.service.table(this.login.value,this.show).subscribe(res =>{
      console.log(res);
    })
    
  
   
  

  }
  check(value){
    
  console.log(value)
  }
  
  ngOnDestroy(){

  }
  
  
}
