import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import {DashboardService} from '../../Service/app/dashboard.service';

declare var Highcharts: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Highcharts = Highcharts;
  tenant: any;
  machine_response: any;
  m_id:any;
  machie_status:any;
  myLoader = false;
  status:any;
  machie_status_new:any;
  machie_status_val:any;
  constructor(private nav:NavbarService,private service:DashboardService) {
    this.nav.show()
    setInterval(() => {this.today = Date.now()}, 1);
    
    this.tenant = localStorage.getItem('tenant_id')
  }
  today: number = Date.now();

  ngOnInit() { 
    this.machie_status_new = [{"data":{"Unit - 1":[{"tenant_name":"Bakgiyam","unit":"Unit - 1","mac_name":"SBE/TC/BA/M-M123(E)","machine_id":6,"machine_status":3,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 1","mac_name":"SBE/TC/BA/M-M124(E)","machine_id":7,"machine_status":1,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 1","mac_name":"SBE/VMC/BA/M-M029(E)","machine_id":8,"machine_status":3,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 1","mac_name":"SBE/HMC/BA/M-M107(E)","machine_id":9,"machine_status":100,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 1","mac_name":"SBE/HMC/BA/M-M027(E)","machine_id":35,"machine_status":100,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 1","mac_name":"SBE/VMC/BA/M-M028(E)","machine_id":72,"machine_status":3,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 1","mac_name":"SBE/VMC/BA/M-M108(E)","machine_id":81,"machine_status":3,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 1","mac_name":"SBE/VMC/BA/M-M120(R)","machine_id":32,"machine_status":1,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 1","mac_name":"SBE/HMC/BA/M-M008(R)","machine_id":33,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 1","mac_name":"SBE/VMC/BA/M-M021(R)","machine_id":36,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 1","mac_name":"SBE/TC/BA/M-M010(R)","machine_id":69,"machine_status":1,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 1","mac_name":"SBE/HMC/BA/M-M132(R)","machine_id":71,"machine_status":3,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"}],"Unit - 2":[{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/TC/BA/M-M001(E)","machine_id":46,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/VTL/BA/M-M032(E)","machine_id":47,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/TC/BA/M-M034(E)","machine_id":49,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/TC/BA/M-M011(E)","machine_id":74,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/VTL/BA/M-M031(E)","machine_id":75,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/TC/BA/M-M033(E)","machine_id":76,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/TC/BA/M-M105(E)","machine_id":77,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/TC/BA/M-M106(E)","machine_id":78,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/TC/BA/M-M119(E)","machine_id":79,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/TC/BA/M-M122(E)","machine_id":80,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/VMC/BA/M-M004(R)","machine_id":43,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/VMC/BA/M-M126(R)","machine_id":44,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/TC/BA/M-M014(R)","machine_id":45,"machine_status":3,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/VMC/BA/M-M125(R)","machine_id":65,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/TC/BA/M-M015(R)","machine_id":66,"machine_status":3,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/TC/BA/M-M013(R)","machine_id":67,"machine_status":1,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/VMC/BA/M-M023(R)","machine_id":82,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"},{"tenant_name":"Bakgiyam","unit":"Unit - 2","mac_name":"SBE/VMC/BA/M-M024(R)","machine_id":83,"machine_status":null,"shift_no":4,"start_time":"2020-07-09T20:00:00.000+05:30"}]},"count":{"Unit - 1":{"running":5,"idle1":3,"stop":2,"waste":2},"Unit - 2":{"waste":15,"running":2,"idle1":1}}}]
    this.machine_response = this.machie_status_new[0]
    this.machie_status_val = [{"last_update":"2020-07-09T21:24:24.000+05:30","shift_no":4,"shift_time":"08:00PM - 12:00AM","machine_name":"SBE/TC/BA/M-M123(E)","machine_id":6,"utilization":25,"run_time":"01:07:41","idle_time":"00:18:43","stop_time":"00:00:00","cycle_time":"00:08:48","cutting_time":"00:07:47","machine_status":1,"machine_disply":425,"parts_count":7,"job_name":"953-(R921180953","total_run_time":"15:30:53","alarm":"(X)  OVERTRAVEL ( SOFT 1 )","job_wise_parts":{"953":7},"feed_rate":0,"spindle_load":0,"spindle_speed":0,"sp_temp":"34","axis_load":{"x_axis":"30","z_axis":"8"},"axis_tem":{"x_axis":"0","z_axis":"0"},"puls_code":{"x_axis":"45","z_axis":"36"},"axis_tem_count":2,"start_time":"2020-07-09T20:00:00.000+05:30","operator_allocation":"Name not Entered"}]
    this.machie_status = this.machie_status_val[0]
//     this.myLoader = true;
//     this.service.dashboard(this.tenant).subscribe(res =>{
//       this.machine_response=res;
//       this.myLoader = false;
//       this.service.dashboard_full(this.machine_response['data']['Unit - 1'][0]['machine_id']).subscribe(res =>{
//       this.machie_status =res;
//       console.log(this.machie_status)
//       this.myLoader = false;
//       this.chart()
//   })
// })
  }
  activeclick(id){
    this.myLoader = true;
      this.m_id = id;
      this.service.dashboard_full(this.m_id).subscribe(res =>{
        this.machie_status =res;
        console.log(this.machie_status)
          this.myLoader = false;
      })
    }
  chart(){
    // The speed gauge
    var container = Highcharts.chart('container', {
      credits: {
        enabled: false
      },
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: 200,
        width: 180,
        fill: 'transparent',
        backgroundColor: {
          backgroundColor: '#262932',
        }
      },
      title: {
        style: {
          fontSize: '14px',
          color: '#fff',
          font: 'bold 14px "Trebuchet MS", Verdana, sans-serif'
        },
        text: 'Spindle' + '\xa0' + 'Speed',
        y: 30
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

        dial: {
          backgroundColor: 'blue'
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
        // data: ['80'spindlespeed],
        data: [{
          color: '#fff',
          fillL: '#fff',
          radius: '100%',
          innerRadius: '80%',
          y: 0
        }],
        color: {
          linearGradient: [0, 0, 300, 0],
          stops: [
            [0.4, '#fff'],
            [0.1, '#fff']
          ]
        },
        dataLabels: {
          format: '<span style="font-size:14px;color:grey;">{y} RPM</span></div>',
          y: 10,
          borderWidth: 0,
          fill: '#ccc',
          color: '#ccc'
        },
        tooltip: {
          valueSuffix: ' RPM'
        },
        series: [{
          data: this.machie_status.spindlespeed
        }],
      }],

    });

    var container = Highcharts.chart('container2', {
      credits: {
        enabled: false
      },
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: 200,
        width: 180,
        fill: 'transparent',
        backgroundColor: {
          backgroundColor: '#262932',
        }
      },
      title: {
        text: 'Feed',
        y: 30,
        style: {
          fontSize: '14px',
          color: '#fff',
          lineheight: 10,
          font: 'bold 14px "Trebuchet MS", Verdana, sans-serif'
        },
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
        // data: ['80'spindlespeed],
        background: '#fff',
        data: [{
          color: '#fff',
          background: '#fff',
          fillL: '#fff',
          radius: '100%',
          innerRadius: '80%',
          y: 0
        }],
        color: {
          linearGradient: [1, 1, 1, 1],
          stops: [
            [0.4, '#fff'],
            [0.1, '#fff']
          ]
        },
        dataLabels: {
          format: '<span style="font-size:14px;color:grey;">{y} m/min</span></div>',
          y: 10,
          borderWidth: 0,
          fill: '#ccc',
          color: '#ccc'
        },
        tooltip: {
          valueSuffix: 'm/min'
        },
        series: [{
          data: this.machie_status.feedrate
        }],
      }]

    });
  }
}
