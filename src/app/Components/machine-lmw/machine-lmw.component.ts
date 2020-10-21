import { Component, OnInit } from '@angular/core';
import { MachineLmwService } from 'src/app/Service/app/machine-lmw.service';
import { NavbarService } from '../../Nav/navbar.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-machine-lmw',
  templateUrl: './machine-lmw.component.html',
  styleUrls: ['./machine-lmw.component.scss']
})
export class MachineLmwComponent implements OnInit {
  machine_list: any;
  myLoader= false;
  constructor(private service:MachineLmwService,private nav:NavbarService,private router:Router) {
    this.nav.hide();

   }

  ngOnInit() {

    localStorage.clear();

    this.myLoader=true;
    this.service.machine_lmw().subscribe(res =>{
       console.log(res);
       this.myLoader=false;
 
       this.machine_list = res;
       // localStorage.setItem('machine_id', res.id);
 
 
     })
  }

  oee(name,id) {

    console.log(name,id);
    localStorage.setItem('machine_id',id);
    localStorage.setItem('machine_name',name);
    this.router.navigate(['/oee_dashboard'], { queryParams: { machine_name: name } });
  }

}
