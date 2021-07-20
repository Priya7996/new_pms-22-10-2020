import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import * as Highcharts from 'highcharts';
import { CycleTimeService } from '../../Service/app/cycle-time.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { untilDestroyed } from 'ngx-take-until-destroy';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { analyzeAndValidateNgModules } from '@angular/compiler';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/annotations')(Highcharts);


@Component({ 
  selector: 'app-cycle-time-chart',
  templateUrl: './cycle-time-chart.component.html',
  styleUrls: ['./cycle-time-chart.component.scss']
})
export class CycleTimeChartComponent implements OnInit {
  startDate :any;
  parts = [];
   sec: any;
   shiftpatch:any;
  c_time  = [];
  pro_number :any;
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
  // acc:any[];
  machineName:any;
  machineID:any;
  shiftNo:any;
  SHIFT_ID:any;
  SHIFT_NUM:any;
  date:any;
  cycle_machine_status: any;
  runarry: any[];
  hourwisemachine: any;
  noarry: any[];
  stoparry: any[];
  idlearry: any[];
  runarry1: any[];
  idlearry1: any[];
  stoparry1: any[];
  noarry1: any[];
  hourutilization: any;
  noarryul1: any[];
  stoparryul1: any[];
  idlearryul1: any[];
  runarryul1: any[];
  runarryul: any[];
  idlearryul: any[];
  stoparryul: any[];
  noarryul: any[];
  ShiftNo: any;
  diffparts: {};
  hour_parts: any;

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
        this.shiftNo = this.currentstatus.shift_id;
        this.shiftpatch = this.currentstatus.shift_no;
        this.SHIFT_ID = this.currentstatus.shift_id;
        this.SHIFT_NUM = this.currentstatus.shift_no;

