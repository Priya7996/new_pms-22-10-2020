import { Component, OnInit, Inject } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../Service/app/user.service';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['first_name', 'email_id', 'phone_number', 'role_name', 'action'];
  dataSource = new MatTableDataSource();
  back: any;
  tenant: any;
  roles_list: any;
  roleid: any;
  myLoader = false;
  Role_NAME:any;
  hide: boolean = true;
  constructor(private nav: NavbarService, private fb: FormBuilder, public dialog: MatDialog, private service: UserService) {
    this.nav.show();
    this.tenant = localStorage.getItem('tenant_id')
    this.Role_NAME = localStorage.getItem('role_name')
    console.log(this.Role_NAME);

  }
  user(): void {
    const dialogRef = this.dialog.open(User, {
      width: '450px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
     
      this.ngOnInit();

    });
  }
  user_edit(data): void {

    const dialogRef = this.dialog.open(Edit, {
      width: '450px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
    
      this.ngOnInit();
             this.ngOnInit();
 

    });
  }

  usernot(){
    Swal.fire("You are not allow to access.Please contact Admin")

  }
  ngOnInit() {
    this.service.operator().pipe(untilDestroyed(this)).subscribe(res => {
      this.roles_list = res;
    })
    this.myLoader = true;
    this.service.list(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
     this. myLoader = false;
      this.back = res;
      this.roleid = this.back.role_id
      this.dataSource = new MatTableDataSource(this.back)

    })
  }

  user_delete(id) {
    
    Swal.fire({
      title: 'Are you sure want to delete?',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Please Confirm'
        }).then((destroy) => {
          if (destroy.value) {
            this.service.delete_row(id).pipe(untilDestroyed(this)).subscribe(res => {
              if(res === true){
              Swal.fire("Deleted Sucessfully!")
            }
            else{
              Swal.fire("Deleted Failed!")

            }
              this.ngOnInit()
            })
          }
        })
      }
    })
  }
  ngOnDestroy(){

  } 
  
}


@Component({
  selector: 'user-page',
  templateUrl: 'user.html',
  styleUrls: ['./user-management.component.scss']

})
export class User {
  login: any;
  form: any;
  operator_role: any;
  tenant: string;
  user: string;
  approval: string;
  back: any;
  role: any;
  add_val: any;
  show:any;

  show_status: any;
  hide: boolean = true;
  constructor(private service: UserService, public dialogRef: MatDialogRef<User>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, ) {

    this.tenant = localStorage.getItem('tenant_id');
    this.user = localStorage.getItem('usertype_id')
    this.approval = localStorage.getItem('approval_id')
    this.role = localStorage.getItem('role_id');


  }
  cancel() {
    this.dialogRef.close();
  }
  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getrole(value){
    console.log(value)
    this.show = value;
  }
  ngOnInit() {

    this.login = this.fb.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email_id: ["", Validators.email],
      password: ["", Validators.required],
      phone_number: ["", Validators.required],
      remarks: ["", Validators.required],
      role_id: ["", Validators.required],
      // usertype_id:["",this.user],
      // tenant_id:["",this.tenant],
      // approval_id:["",this.approval],
    })
    this.service.operator().pipe(untilDestroyed(this)).subscribe(res => {
      this.operator_role = res;

    })


    

  }

  logintest() {
    console.log(this.login.value);
    this.add_val = this.login.value;
    this.add_val["tenant_id"] = this.tenant;
    this.add_val["usertype_id"] = this.user;
    this.add_val["approval_id"] = this.approval;
    // this.add_val["role_id"] = this.show;
    // console.log(this.add_val);
    this.service.user(this.login.value).pipe(untilDestroyed(this)).subscribe(res => {
      Swal.fire(res.msg)
      this.dialogRef.close();

    });
  }
  ngOnDestroy(){

  } 
  
}
@Component({
  selector: 'edit-page',
  templateUrl: 'edit.html',
  styleUrls: ['./user-management.component.scss']

})
export class Edit {
  login: any;
  form: any;
  operator_role: any;
  add_val: any;
  tenant: any;
  user: any;
  hide: boolean = true;

  approval: any;
  role: any;
  edit_data: any;
  constructor(private service: UserService, public dialogRef: MatDialogRef<Edit>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, ) {
 
    this.edit_data = data;
    console.log(this.edit_data);
  }

  onNoClick(): void {
    this.dialogRef.close();

    
  }
  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  cancel() {
    this.dialogRef.close();
  }

  
  ngOnInit() {
    this.tenant = localStorage.getItem('tenant_id');

    this.login = this.fb.group({
      first_name: [this.edit_data.first_name, Validators.required],
      last_name: [this.edit_data.last_name, Validators.required],
      email_id: [this.edit_data.email_id, Validators.required],
      //  password: [this.edit_data.password],
      phone_number: [this.edit_data.phone_number, Validators.required],
      remarks: [this.edit_data.remarks],
      role_id: [this.edit_data.role_id, Validators.required]

    })

    this.service.operator().pipe(untilDestroyed(this)).subscribe(res => {
      this.operator_role = res;

    })

  }

  editdata() {
    console.log(this.login.value);
    this.add_val = this.login.value
    this.add_val["tenant_id"] = this.tenant;
   
    this.service.edit(this.edit_data.id, this.add_val).pipe(untilDestroyed(this)).subscribe(res => {
    
      Swal.fire(res.msg)
      this.dialogRef.close();
    })
  }
  ngOnDestroy(){

  } 
  
}
