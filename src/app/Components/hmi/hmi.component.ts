import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { HmiService} from '../../Service/app/hmi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
import { untilDestroyed } from 'ngx-take-until-destroy';
import Swal from 'sweetalert2';    
import pareto from 'highcharts/modules/pareto';


declare var Highcharts: any;

require('highcharts/modules/pareto');


@Component({
  selector: 'app-hmi',
  templateUrl: './hmi.component.html',
  styleUrls: ['./hmi.component.scss']
})
export class HmiComponent implements OnInit {
  chartOptions:any;
  isShow = true;
  new_date1:any;
  Highcharts: any;
  // chart 1
  toggleDisplay() { this.isShow = !this.isShow; }
  no_data:any;
  data:any;
  myLoader1 = false;
  myLoader = false;
  startDate = new Date(2020, 0, 1);
  maxDate:any;
  minDate:any;
  // public minDate: Object = new Date(new Date().setMonth(new Date().getMonth() - 1));
  displayedColumns: string[] = ['date', 'shift_no', 'time', 'operator_id','operator_name','machine_id','machine_name','idleduration','idle_time','description'];
  dataSource = new  MatTableDataSource();
  show: boolean=false;
  toggle: boolean=false;
  machine_response: any;
  tenant: any;
  login:FormGroup;
  chart_pie:any;
  shift_response: any;
  reportList: boolean;
  reports: any;
  chartlist: boolean;
  charts: any;
  macname: any;
  shiftname: any;
  new_date:any;
  g_report:any;
  chart_loop:any;
  get_report:any;
  newdatee:any;
  newdate:any;
  newdate1:any;
  newdates:any;
  constructor(private nav:NavbarService,private service:HmiService,private fb:FormBuilder,private datePipe: DatePipe) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id')

   }
   
   reportview()
   {
    this.show = !this.show
  }
  chartview()
  {
    this.toggle=!this.toggle
  }
  toHoursMinutesSeconds = totalSeconds => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    // let result = `${minutes
    //   .toString()
    //   .padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;
    // if (!!hours) {
    let result = `${hours.toString()}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
   
    return result;
  };
  ngOnInit() {

     this.login = this.fb.group({
      machine_id:["",Validators.required],
      shift_id:["",Validators.required],
      date: ["",Validators.required]

     })
     this.service.machine( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {

      this.machine_response=res;
    })
    
      
         
      this.service.shiftidentity(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
          this.service.shift(res.id).subscribe(res => {

           this.shift_response=res; 
          })
        })

       




       

      

        

  }  
      
 
  hmiReport(){

    // this.login.reset();
    console.log(this.login.value)
    this.newdates = new DatePipe('en-US').transform(this.login.value.date, 'MM/dd/yyyy');
    this.newdatee = new DatePipe('en-US').transform(this.login.value.date, 'MM/dd/yyyy');
    let register = {
      "machine": this.login.value.machine_id,
      "shift": this.login.value.shift_id,
      "date": this.newdates + '-' + this.newdatee
        }
    console.log(register)
      this.myLoader = true;
      this.service.table(register).pipe(untilDestroyed(this)).subscribe(res => {
      this.myLoader = false;
      this.no_data = res;
      console.log(this.no_data)
      this.reports = res;
      this.g_report = res[0];
      this.get_report = res[0].data;
      if(this.get_report.length === 0){
        Swal.fire("No Idle Reason Report Found")
      }
      this.data = []
   
      for(let i in this.get_report){

        this.chart_loop = this.toHoursMinutesSeconds(this.get_report[i].time);
        this.data.push(this.chart_loop);
      }
      this.dataSource = new MatTableDataSource(this.reports);
      this.reportList = true;
      this.chartlist = false;
    })
  }

  hmiChart(){

    this.chartlist = true;
    this.reportList = false;
    // this.login.reset();
    console.log(this.login.value)
    this.newdate = new DatePipe('en-US').transform(this.login.value.date, 'MM/dd/yyyy');
    this.newdate1 = new DatePipe('en-US').transform(this.login.value.date, 'MM/dd/yyyy');
    let register = {
      "machine": this.login.value.machine_id,
      "shift": this.login.value.shift_id,
      "date": this.newdate + '-' + this.newdate1
        }
    
    this.myLoader1 = true;

this.service.paretto_chart(register).pipe(untilDestroyed(this)).subscribe(res => {
console.log(res.a);
 Highcharts.chart('container', {
  chart: {
    renderTo: 'container',
    type: 'column',
    zoomType: 'xy',

  },
  title: {
    text: 'Downtime Tracking'
  },
  tooltip: {
    shared: true
  },
  xAxis: {
    categories: res.reason,
    // title: {
    //   text: res.individual
    // },
    // p: res.individual,
    crosshair: true
  },
  yAxis: [{
    title: {
      text: ''
    }
  }, {
    title: {
      text: ''
    },
    minPadding: 0,
    maxPadding: 0,
    max: 100,
    min: 0,
    opposite: true,
    labels: {
      format: "{value}%"
    }
  }],
  series: [{
    type: 'pareto',
    name: 'Pareto',
    yAxis: 1,
    zIndex: 10,
    baseSeries: 1,
    tooltip: {
      valueDecimals: 2,
      valueSuffix: '%'
    }
  }, {
    name: 'Complaints',
    type: 'column',
    zIndex: 2,
    data: res.cumulative
  }]
});

})


    this.service.chart(register).pipe(untilDestroyed(this)).subscribe(res => {
      this.myLoader1 = false;
      this.chart_pie = res;
      console.log(res.reason);
      // for(let i=0;i<this.chart_pie.length;i++){
      //   console.log(this.chart_pie)


      // }
      Highcharts.chart('comparepie2', {
        chart: {
          plotBackgroundColor: null,                                
          plotBorderWidth: 0,
          plotShadow: false,
          backgroundColor: '#212226',
          spacingBottom: 0,
          spacingTop: 0,
          spacingRight: 0,
          spacingLeft: 0,
          margin: 0,
          height: '50%',
  
        },
        // navigation: {
        //   buttonOptions: {
        //     theme: {
        //       'stroke-width': 1,
        //       stroke: null,
        //       fill: '#0b0b0b',
        //       r: 0,
        //       states: {
        //         hover: {
        //           fill: '#1a1919'
        //         },
        //         select: {
        //           fill: '#1a1919'
        //         }
        //       }
        //     }
        //   }
        // },
        title: {
          text: '',
  
          align: 'center',
          verticalAlign: 'middle',
          style: {
            fontSize: '14px',
            color: 'white'
          }
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          pie: {
            colors: [
              '#5D5D5D',
              '#E8BE15',
              '#207A24',
              '#00ffff',
              '#ff00ff',
              '#ff0000',
            ],
            dataLabels: {
              enabled: true,
              distance: -50,
              style: {
                fontWeight: 'bold',
                color: 'white'
              }
            },
  
            size: '100%'
          }
        },
        series: [{
          type: 'pie',
          borderWidth: 0,
  
          innerSize: '60%',
          data:  res.reason
          // [

          //   ['Idle',6],
          //   ['Run',8],

          // ]
        }]
  
      });
    
    //  this. chartOptions = {
    //     chart: {
    //       type: 'column',
    //       style: {
    //         fontFamily: 'roboto'
    //       }
    //     },
    //     options3d: {
    //       enabled: true,
    //       alpha: 15,
    //       beta: 15,
    //       depth: 50,
    //       viewDistance: 25 
    //   },
    //     title: {
    //       text: 'HMI Chart'
    //     },
    //     subtitle: {
    //       text: 'Machine ID :'+res.machine_name+', Shift : '+res.shift+', Date : '+this.new_date+',Reason:'+res.reason+'',
    //       style: {
    //         fontSize: '16px',
    //         color: '#f58632',
    //         fill: '#f58632'
    //       }
    //     },
    //     xAxis: {
    //       categories: [''],
    //       title: {
    //         text: 'Reason',
    //         align: 'middle'
    //       }
    //     },
    //     yAxis: {
    //       allowDecimals: false,
    //       title: {
    //         text: 'Time(min)',
    //         align: 'middle'
    //       },
    //       labels: {
    //         overflow: 'justify'
    //       }
    //     },
    //     tooltip: {
    //       //valueSuffix: ' certificates'
    //     },
    //     exporting: {
    //       // enabled:true,
    //       buttons: {
    //         contextButton: {
    //           menuItems: ["printChart", "separator", "downloadPNG", "downloadPDF"]
    //       }
    //     }
    //   },
    //   credits: {
    //     enabled: false
    // },
    //     plotOptions: {
    //       bar: {  
    //         dataLabels: {
    //           enabled: true
    //         }
    //       },
    //     },
    
     
    //     colors: ['#f58632', '#f58632', '#f58632', '#f58632'],
    //     series: [{

    //       data: [res.time],
    //     }],
    //     legend: {
    //       layout: 'vertical',
    //       align: 'right',
    //       itemMarginBottom: 7,
    //       verticalAlign: 'top'
    //     }
    //   }
      this.charts = res;
      console.log(res);

    })
  }
  ngOnDestroy(){

  }
}
