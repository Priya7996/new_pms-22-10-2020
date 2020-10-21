import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { CycleStartService} from '../../Service/app/cycle-start.service';
import * as Highcharts from 'highcharts';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cycle-time-start-to-start',
  templateUrl: './cycle-time-start-to-start.component.html',
  styleUrls: ['./cycle-time-start-to-start.component.scss']
})
export class CycleTimeStartToStartComponent implements OnInit {
  startDate = new Date(2020, 0, 1);

  Highcharts = Highcharts;

  chartOptions: any;

  myLoader = false;
    machine_response: any;
    shift_response: any;
    tenant: any;
    login:FormGroup;
  macname: any;
  shiftname: any;
  showdate: any;
  shiftNo: any;
  constructor(private datePipe:DatePipe,private nav:NavbarService,private service:CycleStartService,private fb :FormBuilder) {
    this.nav.show();
    this.tenant = localStorage.getItem('tenant_id')
   }

  ngOnInit() {
      this.login = this.fb.group({
          machine_id:["",Validators.required],
          shift_id:["",Validators.required],
          date:["",Validators.required]
      })
   this.login.value.date=Date.now();
   console.log(this.login.value.date,"date")
    this.service.machine( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
        console.log(res);
        this.machine_response=res;
        
       

      
    })
       
   this.service.shiftidentity(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
     console.log(res);
     this.service.shift(res.id).subscribe(res => {
      console.log(res);
      this.shift_response=res; 
      console.log(localStorage.getItem('token'));})
   })
   this.service.current_status(this.tenant).subscribe(res =>{
    console.log(res);
  })


 //    let register = {'machine_id': this.machine_response.id, 'shift_id':this.shift_response.id, 'date':this.login.value['date']};
 //        register['tenant_id'] = this.tenant;


 // this.service.cycle_start_to_start(register).subscribe(res => {
 //      console.log(res);
 //      this.chartOptions = {
 //        chart: {
 //          type: 'bar'
 //      },
 //      exporting: {
 //        // enabled:true,
 //        buttons: {
 //          contextButton: {
 //            menuItems: ["printChart", "separator", "downloadPNG", "downloadPDF"]
 //        }
 //      }
 //    },
 //      title: {
 //          text: 'Cycle Start to Cycle Start(Mins)'
 //      },
 //      subtitle: {
 //          text: 'Machine ID :' + this.macname['machine_name']+', Shift : ' +this.shiftname['shift_no'] +', Date : 04-02-2020',
 //          style: {
 //            fontSize: '16px',
 //            color: '#f58632',
 //            fill: '#f58632'
 //         }
 //      },
 //      xAxis: {
 //          categories: res.length,
 //          title: {
 //              text: 'Parts Count'
 //          }
 //      },
 //      yAxis: {
 //          min: 0,
 //          title: {
 //              text: 'Time(Min)',
 //              align: 'middle'
 //          },
 //          labels: {
 //              overflow: 'justify'
 //          }
 //      },
 //      tooltip: {
 //          valueSuffix: ' Min'
 //      },
 //      plotOptions: {
 //          bar: {
 //              dataLabels: {
 //                  enabled: true
 //              }
 //          }
 //      },
 //      legend: {
 //          layout: 'vertical',
 //          align: 'right',
 //          verticalAlign: 'top',
 //          x: -40,
 //          y: 10,
 //          floating: true,
 //          borderWidth: 1,
 //          backgroundColor:
 //              Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
 //          shadow: true
 //      },
 //      navigation: {
 //        buttonOptions: {
 //            enabled: true
 //        }
 //    },
    
 //      credits: {
 //          enabled: false
 //      },
     
 //      colors: ['#2cbe63', '#2cbe63', '#2cbe63', '#2cbe63'],
 //      series: [{
 //          name: 'Time',
 //          data: res
 //      }]
 //      }
 //  })













    
  }
  getmachine(event) {
    this.macname = event;
      
  }
  getshift(shift){
    this.shiftNo = shift;
    }
  getdate(event) {
    this.showdate = event;
      console.log(this.showdate);
      
  }
  time_start_view(){
           
    this.showdate = this.datePipe.transform(this.login.value.date);
    console.log(this.showdate)

    console.log(this.login.value);
   let register = this.login.value;
     register.tenant_id = this.tenant; 
    
    console.log(register);
   this. myLoader = true;

    this.service.cycle_start_to_start(register).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.myLoader = false;

      
  
      this.chartOptions = {
        chart: {
          type: 'bar',
          zoomType: 'xy',

      },
      exporting: {
        // enabled:true,
        buttons: {
          contextButton: {
            menuItems: ["printChart", "separator", "downloadPNG", "downloadPDF"]
        }
      }
    },
      title: {
          text: 'Cycle Start to Cycle Start(Mins)'
      },
      subtitle: {
        text: 'Machine ID : '+ this.login.value.machine_id+',Shift No:'+ this.login.value.shift_id+' Date :'+this.showdate+',',

          // text: 'Machine ID :' + this.macname['machine_name']+', Shift : ' +this.shiftname['shift_no'] +', Date : 04-02-2020',
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
    
    credits: {
      enabled: false
    },
     
      colors: ['#2cbe63', '#2cbe63', '#2cbe63', '#2cbe63'],
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
