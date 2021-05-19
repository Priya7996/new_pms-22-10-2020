// import { Component, OnInit } from '@angular/core';
// import { NavbarService} from '../../Nav/navbar.service';
// import { MachineNewService} from '../../Service/app/machine-new.service';
// import * as Highcharts from 'highcharts';

// @Component({
//   selector: 'app-machinenew',
//   templateUrl: './machinenew.component.html',
//   styleUrls: ['./machinenew.component.scss']
// })
// export class MachinenewComponent implements OnInit {
//   tenant: any;
//   machine_response: any;

//   constructor(private nav:NavbarService,private service:MachineNewService) {
//     this.nav.show();
//     this.tenant=localStorage.getItem('tenant_id')
//    }

//   ngOnInit() {
//     this.service.machine(this.tenant).subscribe(res => {
//       console.log(res);
//       this.machine_response=res;
//       console.log(localStorage.getItem('token'));})
//   }

// }
import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import * as Highcharts from 'highcharts';
import { MachineNewService} from '../../Service/app/machine-new.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-machinenew',
  templateUrl: './machinenew.component.html',
  styleUrls: ['./machinenew.component.scss']
})
export class MachinenewComponent implements OnInit {

 
  Highcharts = Highcharts;
  chartOptions2: any;
  startDate:any;
  chartOptions:any;
  daterangepicker:any;
  doughnutChartOptions = {
    responsive: true,
    cutoutPercentage: 70
  };




  doughnutChartLabels = [];
  doughnutChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)',
        'rgba(255, 165, 0, 0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(30, 169, 224, 0.8)',
        'rgba(255, 102, 0, 0.9)',
      ]
    }
  ];
  doughnutChartData: any = [
    {
      data: []
    }
  ];

  
//   chartOptions = {
//     chart: {
//       plotBackgroundColor: null,
//       plotBorderWidth: null,
//       plotShadow: false,
//       type: 'pie'
//   },
//   title: {
//       text: 'SBE/TC/BA/M-M123(E)'
//   },
//   subtitle: {
//     text: 'BA/M-M123'
//   },
//   // tooltip: {
//   //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//   // },
//   accessibility: {
//       point: {
//           valueSuffix: '%'
//       }
//   },
//   plotOptions: {
//       pie: {
//           allowPointSelect: true,
//           cursor: 'pointer',
//           dataLabels: {
//               enabled: false
//           },
//           showInLegend: true
//       }
//   },
//   series: [{
//       name: 'Status',
//       colorByPoint: true,
//       data: [{
//           name: 'Remaining',
//           y: 61.41,
//           sliced: true,
//           selected: true
//       }, {
//           name: 'Running',
//           y: 11.84
//       }, {
//           name: 'Idle',
//           y: 10.85
//       }, {
//           name: 'Stopped',
//           y: 4.67
//       }]
//   }]
//   }

 
login: FormGroup;

machineName:any;
  show:boolean=true;
  tenant: any;
  machine_response: any;
  date: any;
  shiftlist: any;
  show_response: any;
  toggle_id: any;
  machine:any;
  hour_times: any;
  constructor(private fb: FormBuilder,private nav:NavbarService,private service:MachineNewService) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id')

   }

  ngOnInit() {
    

    this.login = this.fb.group({
      machine: ["", Validators.required],
      shiftlist: [""],
      date: [""]

    })
    this.service.machine(this.tenant).subscribe(res => {
    this.machine_response=res;
    console.log(this.machine_response)
    console.log(this.machine_response[0].machine_name);

    for(let i=0; i<this.machine_response.length; i++){
        this.machineName = this.machine_response[i].machine_name
        console.log(this.machineName)
       this.login.patchValue({
        machine: this.machine_response[i].machine_name,
       })
      
    }
    // this.login.patchValue({
    //   machine: this.machine_response[0].machine_name,
    // })


    // for(let i=0; i<this.machine_response[0]; i++){
    //     this.machineName = this.machine_response[0].machine_name
    //     console.log(this.machineName);
    //    this.login.patchValue({
    //     machine: this.machine_response[0].machine_name,
    //    })
      
    // }
  
  })

    this.service.getoption(this.tenant).subscribe(res =>{
      console.log(res);
      
      this.show_response=res;
      this.shiftlist = res.shift;
      this.date = res.date;
      
      console.log(this.shiftlist);
      console.log(this.date);

    })
    
    }
logintest(val){
  console.log(val);
}
getmachine(val,id){
      console.log(val,id)
      this.toggle_id=id
    
     this.service.changemachine(this.tenant,this.toggle_id).subscribe(res => {
        console.log(res);
        this.hour_times=res;
        this.chartOptions2 = {
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: 0,
              plotShadow: false
          },
          title: {
              text: 'Machine Status',
              // align: 'center',
              // verticalAlign: 'middle',
          },
          credits:{
                enabled:false
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
              point: {
                  valueSuffix: '%'
              }
          },
          plotOptions: {
              pie: {
                  dataLabels: {
                      enabled: true,
                      distance: -50,
                      style: {
                          fontWeight: 'bold',
                          color: 'white'
                      }
                  },
                  startAngle: -180,
                  endAngle: 180,
                  center: ['50%', '50%'],
                  size: '100%'
              }

          },
          colors: ['#00FA9A	',' #f7941e','red','	#5d5b5b'],
      
          series: [{
              type: 'pie',
              // name: 'Browser share',
              innerSize: '50%',
              data: [
                  ['Run', 58.9],
                  ['Idle', 13.29],
                  ['Stop', 13],
                  ['Remaining', 5.78],
              ]
          }]
      };
      
    
  })
}
}



  
