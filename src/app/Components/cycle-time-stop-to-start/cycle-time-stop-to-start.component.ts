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
    startDate = new Date(2020, 0, 1);

    Highcharts = Highcharts;
  chartOptions:any;
  myLoader = false;
  date:any;
  login:FormGroup;
    machine_response: any;
    shift_response: any;
    tenant: any;
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
        console.log(res);
        this.machine_response=res;
        console.log(localStorage.getItem('token'));})
      
       
        this.service.shiftidentity(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
            console.log(res);
            this.service.shift(res.id).pipe(untilDestroyed(this)).subscribe(res => {
             console.log(res);
             this.shift_response=res; 
             console.log(localStorage.getItem('token'));})
          })
          this.service.current_status(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
            console.log(res);
          })
  }
  cycle_time_stop(){
      
    this.date = this.datePipe.transform(this.login.value.date);
    console.log(this.date)

      console.log(this.login.value);
      let register = this.login.value;
      register.tenant_id = this.tenant;
      console.log(register);
      this.myLoader = true;
      this.service.cycle_time_stop(register).pipe(untilDestroyed(this)).subscribe(res => {
        console.log(res);
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
            //   text: 'Machine Name : SBE/TC/BA/M-M123(E), Shift : 2, Date : 04-02-2020',
              text: 'Machine ID : '+ this.login.value.machine_id+',Shift No:'+ this.login.value.shift_id+' Date :'+this.date+',',

              style: {
                fontSize: '16px',
                color: '#f58632',
                fill: '#f58632'
             }
          },
          xAxis: {
              categories: res.length,
              title: {
                  text: 'Parts Count'
              }
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Time(Min)',
                  align: 'middle'
              },
              labels: {
                  overflow: 'justify'
              }
          },
          tooltip: {
              valueSuffix: ' Min'
          },
          plotOptions: {
              bar: {
                  dataLabels: {
                      enabled: true
                  }
              }
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'top',
              x: -40,
              y: 10,
              floating: true,
              borderWidth: 1,
              backgroundColor:
                  Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
              shadow: true
          },
          navigation: {
            buttonOptions: {
                enabled: true
            }
        },
        
        
          colors: ['#ec5550', '#ec5550', '#ec5550', '#ec5550'],
          series: [{
              name: 'Time',
               data:res          
            }]
          }
  })
}
ngOnDestroy(){

}
}
