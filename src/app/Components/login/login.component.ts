import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavbarService } from '../../Nav/navbar.service';
import { LoginService } from '../../Service/app/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  hide: boolean = true;

  constructor(private fb: FormBuilder, public dialog: MatDialog, private nav: NavbarService, private service: LoginService, private router: Router) {
    this.nav.hide();
  }
  ngOnInit() {
    this.login = this.fb.group({
      email_id: ["", Validators.email],
      password: ["", Validators.required]
    })
  }
  logintest(val) {
    localStorage.setItem('password',val.password)
    this.service.signin(val).subscribe(res => {
      if (res === false) {
        alert('The Username or Password is incorrect')
      } else {
        this.router.navigateByUrl('/machine_details');
      }
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('tenant_id',res.tenant_id);
      localStorage.setItem('usertype_id',res.usertype_id);
      localStorage.setItem('role_id',res.role_id);
      localStorage.setItem('id',res.id)
      localStorage.setItem("user_id", res.id)
      localStorage.setItem('approval',res.approval_id)
      localStorage.setItem('first_name',res.user.first_name)
      localStorage.setItem('last_name',res.user.last_name);
      localStorage.setItem('shift_id',res.shift_id)
      localStorage.setItem('phone',res.user.phone_number)
      localStorage.setItem('email',res.user.email_id)
      // localStorage.setItem('password',res.user.password)
    })

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '30%',
      height: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}


@Component({
  selector: 'dialog-page',
  templateUrl: 'dialog.html',
  styleUrls: ['./login.component.scss']

})
export class Dialog {
  test: FormGroup;
  constructor(public dialogRef: MatDialogRef<Dialog>, @Inject(MAT_DIALOG_DATA) public data: any, private service: LoginService, private fb: FormBuilder) {
  }

  
  ngOnInit() {
    this.test = this.fb.group({
      email_id: ["", Validators.email],
      phone_number: ["", Validators.required]

    })
  }
  testform(value) {
    this.test.reset();
    this.service.forgot(value).subscribe(res => {
    })

  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}