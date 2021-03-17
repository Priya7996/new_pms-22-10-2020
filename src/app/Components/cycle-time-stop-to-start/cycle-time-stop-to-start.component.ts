import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import * as Highcharts from 'highcharts';
import { CycleStopService} from '../../Service/app/cycle-stop.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cycle-time-stop-to-start',
  templateUrl: './cycle-time-stop-to-start.component.html',
  styleUrls: ['./cycle-time-stop-to-start.component.scss']
})
export class CycleTimeStopToStartComponent implements OnInit {
    startDate :any;

    Highcharts = Highcharts;
  chartOptions:any;
  myLoader = false;
  date:any;
  login:FormGroup;
    machine_response: any;
    shift_response: any;
    tenant: any;
  starttostart: any;
  timestart: any[];
  countstart: any[];
  sec: any;
  secondsToMinutes(time) {
    let min = Math.floor(time / 60);
   this.sec = Math.floor(time % 60);
    if (this.sec.toString().length == 1) {
    this.sec = '0' + this.sec;
    }
    return min + '.' + this.sec;
}
  constructor(private datePipe:DatePipe,private nav:NavbarService,private service:CycleStopService,private fb:FormBuilder) {
    this.nav.show();
    this.tenant = localStorage.getItem('tenant_id')
   }

  ngOnInit() {
      this.login = this .fb .group({
          machine_id:["",Validators.required],
          shift_id:['',Validators.required],
          date:["",Validators.required]
      })
      this.service.machine( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
        this.machine_response=res;
      })
    
        this.service.shiftidentity(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
            this.service.shift(res.id).pipe(untilDestroyed(this)).subscribe(res => {
             this.shift_response=res; 
            })
          })
          this.service.current_status(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
          })
           // gokul 11-11 after work
      // this.service.machine( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      //   this.machine_response=res.data;
      // })
      //   this.service.shiftidentity(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      //     this.shiftdetailfordrop = res;
      //       this.service.shift(res.id).subscribe(res => {
      //        this.shift_response=res; 
      //        this.service.current_status(this.tenant).subscribe(res =>{
      //         this.current_view_details = res;
      //         this.MachineID = this.current_view_details.machine;
      //         this.ShiftID = this.current_view_details.shift_id;
      //         this.from_date = this.current_view_details.date;
      //        // this.cycle_time_stop();
      //       })
      //       })
           
      //     })
      //-----------------  
  }
  cycle_time_stop(){
      
    this.date = this.datePipe.transform(this.login.value.date);
      let register = this.login.value;
      register.tenant_id = this.tenant;
      this.myLoader = true;
      this.service.cycle_time_stop(register).pipe(untilDestroyed(this)).subscribe(res => {
        this.starttostart = res;
        this.timestart=[];
        this.countstart=[];
        for (var data in this.starttostart) {
          var run = parseFloat(data)
          var count = run*1 + 1;
          var minutes = parseFloat(this.secondsToMinutes(this.starttostart[data]));
          this.countstart.push(count);
          this.timestart.push(minutes);

        }
        this.myLoader = false;

       this. chartOptions = {
            chart: {
              type: 'bar',
              zoomType: 'xy',
          },
          title: {
              text: 'Cycle Start to Cycle Start(Mins)'
          },
          subtitle: {
              text: 'Machine ID : '+ this.login.value.machine_id+',Shift No:'+ this.login.value.shift_id+' Date :'+this.date+',',
              style: {
                fontSize: '16px',
                color: '#f58632',
                fill: '#f58632'
             }
          },
          xAxis: {
              categories: this.countstart.reverse(),
              title: {
                  text: 'Parts Count'
              }
          },
          yAxis: {
            min: 0,
           
            title: {
                text: 'Time(Min)'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                },
                formatter: function () {
                    return this.total + 'min' ;
                }
            }

        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                pointInterval: 1,
                stacking: 'normal',
                dataLabels: {
                    valueDecimals: 2 
                }
            }

        },
        colors: ['#ec5550'],
        credits: {
            enabled: false
        },
        series: [{
            name: 'Time',
            data:  this.timestart.reverse()
        }]

          }
  })
}
ngOnDestroy(){

}
}
