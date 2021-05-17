import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { PageEvent, MatPaginator} from '@angular/material/paginator';
import { AlarmService} from '../../Service/app/alarm.service';
import { MatSort,MatTableDataSource,} from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';



@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {
  //pagination
  // pageEvent: PageEvent;
  length:any; 
  searchText:any;
  pageSizeOptions:any;
  total_count: any;
  pageNo: any;

  no_data:any;
  search:any;
  page_size= 20;
  tenant:any;
  pageSize:any = 20;
  alarm:any;
  count: any;
  myLoader = false;
  myLoader1 = false;
  alarmhistory:any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['machine', 'alarmtype', 'axis','ex_time','date',];
  
     dataSource = new MatTableDataSource();
     alarm1 = new MatTableDataSource();

  report: string[] = ['position', 'machine', 'alarm_type', 'time'];
  public dolly = (value: string) => {
    this.alarm1.filter = value.trim().toLocaleLowerCase();
  }

  public dongly = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  alarmHistory: any;
 
  constructor(private nav:NavbarService,private service:AlarmService) {
    this.nav.show();
  this.tenant=localStorage.getItem('tenant_id')
   }

  ngOnInit() {


    this.getAlarmHistory();

    //  this.myLoader1 = true;
    // this.pageNo =1;
    // this.service.alarm_history(this.tenant,this.pageNo).pipe(untilDestroyed(this)).subscribe(res =>{
    
    //    this.myLoader1= false;  
    //    this.no_data = res;

    //   this.alarmhistory=res['alarm_history'];
    //   this.dataSource=new MatTableDataSource(this.alarmhistory)
    
    //   this.length =res['count'];
    //   this.dataSource.paginator = this.paginator;
    // })
    // this.myLoader = true;
    // this.service.alarm(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
     
    //   this.myLoader= false;
    //   this.alarm=res;
    //   this.alarm1=new MatTableDataSource(this.alarm)

    // })
    
  }



  getAlarmHistory() {




    this.service.alarm_count().pipe(untilDestroyed(this)).subscribe( resp => {
     console.log(resp)

     localStorage.setItem('a_t_count', resp);




    this.myLoader1 = true;
      this.pageNo =1;
   this.service.alarm_history(this.tenant,this.pageNo).pipe(untilDestroyed(this)).subscribe( res => {
     
     this.myLoader1 = false;

     this.alarmHistory = res;
     this.dataSource = new MatTableDataSource(this.alarmHistory);
     console.log(this.dataSource);
    this.total_count =resp;
    console.log(this.total_count)

   })
  })
  }


  pageEvent(e){
    this.myLoader1 = true;
   
    this.pageNo = e.pageIndex+1;
    this.service.alarm_history(this.tenant,this.pageNo).pipe(untilDestroyed(this)).subscribe( res => {
     
      this.myLoader1 = false;
 
      this.alarmHistory = res;
      this.dataSource = new MatTableDataSource(this.alarmHistory);
      console.log(this.dataSource);
     this.total_count =  localStorage.getItem('a_t_count');
     ;
     console.log(this.total_count);

    })
  }
  

  ngOnDestroy(){

  }
}
