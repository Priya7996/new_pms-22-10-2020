import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { AlertService} from '../../Service/app/alert.service';
import { MatTableDataSource } from '@angular/material';
import { PageEvent, MatPaginator} from '@angular/material/paginator';
import { untilDestroyed } from 'ngx-take-until-destroy';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  message:any;
  displayedColumns: string[] = ['position','machine', 'message', 'date', 'time'];
  dataSource = new MatTableDataSource();
  pageNo: any;
  searchText:any;
  page_size= 10;
  myLoader = false;
  public dolly = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    // if(!this.dataSource.filter){
    //   this.message = "No results found"
    // }
  }
  toggleDisplay() { this.isShow = !this.isShow; }
  isShow = true;
  http: any;
  test: any;
  alertreport: any;
  tenant: string;
  length: number;
  paginator: any;
  total_count: any;

  constructor(private nav:NavbarService,private service:AlertService) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id')

   }

  ngOnInit() {
    this.myLoader=true;
    this.pageNo =1;
   this.service.alert(this.tenant,this.pageNo,).pipe(untilDestroyed(this)).subscribe(res => {
      
      this.myLoader=false;

      this.alertreport=res;
      for(let i=0;i<=this.alertreport.length;i++){
        
      }
      this.dataSource=new MatTableDataSource(this.alertreport)
      // this.length = 1;
      // this.dataSource.paginator = this.paginator;
      this.total_count =res.alertreport;


    })



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
  pageEvent(e){
 
    this.pageNo = e.pageIndex+1;
    this.service.alert(this.tenant,this.pageNo).pipe(untilDestroyed(this)).subscribe( res => {
   
     this.alertreport = res;
      this.dataSource = new MatTableDataSource(this.alertreport);
    })
  }

  ngOnDestroy(){

  }
}