        console.log(this.SHIFT_ID)
        console.log(this.SHIFT_NUM)

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
          shift_id: this.SHIFT_NUM,
          date: this.currentstatus.date
        });
         this.tableview()
      })
    })

    this.service.shiftidentity(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      this.service.shift(res.id).subscribe(res => {
        this.shift_response = res;
        
      })
    })
  }


  
  getmachine(machine,id){
  this.machineName = machine;
  this.machineID = id;
  }
  getshift(shiftID,shift_nom){
  this.shiftNo = shiftID;  
  this.shiftpatch = shift_nom;
  this.SHIFT_ID = shiftID;
  this.SHIFT_NUM = shift_nom;
  console.log(this.SHIFT_ID);
  console.log(this.SHIFT_NUM);


  }

  
  chart1(){
    this.parts = [];
    this.c_time = [];
    this.pro_number = [];

for (var i in this.allcycletime) {
  var run = parseFloat(i)
var part = run * 1 + 1;
this.parts.push(part);

var cycle1 = this.secondsToMinutes(this.allcycletime[i].cycle_time);
var cycle = parseFloat(cycle1);

var pro_number = this.allcycletime[i].program_number;
this.c_time.push(cycle);
this.pro_number.push(pro_number);
var ShiftNo = this.allcycletime[i].shift_no;
var Time = this.allcycletime[i].time;
}

var arr = this.pro_number
var uniqs = arr.reduce((acc, val) => {
acc[val] = acc[val] === undefined ? 1 : acc[val] += 1;
return acc;
}, {});
this.diffparts = uniqs;


      this.chartOptions = {
        chart: {
          type: 'column',           
          zoomType: 'xy',

          
        
          style: {
            fontFamily: 'Rubik, sans-serif'
          }
        },
        title: {
          text: 'Cycle Time Chart(Mins)'
        },
        subtitle: {
          // text: 'Machine ID : '+ this.macname['machine_name']+',Shift:'+ res.shift_no+' Date : 04-02-20 ',
          text: 'Machine Name : ' + this.machineName + ', Date : ' +this.date + ',Shift :'  + this.shiftpatch + ',Time : ' + '' ,
          // + ', PartsCount:' + '' + ',Program No : ' + ''
          style: {
            fontSize: '16px',
            color: '#f58632',
            fill: '#f58632'
          }
        },
        xAxis: {
          categories: (this.parts),
          title: {
            text: 'Parts Count'
          }
        },
        yAxis: {
          min: 0,
          title: {
              text: 'Time(min)'
          },
          stackLabels: {
              enabled: true,
              style: {
                  fontWeight: 'bold',
                  // color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
              }
          }
      },
      tooltip: {
              formatter: function() {
                  return 'Parts count : <b>' + this.x + '</b>, Time <b>' + this.y + ' min </b>';

          }
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      credits: {
          enabled: false
      },
      colors: ['#f58632'],
      series: [{
          name: 'Parts Count',
          data: this.c_time,
          dataLabels: {
              enabled: true,
              color: '#292b2c',
              align: 'center',
              valueDecimals: 2,
              format: '{point.y:.2f}', 
              y: 0,
              style: {
                  fontSize: '10px',
                  fontWeight: 'normal',
              }
          },
      }]
      }
     



  }
  chart2(){
    this.chartOptions2 = {
      chart: {
        type: 'column',
        zoomType: 'xy',

        style: {
          fontFamily: 'Rubik, sans-serif'
        }
      },
      title: {
        text: 'Hour Wise Parts Count Chart(Nos)'
      },
      subtitle: {
        text: 'Machine Name : ' + this.machineName + ', Date : ' +this.date + ',Shift :'  + this.shiftpatch + ',Time : ' + '',

        style: {
          fontSize: '16px',
          color: '#f58632',
          fill: '#f58632'
        }
      },
      xAxis: {
        categories: this.hour_parts.time,
        title: {
          text: 'Time(hour)'
        }
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Parts Count'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold'            }
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
    credits: {
        enabled: false
    },
    colors: ['#939496'],
    series: [{
        name: 'Parts Count',
        data: this.hour_parts.parts_count

    }]
    }
  }
  chart3(){
    this.runarry = [];
    this.idlearry = [];
    this.stoparry = [];
    this.noarry = [];
   this.shiftNo = this.hourwisemachine.shift_no;

    for (var data in this.hourwisemachine.run_time) {
        var run = this.hourwisemachine.run_time[data] / 1;
        this.runarry.push(run);
        var idle = this.hourwisemachine.idle_time[data] / 1;
        this.idlearry.push(idle);
        var stop = this.hourwisemachine.stop_time[data] / 1;
        this.stoparry.push(stop);
        var nodata = this.hourwisemachine.no_data[data] / 1;
        this.noarry.push(nodata);
    }
   

    for (var i in this.runarry) {
        var num1 = this.runarry[i];
        var num2 = this.idlearry[i];
        var num3 = this.stoparry[i];

        if (num1 >= num2 && num1 >= num3) {
            if(this.noarry[i] < 600){ 
            this.runarry[i] += this.noarry[i];
            this.noarry[i]=0;
            }
        } else if (num2 >= num1 && num2 >= num3) {
            if(this.noarry[i] < 600){ 
            this.idlearry[i] += this.noarry[i];
            this.noarry[i]=0;
            }
        } else if (num3 >= num1 && num3 >= num1) {
            if(this.noarry[i] < 600){ 
            this.stoparry[i] += this.noarry[i];
            this.noarry[i]=0;
            }
        }

        if (num1 == 0 && num2 == 0 && num3 == 0) {
            this.runarry[i] = 0;
            this.idlearry[i] = 0;
            this.stoparry[i] = 0;
        }
    }
  
    this.runarry1 = [];
    this.idlearry1 = [];
    this.stoparry1 = [];
    this.noarry1 = [];
    for (var data in this.runarry) {
        var run = parseFloat(this.secondsToMinutes(this.runarry[data])) ;
        this.runarry1.push(run);
        var idle = parseFloat(this.secondsToMinutes(this.idlearry[data]));
        this.idlearry1.push(idle);
        var stop = parseFloat(this.secondsToMinutes(this.stoparry[data]));
        this.stoparry1.push(stop);
        var nodata = parseFloat(this.secondsToMinutes(this.noarry[data]));
        this.noarry1.push(nodata);
      
    }
    this.chartOptions3 = {
      chart: {
        type: 'bar',
        zoomType: 'xy',

      },
      title: {
        text: ' Machine Status Chart'
      },
      subtitle: {
        text: 'Machine Name : ' + this.machineName + ', Date : ' +this.date + ',Shift :'  + this.shiftpatch + ',Time : ' + '' ,

        style: {
          fontSize: '16px',
          color: '#f58632',
          fill: '#f58632'
        }
      },
      xAxis: {
        categories: this.hourwisemachine.time.reverse(),

        title: {
          text: 'Time(Hour)'
        }
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Time(min)'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
            },
            formatter: function () {
                return Math.ceil(this.total) + 'm';
            }
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,
                format: '{point.y:.0f}', 
                valueDecimals: 2
            }
        }

    },
    colors: ['#292b2c','#ec5550', '#e8a249', '#2cbe63'],
    credits: {
        enabled: false
    },
    series: [
        {
            name: 'Nodata',
            data: this.noarry1.reverse()
        },
        {
            name: 'Stop',
            data: this.stoparry1.reverse()
        }, {
            name: 'Idle',
            data: this.idlearry1.reverse()
        }, {
            name: 'Run',
            data: this.runarry1.reverse()
        }
    ]
    }


  }
  chart4(){
    this.runarryul = [];
    this.idlearryul = [];
    this.stoparryul = [];
    this.noarryul = [];
    this.ShiftNo = this.hourutilization.shift_no

    for (var data in this.hourutilization.run_time) {
        var run = this.hourutilization.run_time[data] ;
        this.runarryul.push(run);
        var idle = this.hourutilization.idle_time[data] ;
        this.idlearryul.push(idle);
        var stop = this.hourutilization.stop_time[data] ;
        this.stoparryul.push(stop);
        var nodata = this.hourutilization.no_data[data];
        this.noarryul.push(nodata);
    }



    for (var i in this.runarryul) {
        var num1 = this.runarryul[i];
        var num2 = this.idlearryul[i];
        var num3 = this.stoparryul[i];

        if (num1 >= num2 && num1 >= num3) {
            if(this.noarryul[i] < 600){ 
                this.runarryul[i] += this.noarryul[i];
                this.noarryul[i]=0;
                }
           
        } else if (num2 >= num1 && num2 >= num3) {
            
            if(this.noarryul[i] < 600){ 
                this.idlearryul[i] += this.noarryul[i];
                this.noarryul[i]=0;
                }
        } else if (num3 >= num1 && num3 >= num1) {
           
            if(this.noarryul[i] < 600){ 
                this.stoparryul[i] += this.noarryul[i];
                this.noarryul[i]=0;
                }
        }

        if (num1 == 0 && num2 == 0 && num3 == 0) {
            this.runarryul[i] = 0;
            this.idlearryul[i] = 0;
            this.stoparryul[i] = 0;
        }
    }


    this.runarryul1 = [];
    this.idlearryul1 = [];
    this.stoparryul1 = [];
    this.noarryul1 = [];
    for (var data in this.runarryul) {
      let rundata = this.secondsToMinutes(this.runarryul[data] * 100 / 60)
        let  run = parseFloat(rundata);
        this.runarryul1.push(run);
        let runidle = this.secondsToMinutes(this.idlearryul[data] * 100 / 60)
        let idle = parseFloat(runidle);
        this.idlearryul1.push(idle);
        let stopdata = this.secondsToMinutes(this.stoparryul[data] * 100 / 60)
        let stop = parseFloat(stopdata);
        this.stoparryul1.push(stop);
        let no_data = this.secondsToMinutes(this.noarry[data] * 100 / 60)
        let nodata = parseFloat(no_data);
        this.noarry1.push(nodata);
      
    }
    this.chartOptions4 = {
      chart: {
        type: 'bar',
        zoomType: 'xy',

      },
      title: {
        text: 'Machine Status With Utilization(%) Chart'
      },
      subtitle: {
        text: 'Machine Name : ' + this.machineName + ', Date : ' +this.date + ',Shift :'  + this.shiftpatch + ',Time : ' + '' ,
        // + ', PartsCount:' + '' + ',Program No : ' + ''
        style: {
          color: "#f58632",
          fontSize: "16px"
      }
      },
      xAxis: {
        categories: this.hourutilization.time.reverse(),
        title: {
          text: 'Time(Hour)'
        }
      },
      yAxis: {
        min: 0,
        title: {
            text: 'Percentage(%)'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
            },
            formatter: function () {
              
                if(this.total >= 98 ){
                    this.total = 100;                       
                } 
               
                return Math.ceil(this.total) + '%';
            }
        }

    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,
                format: '{point.y:.0f} %', 
                valueDecimals: 2 
            }
        }

    },
    colors: ['#292b2c','#ec5550', '#e8a249', '#2cbe63'],
    credits: {
        enabled: false
    },
    series: [
        {
            name: 'Nodata',
            data: this.noarryul1.reverse()
        },
        {
        name: 'Stop',
        data: this.stoparryul1.reverse()
    }, {
        name: 'idle',
        data: this.idlearryul1.reverse()
    }, {
        name: 'Run',
        data: this.runarryul1.reverse()
    }]
    }

  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
  }
  tableview() {

    this.date = this.datePipe.transform(this.date,'MM-dd-yyyy');
    console.log(this.date);
    let register = { 'machine_id': this.machineID, 'shift_id': this.SHIFT_ID, 'date': this.date, 'tenant_id':this.tenant }
    console.log(register);
    this.myLoader=true;
    this.service.all_time_chart(register).pipe(untilDestroyed(this)).subscribe(res => {
      this.myLoader=false;
      this.allcycletime = res;
      console.log(res.cycle_time);
      this.tablelist = true;
      this.chart1()
    })
    this.service.hour_parts_count(register).pipe(untilDestroyed(this)).subscribe(res => {
      this.myLoader=false;
      this.hour_parts =res;
      this.chart2()
    })
    
    this.service.shift_machine_status(register).pipe(untilDestroyed(this)).subscribe(res => {
      this.hourwisemachine =res;
      this.myLoader=false;
      this.chart3();
    })
    this.service.hour_machine_utilization(register).pipe(untilDestroyed(this)).subscribe(res => {
      this.hourutilization = res;
      this.myLoader=false;
      this.chart4();
    })
  }
 
    
   
  

  ngOnDestroy(){

  }

}
