import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductionService } from '../../Service/app/production.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit {
    startDate = new Date(2020, 0, 1);

  // animal: string;
  // name: string;
  type: any;
  myLoader = false;

  
  machine_response: any;
  shift_response: any;
  login: FormGroup;
  get_report: any;
  first_loading: any;
  status: string;
  new_date: string;
  new_date1: any;
  accept:any;
  marvel:any;
  reject:any;
  last:any;
  constructor(private datepipe: DatePipe, private service: ProductionService,  private fb: FormBuilder) {

    console.log(localStorage.getItem('machine_name'))
    let name = localStorage.getItem('machine_name');

    this.marvel = localStorage.getItem('machine_name');
    console.log(this.marvel)
    this.service.namakkal(this.marvel).subscribe(res =>{ 
    console.log(res)
    this.last = res;
    })
    
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewDialog, {
  //     // width: '250px',
  //     // data: { name: this.name, animal: this.animal }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     // this.animal = result;
  //   });
  // } machine_name: ["",]

  ngOnInit() {
    this.login = this.fb.group({
      
      shift_num: [""],
      date: [""],
    })

    this.service.getmachines().subscribe(res => {
      this.machine_response = res;
      
    
      this.service.getshift().subscribe(res => {
        this.shift_response = res;
        this.login.patchValue({
          shift_num: this.shift_response.shift_no,
        })
        // this.service.first_page_loading().subscribe(res => {
        //   this.first_loading = res;
        //   this.login.patchValue({
        //     date : [this.first_loading['from_date'],this.first_loading['to_date']]
        //   })
          // this.minDate = this.first_loading['from_date']
          // this.maxDate = this.first_loading['to_date']
          // this.logintest('true');
        })
      })
    
  }
 
  logintest(s) {
    this.status = s;
    this.myLoader = true;
    let name = localStorage.getItem('machine_name');
    console.log(name)
    console.log(localStorage.getItem('machine'))
    // this.maxDate = this.datepipe.transform(this.maxDate);
    // console.log(this.minDate)
    console.log(this.login.value)
    if (this.status == 'true') {
      // this.new_date = new DatePipe('en-US').transform(this.login.value.date[0], 'MM/dd/yyyy');
      // this.new_date1 = new DatePipe('en-US').transform(this.login.value.date[1], 'MM/dd/yyyy');
      let register = {
        "machine":name,
        "shift_num": this.login.value.shift_num,
        "date": this.login.value.date
      }
 

      this.service.overall_report(register).subscribe(res => {
        this.myLoader = false;
        this.get_report = res;
        console.log(res.shift_id.$oid)
         console.log(res.l0_setting_id.$oid)
      })
    }
  }
  accept_count(id){
    this.accept = 1;
    this.reject = 0;
    console.log(id,this.accept,this.reject );
    let data = {'production_result_id':id,'accept_count': this.accept, 'reject_count':this.reject}

    this.service.accept(data).subscribe(res =>{
      console.log(res);
      if(res === true){
        Swal.fire("Accept Count updated successfully")
      }
      else
      {
        Swal.fire("Accept Count Failed")
      }
    })
  }
  reject_count(id){
    this.reject = 1;
    this.accept = 0;
    console.log(id,this.accept,this.reject );
    let data = {'production_result_id':id,'reject_count':this.reject,'accept_count': this.accept, }

    this.service.reject(data).subscribe(res =>{
      console.log(res);
      if(res === true){
        Swal.fire("Reject Count updated successfully")
      }
      else
      {
        Swal.fire("Reject Count Failed")
      }
    })
  }

}
