import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import * as Highcharts from 'highcharts';
import { CycleTimeService } from '../../Service/app/cycle-time.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/annotations')(Highcharts);


@Component({ 
  selector: 'app-cycle-time-chart',
  templateUrl: './cycle-time-chart.component.html',
  styleUrls: ['./cycle-time-chart.component.scss']
})
export class CycleTimeChartComponent implements OnInit {
  startDate = new Date(2020, 0, 1);
  parts = [];
   sec: any;

  c_time  = [];
 pro_number :[]= [];
  Highcharts = Highcharts;
  chartOptions2: any;
  chartOptions4: any;
  chartOptions3: any;
  chartOptions: any;
  macname: any;
  allcycletime:any []= [];
  myLoader1 = false
 tenant: any;
  machine_response: any;
  shift_response: any;
   table: FormGroup;
  tablelist: boolean;
  showdate: any;
  myLoader = false;
  currentstatus:any;
  myLoader2 = false;
  myLoader3 = false;

  machineName:any;
  machineID:any;
  shiftNo:any;
  date:any;

   secondsToMinutes(time) {
    let min = Math.floor(time / 60);
   this.sec = Math.floor(time % 60);
    if (this.sec.toString().length == 1) {
    this.sec = '0' + this.sec;
    }
    return min + '.' + this.sec;
}
  constructor(private datePipe:DatePipe,private nav: NavbarService, private service: CycleTimeService, private fb: FormBuilder) {
    this.nav.show();
    this.tenant = localStorage.getItem('tenant_id');
  }


