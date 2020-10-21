import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { NavbarService} from '../../Nav/navbar.service';
import { RegisterService} from '../../Service/app/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  login:FormGroup;
  checkModel: any;
  add_val: any;
  tenant: any;
  user: any;
  approval: any;
  role: any;
  constructor(private fb:FormBuilder,private nav:NavbarService,private register:RegisterService,private route:Router) { 
  }

  ngOnInit() 
  { this.tenant=localStorage.getItem('tenant_id');
    this.user=localStorage.getItem('usertype_id')
    this.approval=localStorage.getItem('approval_id')
    this.role =localStorage.getItem('role_id');

    this.login=this.fb.group({

      first_name:["",Validators.required],last_name:["",Validators.required], email_id:["",Validators.email],password:["",Validators.required], phone_number:["",Validators.required], remarks:["",Validators.required], tenant_name:["",Validators.required],address_line1:["",Validators.required], address_line2:["",Validators.required],
      city:["",Validators.required], state:["",Validators.required],country:["",Validators.required], pincode:["",Validators.required], isactive:[false,]

})
  }
  
  onChange($event) {
    this.checkModel = $event.target.checked;
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
    }
   }
   logintest(val)
   {
    
     this.add_val=val;
     this.add_val["tenant_id"] =this.tenant;
     this.add_val["usertype_id"] =this.user;
     this.add_val["approval_id"] =this.approval;
     this.add_val["role_id"] =this.role;

    
     this.login.reset();
     this.register.senddata(this.add_val).subscribe(res =>{
    
       if (res === true) {
        Swal.fire('Thank You for registering with Yantra24x7')
      }
     })
   }
  
}
