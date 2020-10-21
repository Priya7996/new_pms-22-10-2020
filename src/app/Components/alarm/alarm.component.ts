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
  pageEvent: PageEvent;
  length:any;
  searchText:any;
  search:any;
  page_size:any = 20;
  pageSizeOptions: number[] = [20];
  tenant:any;
  pageSize:any = 20;
  alarm:any;
  pageNo: any;
  count: any;
  myLoader = false;
  myLoader1 = false;
  alarmhistory:any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'machine', 'alarmtype', 'axis','ex_time','date',];
  
     dataSource = new MatTableDataSource();
     alarm1 = new MatTableDataSource();

  report: string[] = ['position', 'machine', 'alarm_type', 'time'];
  public dolly = (value: string) => {
    this.alarm1.filter = value.trim().toLocaleLowerCase();
  }

  public dongly = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
 
  constructor(private nav:NavbarService,private service:AlarmService) {
    this.nav.show();
  this.tenant=localStorage.getItem('tenant_id')
   }

  ngOnInit() {
    this.myLoader1 = true;
    this.pageNo =1;
    this.service.alarm_history(this.tenant,this.pageNo).pipe(untilDestroyed(this)).subscribe(res =>{
    
      this.myLoader1= false;  

      this.alarmhistory=res['alarm_history'];
      this.dataSource=new MatTableDataSource(this.alarmhistory)
    
      this.length =res['count'];
      this.dataSource.paginator = this.paginator;
    })
    this.myLoader = true;
    this.service.alarm(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
     
      this.myLoader= false;
      this.alarm=res;
      this.alarm1=new MatTableDataSource(this.alarm)

    })
    
  }
  pagination(e){
    this.myLoader = false;
    this.pageNo = e.pageIndex+1;
   
    this.service.alarm_history(this.tenant,this.pageNo).pipe(untilDestroyed(this)).subscribe( res => {
      this.alarmhistory=res['alarm_history'];
      this.length =res['count'];
      this.myLoader = false;
    //  this.alarmHistory = res.alarm_histories;
      this.dataSource = new MatTableDataSource(this.alarmhistory);
    })
  }
  // Pagination
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  ngOnDestroy(){

  }
}