  ngOnInit() {
    this.table = this.fb.group({
      machine_id: ["", Validators.required],
      shift_id: ["", Validators.required],
      date: ["", Validators.required]
    })

    this.service.machine(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      this.machine_response = res;
      this.service.current_status(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
        this.currentstatus=res; 
        this.shiftNo = this.currentstatus.shift_no;
        console.log(this.shiftNo)
        this.machineID = this.currentstatus.machine;
        this.date = this.currentstatus.date;
       for(let i=0; i<this.machine_response.length; i++){
         if(this.currentstatus["machine"] == this.machine_response[i].id){
           this.machineName = this.machine_response[i].machine_name
          this.table.patchValue({
            machine_id: this.machine_response[i].machine_name,
          })
         }
       }
        this.table.patchValue({
          shift_id: this.shiftNo,
          date: this.currentstatus.date
        });
         this.tableview()
      })
    })

    // this.service.shift(this.tenant).subscribe(res => {
    //   this.shift_response=res;
    //   this.service.shifttransaction(this.shift_response.id).subscribe(res =>{
    //   })

    this.service.shiftidentity(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      this.service.shift(res.id).subscribe(res => {
        this.shift_response = res;
        
      })
    })
  }


  
  getmachine(machine,id){
  this.machineName = machine;
  this.machineID = id;
  // this.tableview()
  }
  getshift(shift){
    console.log(shift)
  this.shiftNo = shift;
  // this.tableview()
  }

  
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
    console.log(this.date)
  }
  tableview() {

    this.date = this.datePipe.transform(this.date,);
    console.log(this.date)

    let register = { 'machine_id': this.machineID, 'shift_id': this.shiftNo, 'date': this.date, 'tenant_id':this.tenant }
    this.myLoader=true;
    this.service.all_time_chart(register).pipe(untilDestroyed(this)).subscribe(res => {
      this.myLoader=false;
    
      this.allcycletime = res;
      console.log(this.allcycletime)

      for(let i = 0; i < this.allcycletime.length; i++){ 
        let part = i * 1 + 1;
        this.parts.push(part);
                
       let cycle1 = this.secondsToMinutes(this.allcycletime[i].cycle_time);
       let cycle = parseFloat(cycle1);
       console.log(this.allcycletime)
       let pro_number = this.allcycletime[i].program_number;
       this.c_time.push(cycle);
        
    }


    
  //   for (var i in $scope.allcycletime) {
  //     var part = i * 1 + 1;
  //     $scope.parts.push(part);

  
  //     var pro_number = $scope.allcycletime[i].program_number;
  //     $scope.c_time.push(cycle);
  //     $scope.pro_number.push(pro_number);
  //     var ShiftNo = $scope.allcycletime[i].shift_no;
  //     var Time = $scope.allcycletime[i].time;
  // }

  

      this.chartOptions = {
        chart: {
          type: 'column',           
          zoomType: 'xy',

          
        
          style: {
            fontFamily: 'roboto'
          }
        },
        title: {
          text: 'Cycle Time Chart(Mins)'
        },
        subtitle: {
          // text: 'Machine ID : '+ this.macname['machine_name']+',Shift:'+ res.shift_no+' Date : 04-02-20 ',
          text: 'Machine Name : ' + this.machineName + ', Date : ' +this.date + ',Shift :'  + this.shiftNo + ',Time : ' + '' + ', PartsCount:' + '' + ',Program No : ' + '',
          style: {
            fontSize: '16px',
            color: '#f58632',
            fill: '#f58632'
          }
        },
        xAxis: {
          categories: this.parts,
          title: {
            text: 'Parts Count'
          }
        },
        yAxis: {
          allowDecimals: false,
          title: {
            text: 'Time(min)',
            align: 'middle'
          },
          labels: {
            overflow: 'justify'
          }
        },
        exporting: {
          enabled: true
      },
        navigation: {
          buttonOptions: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true
            }
          },
        },

        credits: {
          enabled: false
        },
      
        colors: ['#f58632', '#f58632', '#f58632', '#f58632'],
        series: [{
          name: 'Parts Count',
          data: this.c_time,
          // data: [res.parts_count],[res.cycle_time]
        }],

        legend: {
          layout: 'vertical',
          align: 'right',
          itemMarginBottom: 7,
          verticalAlign: 'top'
        }
      }
      this.tablelist = true;
    })



    //  this.service.shift_machine_utilization(register).subscribe(res =>{
    //    console.log(res);
    //  })
    this.myLoader=true;

    this.service.hour_parts_count(register).pipe(untilDestroyed(this)).subscribe(res => {
      // console.log(res);
      this.myLoader=false;

      this.chartOptions2 = {
        chart: {
          type: 'column',
          zoomType: 'xy',

          style: {
            fontFamily: 'roboto'
          }
        },
        title: {
          text: 'Hour Wise Parts Count Chart(Nos)'
        },
        subtitle: {
          text: 'Machine Name : ' + this.machineName + ', Date : ' +this.date + ',Shift :'  + this.shiftNo + ',Time : ' + '' + ', PartsCount:' + '' + ',Program No : ' + '',

          style: {
            fontSize: '16px',
            color: '#f58632',
            fill: '#f58632'
          }
        },
        xAxis: {
          categories: res.time,
          title: {
            text: 'Time(hour)'
          }
        },
        yAxis: {

          allowDecimals: false,
          title: {
            text: 'Parts Count',

            align: 'middle'
          },
          labels: {
            overflow: 'justify'
          }
        },
        tooltip: {
          //valueSuffix: ' certificates'
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true
            }
          },
        },

        credits: {
          enabled: false
        },
        colors: ['#939496', '#939496', '#939496', '#939496'],
        series: [{
          data: res.parts_count
        }],
        navigation: {
          buttonOptions: {
            enabled: true
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          itemMarginBottom: 7,
          verticalAlign: 'top'
        }
      }
    })
    this.myLoader=true;
    this.service.shift_machine_status(register).pipe(untilDestroyed(this)).subscribe(res => {
      // console.log(res);
      this.myLoader=false;

      this.chartOptions3 = {
        chart: {
          type: 'bar',
          zoomType: 'xy',

        },
        title: {
          text: ' Machine Status Chart'
        },
        subtitle: {
          text: 'Machine Name : ' + this.machineName + ', Date : ' +this.date + ',Shift :'  + this.shiftNo + ',Time : ' + '' + ', PartsCount:' + '' + ',Program No : ' + '',

          style: {
            fontSize: '16px',
            color: '#f58632',
            fill: '#f58632'
          }
        },
        xAxis: {
          categories: res.time,

          title: {
            text: 'Time(Hour)'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Time(min)'
          }
        },
        legend: {
          reversed: true
        },
        plotOptions: {
          series: {
            stacking: 'normal'
          }
        },
        series: [{
          name: 'Run',
          data: res.run_time.map(Number),
          color: '#2cbe63'
        }, {
          name: 'Idle',
          data: res.idle_time.map(Number),
          color: '#e8a249'
        }, {
          name: 'Stop',
          data: res.stop_time.map(Number),
          color: '#ec5550'
        }, {
          name: 'No data',
          data: res.no_data.map(Number),
          color: '#292b2c'
        }],
        navigation: {
          buttonOptions: {
            enabled: true
          }
        },
        credits: {
          enabled: false
        },
      }
    })
    this.myLoader=true;

    this.service.hour_machine_utilization(register).pipe(untilDestroyed(this)).subscribe(res => {
      // console.log(res);
      this.myLoader=false;

      this.chartOptions4 = {
        chart: {
          type: 'bar',
          zoomType: 'xy',

        },
        title: {
          text: 'Machine Status With Utilization(%) Chart'
        },
        subtitle: {
          text: 'Machine Name : ' + this.machineName + ', Date : ' +this.date + ',Shift :'  + this.shiftNo + ',Time : ' + '' + ', PartsCount:' + '' + ',Program No : ' + '',

          style: {
            fontSize: '16px',
            color: '#f58632',
            fill: '#f58632'
          }
        },
        xAxis: {
          categories: res.time,
          title: {
            text: 'Time(Hour)'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Percentage(%)'
          }
        },
        legend: {
          reversed: true
        },
        plotOptions: {
          series: {
            stacking: 'normal'
          }
        },
        series: [{
          name: 'Run',
          data: res.run_time,
          color: '#2cbe63'
        }, {
          name: 'Idle',
          data: res.idle_time,
          color: '#e8a249'
        }, {
          name: 'Stop',
          data: res.stop_time,
          color: '#ec5550'
        }, {
          name: 'No data',
          data: res.no_data,
          color: '#292b2c'
        }],
        navigation: {
          buttonOptions: {
            enabled: true
          }
        },
        credits: {
          enabled: false
        },
      }
    })
  }

  ngOnDestroy(){

  }

}
