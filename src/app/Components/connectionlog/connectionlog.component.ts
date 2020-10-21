import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import {LogService} from '../../Service/app/log.service';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-connectionlog',
  templateUrl: './connectionlog.component.html',
  styleUrls: ['./connectionlog.component.scss']
})
export class ConnectionlogComponent implements OnInit {
  displayedColumns: string[] = ['position','date','time','status'];
  displayedColumns1: string[] = ['position','date','time','machinename','status'];
  powerconnected:string[] = ['position','date','time','status']
  Connected:any;
  search:any;
  dataSource = new MatTableDataSource();
  dataSource1 = new MatTableDataSource();
  power = new MatTableDataSource();
  
  public dolly = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  
  public dongly = (value: string) => {
    this.dataSource1.filter = value.trim().toLocaleLowerCase();
  }

  public doblly = (value: string) => {
    this.power.filter = value.trim().toLocaleLowerCase();
  }
tenant:any;
myLoader = false;
myLoader1 = false;
searchText:any
ploh:any;
status:any
connectionStatus:any[]=[];
valuable:any[]=[];
powerStatus:any[]=[];
powerhook:any[]=[];
data:any;
connectionlog: any;
interanet:any;
  log: unknown[];
  logfh: any;
  logjvh: any;
  constructor(private nav:NavbarService,private service:LogService) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id')

   }
   

  ngOnInit() {
    this.myLoader=true;
    this.service.internet(this.tenant).pipe(untilDestroyed(this)).subscribe(result =>{
      this.myLoader=false
      this.interanet = result;
      for(let l = 0; l <= result.length; l++){ 
        if(this.interanet[l].status != 'Power Connected'){
        this.valuable.push(result[l]);
       
        this.dataSource=new MatTableDataSource(this.valuable)

        }
    }

      
    })

    this.myLoader=true;
    this.service.power(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.myLoader=false
      this.connectionlog=res;
      for(let i = 0; i <= res.length; i++){ 
        if(this.connectionlog[i].status === 'Power Connected'){
        this.connectionStatus.push(res[i]);
        this.logfh = this.connectionStatus
        this.power=new MatTableDataSource(this.logfh)
        }else{
         this.powerStatus.push(res[i])
         }
        
    }
    })
  

    this.myLoader1=true;
     this.service.ethernet(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.myLoader1=false
      this.log=res;
      this.dataSource1=new MatTableDataSource(this.log)
    })
  }
   
    ngOnDestroy(){

    }

}

