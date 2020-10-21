import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { NotificationService} from '../../Service/app/notification.service';
import Swal from 'sweetalert2'
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  show: boolean = false;
  tenant: any;
  myLoader=false;
  alarm_setting: any;
  timeinterval:any=[];
  times:any = ["5","10","15","20","25","30","35","40","45","50","55","60"];
  interval: FormGroup;
  interval_index:any;
  notification_id:any;
  timeChanged:any;
  hide:boolean = false;
  updatedTimeInterval:any;
  constructor(private nav:NavbarService,private service:NotificationService,private fb:FormBuilder) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id')
}

  ngOnInit() {
    this.interval = this.fb.group({
      timeintervel: ['']
    });
    this.myLoader=true;
    this.service.notification(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.myLoader=false;
      this.alarm_setting=res;
      for(let i=0;i<this.alarm_setting.length;i++){
       this.timeinterval.push(this.alarm_setting[i].time_interval);
      }
    })

  }
  test(i,id){
    this.updatedTimeInterval = ""
    this.hide = true;
    this.notification_id = id;
    this.interval_index = i;
  }
  edit_view(time) {
    let data = {time_interval: time}
    this.service.timeinterval(this.notification_id,data).pipe(untilDestroyed(this)).subscribe(res =>{
      this.hide = false;
      this.timeChanged = res;
      this.updatedTimeInterval = res.time_interval
      this.interval.setValue({
        timeintervel: res.time_interval
        
      })
      if(res)
              {
                Swal.fire("Updated Succesfully !")
              }
              else{
                Swal.fire("Updated Failed")
              }
    });
  //  this.ngOnInit()

  }
  
 
  notify(e,n) {
    let data = {
      id: n.id,
      active: e.checked
    };
    this.service.setStatus(data).pipe(untilDestroyed(this)).subscribe(res => {
      if(res === true)
      {
        Swal.fire("Updated Successfully");
        this.ngOnInit();
      }
    })
  }
  

  ngOnDestroy(){

  }
}