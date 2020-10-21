import { Component, OnInit } from '@angular/core';
import { ReflectService } from '../../Service/app/reflect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reflect',
  templateUrl: './reflect.component.html',
  styleUrls: ['./reflect.component.scss']
})
export class ReflectComponent implements OnInit {
  reflect:any;
  myLoader= false;
  constructor(private service:ReflectService,private route:Router) { }

  ngOnInit() {
    this.myLoader= true;

    this.service.get_reason().subscribe(res =>{
      console.log(res);
      
      this.myLoader= false;

      this.reflect = res;
    })
  }
routes(reason,id){

  console.log(localStorage.getItem('machine_name'))

  console.log(localStorage.getItem('machine_id'));
  let name = localStorage.getItem('machine_name');
  let machineID = localStorage.getItem('machine_id')
  console.log(reason,id)
  let data = {'reason':reason, 'reason_id':id, 'machine_name':name, 'machine_id':machineID}
  console.log(data);

  this.myLoader= true;
  this.service.redirect(data).subscribe(res =>{
     console.log(res);
     this.myLoader= false;

     console.log(res.machine)
     localStorage.setItem('machine',res.machine)
          //localStorage.setItem('machine',res.machine)

     localStorage.setItem('reason',res.reason)
  this.route.navigateByUrl('/oee_dashboard');
     
    //  this.router.navigate(['/oee_dashboard'], { queryParams: { machine_name: name } });



  })

}
}
