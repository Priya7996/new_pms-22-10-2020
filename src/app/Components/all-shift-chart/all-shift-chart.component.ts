import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { AllShiftChartService} from '../../Service/app/all-shift-chart.service';
import * as Highcharts from 'highcharts';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-all-shift-chart',
  templateUrl: './all-shift-chart.component.html',
  styleUrls: ['./all-shift-chart.component.scss']
})
export class AllShiftChartComponent implements OnInit {
    myLoader1= false;
    startDate :any;
    SHIFT_NUM:any;

//form data
machineName:any;
SHIFT_ID:any;
correct:any;
  // first chart
 Highcharts1 = Highcharts;
 chartOptions1: any;
 chartOptions2:any;
 shiftNo:any;
 parts = [];
 c_time = [];
 pro_number = [];
 all_cycle_resp:any;

 // second chart
 Highcharts2 = Highcharts;
 runarryul:any = [];
 idlearryul:any = [];
 stoparryul:any = [];
 noarryul:any = [];
 duration:any = [];

 runarryul1:any = [];
 idlearryul1:any = [];
 stoparryul1:any = [];
 noarryul1:any = [];
 allcycle_response:any;

 currentstatus:any;
    tenant: any;
    machine_response: any;
    shift_response: any;
    login: FormGroup;
    macname: any;
    machineID:any;
    showshift: any;
    date: any;
    constructor(private datePipe:DatePipe,private nav:NavbarService,private service:AllShiftChartService,private fb:FormBuilder) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id')

   }

  ngOnInit() {
    console.log(this.macname)
    this.login = this.fb.group({
        machine_id:["",Validators.required],
        shift_id:["",Validators.required],
        date:["",Validators.required]
    })

   
    this.service.machine( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
    console.log(res);
    this.machine_response = res;
  
        this.service.current_status(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
            this.currentstatus=res;
            this.shiftNo = this.currentstatus.shift_no;
            console.log( this.shiftNo);
            this.SHIFT_ID = this.currentstatus.shift_id;
            this.SHIFT_NUM = this.currentstatus.shift_no; 
            console.log(this.SHIFT_ID, this.SHIFT_NUM)
            this.machineID = this.currentstatus.machine;
            this.date = this.currentstatus.date;
           for(let i=0; i<this.machine_response.length; i++){
             if(this.currentstatus["machine"] == this.machine_response[i].id){
               this.machineName = this.machine_response[i].machine_name
              this.login.patchValue({
                machine_id: this.machine_response[i].machine_name,
              })
             } 
           }
            this.login.patchValue({
              shift_id: this.SHIFT_NUM,
              date: this.currentstatus.date
            });
             this.chart_view()
          })
    })
   
    
    // this.service.shift(this.tenant).subscribe(res => {
    // console.log(res);
    // this.shift_response=res; 
    // console.log(localStorage.getItem('token'));})
          
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
      
      this.SHIFT_ID = shiftID;
      this.SHIFT_NUM = shift_nom;
      console.log(this.SHIFT_ID);
      console.log(this.SHIFT_NUM);
    
    
      }

      addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        this.date = event.value;
        console.log(this.date )
      }
  
  chart_view(){

    this.date = this.datePipe.transform(this.date,'MM-dd-yyyy');
     let register = {'machine_id': this.machineID , 'shift_id': this.SHIFT_ID, 'date':this.date}
     console.log(register)
     register['tenant_id'] = this.tenant;
     this.myLoader1= true;
     this.service.shift_machine_status_chart(register).pipe(untilDestroyed(this)).subscribe(res => {
        this.myLoader1= false;

     var m = Math.floor(res.no_data % 3600 / 60);
    this.chartOptions1 = {
    chart: {
      type: 'bar',
      zoomType: 'xy',

      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25
    }

  },
  title: {
      text: 'Machine Status Chart'
  },
  subtitle: {
    text: 'Machine ID : '+ this.machineName +', Shift No:'+ this.SHIFT_NUM +' Date :'+this.date+',',
    style: {
        fontSize: '16px',
        color: '#f58632',
        fill: '#f58632'
     }
  },
  xAxis: {
      categories: res.shift_no.reverse(),
      title: {
          text: 'Shift'
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
            //   color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
          },
          formatter:  function () {
            return m + 'm';
        }

      }

  },
  tooltip: {

    formatter: function () {
        return 'Parts count : <b>' + this.x + '</b>, Time <b>' + m + ' min </b>';

    }
},

  
  legend: {
      reversed: true
  },
  navigation: {
    buttonOptions: {
        enabled: true
    }
},
credits:{
    enabled:false
},
exporting:{
    enabled:true
},
  plotOptions: {
      series: {
          stacking: 'normal'
      }
  },
//   series: [{
//     name: 'Run',
//     data: res.run_time.map(Number),
//     color: '#2cbe63'
//   }, {
//     name: 'Idle',
//     data: res.idle_time.map(Number),
//     color: '#e8a249'
//   }, {
//     name: 'Stop',
//     data: res.stop_time.map(Number),
//     color: '#ec5550'
//   }, {
//     name: 'No data',
//     data: res.no_data.map(Number),
//     color: '#292b2c'
//   }],
  series: [{
      name: 'Nodata',
      color: '#292b2c',
      data: res.no_data.map(Number),
  },
  {
    name: 'Run',
    data: res.run_time.map(Number),
    color: '#2cbe63'
  },
  {
    name: 'Stop',
    data: res.stop_time.map(Number),
    color: '#ec5550'
  },
  {
    name: 'Idle',
        data: res.idle_time.map(Number),
         color: '#e8a249',
 
      dataLabels: {
        enabled: true,
        // rotation: -90,
        color: '#292b2c',
        align: 'center',
        valueDecimals: 2,
        format: '{point.y:.2f}', 
        y: 0, // 10 pixels down from the top
        style: {
            fontSize: '10px',
            fontWeight: 'normal'
        }
    },

//   }, {
//       name: 'Idle',
//       color: '#e8a249',
//       data: res.idle_time.map(Number),
//       dataLabels: {
//         enabled: true,
//         // rotation: -90,
//         color: '#292b2c',
//         align: 'center',
//         valueDecimals: 2,
//         format: '{point.y:.2f}', // one decimal
//         y: 0, // 10 pixels down from the top
//         style: {
//             fontSize: '10px',
//             fontWeight: 'normal'
//         }
//     },

//   }, {
//       name: 'Run',
//       color: '#2cbe63',
//       data: res.run_time.map(Number),
//       dataLabels: {
//         enabled: true,
//         // rotation: -90,
//         color: '#292b2c',
//         align: 'center',
//         valueDecimals: 2,
//         format: '{point.y:.2f}', // one decimal
//         y: 0, // 10 pixels down from the top
//         style: {
//             fontSize: '10px',
//             fontWeight: 'normal'
//         }
//     },

//   },
//   {
//     name: 'Stop',
//     color: '#ec5550',
//     data: res.stop_time.map(Number),
//     dataLabels: {
//         enabled: true,
//         // rotation: -90,
//         color: '#292b2c',
//         align: 'center',
//         valueDecimals: 2,
//         format: '{point.y:.2f}', // one decimal
//         y: 0, // 10 pixels down from the top
//         style: {
//             fontSize: '10px',
//             fontWeight: 'normal'
//         }
//     },

}]
  }

 
  })
  this.myLoader1= true;

  this.service.shift_machine_utilization_chart(register).pipe(untilDestroyed(this)).subscribe(res => {
    this.myLoader1= false;

    for (var data in res.run_time) {
        var run = res.run_time[data] ;
        this.runarryul.push(run);
        var idle =res.idle_time[data] ;
        this.idlearryul.push(idle);
        var stop = res.stop_time[data] ;
        this.stoparryul.push(stop);
        var nodata = res.no_data[data];
        this.noarryul.push(nodata);
         var duration = res.duration[data];
        this.duration.push(duration);
    
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

    // for (var data in this.runarryul) {
    //     var run1 = (this.secondsToMinutes(this.runarryul[data])  * 100 / this.secondsToMinutes(this.duration[data])) ;
    //     this.runarryul1.push(run);
    //     var idle1 = (this.secondsToMinutes(this.idlearryul[data])  * 100 / this.secondsToMinutes(this.duration[data]));
    //     this.idlearryul1.push(idle);
    //     var stop1 = (this.secondsToMinutes(this.stoparryul[data])  * 100/ this.secondsToMinutes(this.duration[data]));
    //     this.stoparryul1.push(stop);
    //     var nodata1= parseFloat(this.secondsToMinutes(this.noarryul[data]) *100/ this.secondsToMinutes(this.duration[data]));
    //       this.noarryul1.push(nodata);
    
    // }
    //  var m = Math.floor(res.no_data % 3600 / 60);

    this.chartOptions2 = {
        chart: {
          type: 'bar',
          zoomType: 'xy',

      },
      title: {
          text: 'Machine Status With Utilization(%) Chart'
      },
      subtitle: {
        text: 'Machine ID : '+ this.machineName+',Shift No:'+ this.SHIFT_NUM +' Date :'+this.date+',',
        style: {
            fontSize: '16px',
            color: '#f58632',
            fill: '#f58632'
         }
      },
      xAxis: {
        categories: res.shift_no.reverse(),
        title: {
            text: 'Shift'
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
                // color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            },
        //    formatter: function () {

        //         if(this.total >= 98 ){
        //             this.total = 100;
        //         }

        //         return Math.ceil(this.total) + '%';
        //     }
        }

    },

      legend: {
          reversed: true
      },
      navigation: {
        buttonOptions: {
            enabled: true
        }
    },
    
    exporting:{
        enabled:true
    },
    credits:{
        enabled:false
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true,
                // color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                format: '{point.y:.0f} %', // your label's value plus the percentage sign
                valueDecimals: 2 // show your label's value up to two decimal places
            }
        }

    },
    
    colors: ['#292b2c','#ec5550', '#e8a249', '#2cbe63'],

    // series: [
    //     {
    //         name: 'Nodata',
    //         data: this.noarryul1.reverse()
    //     },
    //     {
    //     name: 'Stop',
    //     data: this.stoparryul1.reverse()
    // }, {
    //     name: 'idle',
    //     data: this.idlearryul1.reverse()
    // }, {
    //     name: 'Run',
    //     data: this.runarryul1.reverse()
    // }],

      series: [{
          name: 'Nodata',
          color: '#292b2c',
          data: res.no_data.map(Number),
          dataLabels: {
            enabled: true,
            // rotation: -90,
            color: '#292b2c',
            align: 'center',
            valueDecimals: 2,
            // format: '{point.y:.2f}', 
            y: 0, // 10 pixels down from the top
            style: {
                fontSize: '10px',
                fontWeight: 'normal'
            }
        },
      }
    , {
          name: 'Idle',
          color: '#e8a249',
          data:  res.idle_time.map(Number)
      }, {
          name: 'Run',
          color: '#2cbe63',
          data: res.run_time.map(Number)
      },
      {
        name: 'Stop',
        color: '#ec5550',
        data: res.stop_time.map(Number)
    }
]}
 })


 this.myLoader1= true;

 this.service.all_cycle_time_chart_new(register).pipe(untilDestroyed(this)).subscribe(res => {
   this.allcycle_response = res;
   console.log(this.allcycle_response);
   for(let i in this.allcycle_response){
    console.log(i)
    this.correct = this.allcycle_response[i];
    console.log(this.correct)
    for(let j in this.allcycle_response[i][0]){
      console.log(j)
    }
  
   }
    this.myLoader1= false;

 })
}
secondsToMinutes(time: any):string {
    var min = Math.floor(time / 60);
    var sec = Math.floor(time % 60);

    if (sec.toString().length == 1) {
        // alert(sec);
      let sec = '0'+'sec';
    }
    return min + '.' + sec;
}

ngOnDestroy(){

}
}
