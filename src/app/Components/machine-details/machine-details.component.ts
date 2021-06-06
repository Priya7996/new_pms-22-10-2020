import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { MachineDetailsService} from '../../Service/app/machine-details.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-machine-details',
  templateUrl: './machine-details.component.html',
  styleUrls: ['./machine-details.component.scss']
})
export class MachineDetailsComponent implements OnInit {
  machine_response:any;
  GODBless:any;
  tenant: string;
  myLoader = false;
  constructor(private nav:NavbarService,private service:MachineDetailsService,private route:Router) {
    this.nav.show();
    this.tenant = localStorage.getItem('tenant_id')
   }

  ngOnInit() {
    this.myLoader = true;
    this.service.dashboard_lock(this.tenant).subscribe(res =>{
      console.log(res);
      this.GODBless = res;

     
      console.log(this.GODBless);
      this.myLoader = false;
      this.machine_response=res;
     // console.log(this.machine_response.data['Unit - 1'][0]['machine_id'])
     console.log(this.machine_response.data) 
    })
  }
  dashboard(name,id){
    console.log(name,id)
    localStorage.setItem('machine_id',id);
    localStorage.setItem('machine_name',name);        
    this.route.navigate(['/machine_view'],{ queryParams: { machine_id: id } })
  }

  refresh(){
    this.myLoader = true;
    this.service.dashboard_lock(this.tenant).subscribe(res =>{
      console.log(res);
      this.GODBless = res;

     
      console.log(this.GODBless);
      this.myLoader = false;
      this.machine_response=res;
     // console.log(this.machine_response.data['Unit - 1'][0]['machine_id'])
     console.log(this.machine_response.data) 
    })
  }

}
