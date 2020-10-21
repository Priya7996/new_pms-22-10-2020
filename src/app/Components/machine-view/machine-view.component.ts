import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { ActivatedRoute } from '@angular/router';
import { MachineViewService} from '../../Service/app/machine-view.service';

declare var Highcharts: any;


@Component({
  selector: 'app-machine-view',
  templateUrl: './machine-view.component.html',
  styleUrls: ['./machine-view.component.scss']
})
export class MachineViewComponent implements OnInit {
  Highcharts = Highcharts;
  myLoader = false;
  machine:any;
  machie_status:any;
  repeatchart;
  repeatpulse;
  spindlespeed;
  feedrate;
  ax_three:any;
  testgokul;
  semicircle;
  fullcircle;
  testsample;
  machie_statusnew;
  machie_statustemp;
  sp_speed;
  machi_job_parts;
  constructor(private nav:NavbarService,private route:ActivatedRoute,private service:MachineViewService) {
    this.nav.show();
    setInterval(() => {this.today = Date.now()}, 1);
    this.machine = localStorage.getItem('machine_id');
    this.myLoader = true;
    this.service.dashboard_full(this.machine).subscribe(res =>{
      this.machie_status =res;
      this.machie_statusnew =this.machie_status.puls_code;
      this.machi_job_parts = this.machie_status.job_wise_parts;
      console.log(this.machi_job_parts)
      this.machie_statustemp =this.machie_status.axis_tem;
      this.testgokul = this.machie_status.axis_load;
      this.testsample = this.machie_status.puls_code;
      this.myLoader = false;
      this.spindle();
      this.repeatchart = [];
      this.repeatpulse = [];
     
   for (let i = 0; i < Object.values(this.machie_status.axis_load).length; i++) {
    this.repeatchart.push(this.vall(this.axis(Object.values(this.machie_status.axis_load)[i])))
    }
     this.feedrate = this.machie_status.feed_rate;
     this.spindlespeed = this.machie_status.spindle_speed; 
    });
   }
   axis(ax){
    var data = ax <= 5 ? (ax == 0 ? 0 : 1) : Math.ceil(ax/5);
    return data
  }
  vall(end_value){
    var ans = [];
    for (let i = 1; i <= end_value; i++) {
        ans.push(i*5);
    }
    return ans;
   }


   pul(ax){
    var data = ax <= 5 ? (ax == 0 ? 0 : 1) : Math.ceil(ax/5);
    return data
  }
  val(end_value){
    var ans = [];
    for (let i = 1; i <= end_value; i++) {
        ans.push(i*5);
    }
    return ans;
   }
   today: number = Date.now();
  ngOnInit() {
    
  }


  spindle(){
    var containergokul = Highcharts.chart('containergokul',{
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      },
      title: {
        style: {
          color: '#FFFFFF',
          font: 'bold 14px "Trebuchet MS", Verdana, sans-serif'
        },
        text: 'Spindle'+ '\xa0'+'Speed',
        y:30
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        background: null
      },

      yAxis: {
        labels: {
          enabled: true,
          x: 35, y: -10
        },
        tickPositions: [],
        minorTickLength: 0,
        min: 0,
        max: 10000,
        plotBands: [{
          from: 0,
          to: 5000,
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#40aa3e'], //green
              [1, '#59db57'] //red
            ]
          },
          thickness: '40%'
        }, {
          from: 5000,
          to: 10000,
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#fd6363'], //green
              [1, '#c41a1a'] //red
            ]
          },
          thickness: '40%'
        }]
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Spindle Speed',
        data: [this.machie_status.spindle_speed],
        color: {
          linearGradient: [0, 0, 300, 0],
          stops: [
            [0.4, '#FF0000'],
            [0.1, '#55BF3B']
          ]
        },
        dataLabels: {
          format: '<span style="font-size:14px;color:grey;">{y} RPM</span></div>',
          y: 10,
          borderWidth: 0
        },
        tooltip: {
          valueSuffix: ' RPM'
        }
      }]
    });

    var FeedRategokul = Highcharts.chart('FeedRategokul',{
      
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,

      },
      title: {
        style: {
          color: '#FFFFFF',
          font: 'bold 14px "Trebuchet MS", Verdana, sans-serif'
        },
        text: 'Feed',
        y:30
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        background: null
      },

      yAxis: {
        labels: {
          enabled: true,
          x: 35, y: -50
        },
        tickPositions: [],
        minorTickLength: 0,
        min: 0,
        max: 5000,
        plotBands: [{
          from: 0,
          to: 2500,
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#40aa3e'], //green
              [1, '#59db57'] //red
            ]
          },
          thickness: '40%'
        }, {
          from: 2500,
          to: 5000,
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#fd6363'], //green
              [1, '#c41a1a'] //red
            ]
          },
          thickness: '40%'
        }]
      },

      exporting: {
        enabled: false
      },
      series: [{
        name: 'Feed Rate',
        data: [this.machie_status.feed_rate], 
        color: {
          linearGradient: [0, 0, 300, 0],
          stops: [
            [0.4, '#FF0000'],
            [0.1, '#55BF3B']
          ]
        },
        dataLabels: {
          format: '<span style="font-size:15px;color:grey;">{y} m/min </span></div>',
          y: 10,
          borderWidth: 0
        },
        tooltip: {
          valueSuffix: ' m/min'
        }
      }]
    })
  }

}
