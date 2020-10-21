import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OeeDashboardService } from '../../Service/app/oee-dashboard.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-oee-dashboard',
  templateUrl: './oee-dashboard.component.html',
  styleUrls: ['./oee-dashboard.component.scss']
})
export class OeeDashboardComponent implements OnInit {
machine:any;
myLoader= false;
  reason: any;
  startDate:any;
    status: string;
    lock:any; 
login:FormGroup;
liveoee;
  machine_class: any;
  machine_response:any;
  getshift:any;
  reportList:boolean;
  get_report:any;
  loger:any;
  shift_response:any;
  newmachine:any;
  constructor(private route:ActivatedRoute,private service:OeeDashboardService,private fb:FormBuilder) {
   console.log(localStorage.getItem('machine_name'))
    let name = localStorage.getItem('machine_name');
this.newmachine=localStorage.getItem('machine')
this.myLoader= true;
this.machine = this.route.snapshot.queryParamMap.get('machine_name');

console.log(this.machine)
if(this.machine){
 this.myLoader = false;
localStorage.setItem('machine_name',this.machine);
     this.myLoader= true;
     this.service.live(this.machine).subscribe(res =>{
     console.log(res);
    this.myLoader= false;
     this.liveoee = res;
     }) 
}
else{
 this.service.live(this.newmachine).subscribe(res =>{
     console.log(res);
    this.myLoader= false;
     this.liveoee = res;
     }) }

   }

  ngOnInit() {
      



    this.machine_class= localStorage.getItem('machine');
     console.log(this.machine_class)
     this.reason = localStorage.getItem('reason');
     let machine = localStorage.getItem('machine_name')
     console.log(machine)

    this.login = this.fb.group({
      
      shift_num: [""],
      date: [""],
    })
    this.myLoader= true;
    this.service.getmachines().subscribe(res => {
      this.machine_response = res;
      this.myLoader= false;
      this.login.patchValue({
        machine_name: this.machine_response[0],
      })
      this.service.getshift().subscribe(res => {
        this.shift_response = res;
       
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

select_shift(shift){


  this.login.value.shift_num= shift;
}   
    
logintest(val){

  this.myLoader = true;
  let name = localStorage.getItem('machine_name');
  console.log(val)
  let register = {
        "machine":name,
        "shift_num": this.login.value.shift_num,
        "date": this.login.value.date
      }
     console.log(register);
     this.myLoader= true;
  this.service.overall_report(register).subscribe(res => {
  this.myLoader = false;
  this.get_report = res;
  this.reportList = true;

  
      })
}
}
