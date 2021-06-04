import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavbarService } from '../../Nav/navbar.service';
import { LoginService } from '../../Service/app/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  login: FormGroup;
  hide: boolean = true;
  show: boolean = true;
  fo_id:any;
  tenant:any;
  fo_ln:any;
  fo_fn:any;
  constructor(private fb: FormBuilder, public dialog: MatDialog, private nav: NavbarService, private service: LoginService, private router: Router) {
    this.nav.hide();
    this.tenant=localStorage.getItem('tenant_id')

    this.fo_id = localStorage.getItem('fid')
    this.fo_fn = localStorage.getItem('forgotpage_fname')
    this.fo_ln = localStorage.getItem('forgotpage_lname')
    console.log(this.fo_fn,this.fo_ln)

    console.log(this.fo_id)
   
    if(this.fo_id == null){
      Swal.fire("You are not allow to change password.Try it again");
      this.router.navigateByUrl('');

    }
  }
  ngOnInit() {
   
   this.login = this.fb.group({
      password: ["", Validators.required],
      con_password: ["", Validators.required]

    })
  }
  logintest(valu) {
    console.log(valu);
 
if(valu.password  === valu.con_password){
  let data = {'default':valu.con_password,'password_digest': valu.con_password,'password': valu.con_password}
  console.log(data);

  this.service.forhot_change(this.fo_id,data).subscribe(res => {
   console.log(res)
   if (res.status === true) {
    Swal.fire(res.msg)
    this.router.navigateByUrl('');

  } else {
    Swal.fire("Something Went wrong")
    
  }



   })

}
else{
  Swal.fire("Password and Conform password is not matched.Please Verify")
}
   


  }



}

