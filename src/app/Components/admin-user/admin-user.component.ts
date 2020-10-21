import { Component, OnInit, Inject } from '@angular/core';
import { AdminUserService } from '../../Service/app/admin-user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { NavbarService} from '../../Nav/navbar.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  dataSource = new MatTableDataSource();
  searchText:any;
  public dolly = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    
  }
  displayedColumns: string[] = ['position', 'name', 'weight', ];
  
  // dataSource = [
  // ];
  adminuser: any;
  
  constructor(private service:AdminUserService,public dialog: MatDialog,private nav:NavbarService) { 
    this.nav.show();
  }

  ngOnInit() {
    this.service.third_api().subscribe(res =>{
      console.log(res)
      this.dataSource=new MatTableDataSource(this.adminuser)

    })
  }

  user(): void {
    const dialogRef = this.dialog.open(User, {
      width: '450px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();

    });
  }
  user_edit(data): void {

    const dialogRef = this.dialog.open(Edit, {
      width: '450px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
      console.log('The dialog was closed');
             this.ngOnInit();
 

    });
  }
  user_delete(id) {
    console.log(id)
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
              console.log(res);
              alert("Deleted Successfully!")
              this.ngOnInit()
            })
          }
        })
      }
    })
  }

}


@Component({
  selector: 'user-page',
  templateUrl: 'user.html',

})
export class User {
  login: any;
  form: any;
  operator_role: any;
  tenant: string;
  user: string;
  approval: string;
  back: any;
  hide: boolean = true;

  role: any;
  add_val: any;
  show_status: any;

  constructor(private service: AdminUserService, public dialogRef: MatDialogRef<User>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, ) {

    this.tenant = localStorage.getItem('tenant_id');
    this.user = localStorage.getItem('usertype_id')
    this.approval = localStorage.getItem('approval_id')
    this.role = localStorage.getItem('role_id');


  }
  cancel() {
    this.dialogRef.close();
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
  ngOnInit() {

    this.login = this.fb.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email_id: ["", Validators.email],
      password: ["", Validators.required],
      phone_number: ["", Validators.required],
      remarks: ["", Validators.required],
      // role_id: ["", Validators.required],
      // usertype_id:["",this.user],
      // tenant_id:["",this.tenant],
      // approval_id:["",this.approval],
    })




  

  }

  logintest() {
    console.log(this.login.value);
    this.add_val = this.login.value;
    this.add_val["tenant_id"] = this.tenant;
    this.add_val["usertype_id"] = this.user;
    this.add_val["approval_id"] = this.approval;
    this.add_val["role_id"] = this.role;

    this.service.user(this.login.value).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      Swal.fire("Created Successfully!")
      this.dialogRef.close();

    });
  }
  ngOnDestroy(){

  } 
  
}
@Component({
  selector: 'edit-page',
  templateUrl: 'edit.html',

})
export class Edit {
  login: any;
  form: any;
  operator_role: any;
  add_val: any;
  tenant: any;
  user: any;
  approval: any;
  role: any;
  edit_data: any;
  hide: boolean = true;

  constructor(private service: AdminUserService, public dialogRef: MatDialogRef<Edit>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, ) {
    console.log(data);
    this.edit_data = data;
  }

  onNoClick(): void {
    this.dialogRef.close();

    
  }
  cancel() {
    this.dialogRef.close();
  }

  
  ngOnInit() {
    this.tenant = localStorage.getItem('tenant_id');

    this.login = this.fb.group({
      first_name: [this.edit_data.first_name],
      last_name: [this.edit_data.last_name],
      email_id: [this.edit_data.email_id],
      password: [this.edit_data.password],
      phone_number: [this.edit_data.phone_number],
      remarks: [this.edit_data.remarks],
    })

    

  }
  logintest(){

  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  editdata() {
    console.log(this.login.value);
    // this.add_val=this.login.value;
    // this.add_val["tenant_id"] =this.tenant;
    // this.add_val["usertype_id"] =this.user;
    // this.add_val["approval_id"] =this.approval;
    // this.add_val["role_id"] =this.role;
    // this.service.edit(this.login.value).subscribe(res => {
    //   console.log(res);
    this.add_val = this.login.value
    this.add_val["tenant_id"] = this.tenant;
    console.log(this.add_val)
    this.service.edit(this.edit_data.id, this.add_val).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      Swal.fire("Updated Successfully!")
      this.dialogRef.close();
    })
  }
  ngOnDestroy(){

  } 
  
}
