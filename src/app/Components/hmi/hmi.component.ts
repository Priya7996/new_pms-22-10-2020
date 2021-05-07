import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { HmiService} from '../../Service/app/hmi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import * as Highcharts from 'highcharts';
import { DatePipe } from '@angular/common';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-hmi',
  templateUrl: './hmi.component.html',
  styleUrls: ['./hmi.component.scss']
})
export class HmiComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions:any;
  isShow = true;
  new_date1:any;
  // chart 1
  toggleDisplay() { this.isShow = !this.isShow; }

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
  shift_response: any;
  reportList: boolean;
  reports: any;
  chartlist: boolean;
  charts: any;
  macname: any;
  shiftname: any;
  new_date:any;
  

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
        Highcharts.chart('comparepie', {
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
            height: '100%',
    
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
            data: [
              ['Disconnect',4],
  
              ['Idle',6],
              ['Run',8],
  
            ]
          }]
    
        });


        Highcharts.chart('container', {
          chart: {
              zoomType: 'xy',
              height: 400,
              backgroundColor: '#202328'
          },
           exporting: {
              enabled: false
            },
            credits: {
              enabled: false
            },
          title: {
              text: ''
          },
          subtitle: {
              text: ''
          },
          xAxis: [{
              categories: ['Setup', 'Part Changeover', 'Other', 'Offset/Tool Changeover', 'A/P Reached Count', 'Material',
                  'Machine Maintenance', 'Machine Problem', 'No Operator', 'Barloader', 'Chipping Out', 'No Tooling'],
              crosshair: true
          }],
          yAxis: [{ // Primary yAxis
            gridLineColor: '#4f4f4f',
              labels: {
                  format: '{value}k',
                  style: {
                      color: Highcharts.getOptions().colors[1]
                  }
              },
              title: {
                  text: 'Minutes of Downtime',
                  style: {
                      color: Highcharts.getOptions().colors[1]
                  }
              }
          }, { // Secondary yAxis
              title: {
                  text: 'Occurrance',
                  style: {
                      color: Highcharts.getOptions().colors[0]
                  }
              },
              labels: {
                  style: {
                      color: Highcharts.getOptions().colors[0]
                  }
              },
              opposite: true
          }],
          tooltip: {
              shared: true
          },
          legend: {
              layout: 'vertical',
              align: 'left',
              x: 120,
              verticalAlign: 'top',
              y: 100,
              floating: true,
              backgroundColor:
                  Highcharts.defaultOptions.legend.backgroundColor || // theme
                  'rgba(255,255,255,0.25)'
          },
          series: [{
               showInLegend: false,
               borderColor: '#E8A249',
              name: 'Minutes of Downtime',
              type: 'column',
              color: "#E8A249",
              yAxis: 1,
              data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      
          }, {
               showInLegend: false,
              name: 'Occurrance',
              color: "#ba6606",
              type: 'spline',
              data: [12.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
          }]
      });

  }  
      
 
  hmiReport(){

    // this.login.reset();
    let register = this.login.value;
    this.new_date1 = new DatePipe('en-US').transform(this.login.value.date, 'dd-MM-yyyy');

     register.start_date = this.new_date1;
     register.end_date = this.new_date1;
     register.tenant_id = this.tenant;
      this.myLoader = true;
      this.service.table(register).pipe(untilDestroyed(this)).subscribe(res => {
      this.myLoader = false;
      this.reports = res;
      this.dataSource = new MatTableDataSource(this.reports);
      this.reportList = true;
      this.chartlist = false;
    })
  }

  hmiChart(){
    // this.login.reset();
    let register = this.login.value;
    this.new_date1 = new DatePipe('en-US').transform(this.login.value.date, 'dd-MM-yyyy');

     register.start_date = this.new_date1;
     register.end_date = this.new_date1;
     register.tenant_id = this.tenant;
    this.myLoader1 = true;
    this.service.chart(register).pipe(untilDestroyed(this)).subscribe(res => {
      this.myLoader1 = false;

      this.new_date = this.datePipe.transform(this.login.value.date,'MM-dd-yyyy');
      console.log(this.new_date);
     this. chartOptions = {
        chart: {
          type: 'column',
          style: {
            fontFamily: 'roboto'
          }
        },
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 50,
          viewDistance: 25 
      },
        title: {
          text: 'HMI Chart'
        },
        subtitle: {
          text: 'Machine ID :'+res.machine_name+', Shift : '+res.shift+', Date : '+this.new_date+',Reason:'+res.reason+'',
          style: {
            fontSize: '16px',
            color: '#f58632',
            fill: '#f58632'
          }
        },
        xAxis: {
          categories: [''],
          title: {
            text: 'Reason',
            align: 'middle'
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
        tooltip: {
          //valueSuffix: ' certificates'
        },
        exporting: {
          // enabled:true,
          buttons: {
            contextButton: {
              menuItems: ["printChart", "separator", "downloadPNG", "downloadPDF"]
          }
        }
      },
      credits: {
        enabled: false
    },
        plotOptions: {
          bar: {  
            dataLabels: {
              enabled: true
            }
          },
        },
    
     
        colors: ['#f58632', '#f58632', '#f58632', '#f58632'],
        series: [{

          data: [res.time],
        }],
        legend: {
          layout: 'vertical',
          align: 'right',
          itemMarginBottom: 7,
          verticalAlign: 'top'
        }
      }
      this.charts = res;
      this.chartlist = true;
      this.reportList = false;
    })
  }
  ngOnDestroy(){

  }
}
