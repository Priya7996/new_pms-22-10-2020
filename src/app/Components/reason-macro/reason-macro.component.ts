import { Component, OnInit,Inject } from '@angular/core';
import { NavbarService } from '../../Nav/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormArray, FormControl, Validators,FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ReasonMacroService } from '../../Service/app/reason-macro.service';

@Component({
  selector: 'app-reason-macro',
  templateUrl: './reason-macro.component.html',
  styleUrls: ['./reason-macro.component.scss']
})
export class ReasonMacroComponent implements OnInit {

  // displayedColumns: string[] = ['first_name', 'email_id', 'phone_number', 'role_name', 'action'];
  // dataSource = new MatTableDataSource();
  tenant: any;
  roles_list: any;
  Role_NAME:any;
  myLoader = false;
  machine_response:any;
  constructor(private nav: NavbarService, private fb: FormBuilder, public dialog: MatDialog, private service: ReasonMacroService) {
    this.nav.show();
    this.tenant = localStorage.getItem('tenant_id')
    this.Role_NAME = localStorage.getItem('role_name')
    console.log(this.Role_NAME);

  }

  usernot(){
    Swal.fire("You are not allow to access.Please contact Admin")

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
  test(): void {
    const dialogRef = this.dialog.open(Dialog, {
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
  ngOnInit() {
  
    this.myLoader = true;
    this.service.list().pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.machine_response = res;
     this. myLoader = false;
      // this.dataSource = new MatTableDataSource(this.back)

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
                  Swal.fire(res.msg)

              
            //   if(res){
            //   Swal.fire("Deleted Successfully!")
            // }
            // else{
            //   Swal.fire("Deleted Failed!")

            //}
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
  styleUrls: ['./reason-macro.component.scss']
})
export class User {
  login: any;
  form: any;
  tenant: string;
  user: string;
  approval: string;
  role: any;
  add_val: any;
  show_status: any;
  is_active:any;
  constructor(private service: ReasonMacroService, public dialogRef: MatDialogRef<User>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, ) {

    this.tenant = localStorage.getItem('tenant_id');
    this.user = localStorage.getItem('usertype_id')
    this.approval = localStorage.getItem('approval_id')
    this.role = localStorage.getItem('role_id');


  }
  cancel() {
    this.dialogRef.close();
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
  ngOnInit() {

    this.login = this.fb.group({
      name: ["", Validators.required],
      spec_id: ["", Validators.required],
     
    })
  }

  logintest() {
    console.log(this.login.value)
          this.dialogRef.close();
          this.is_active = true;

    let data = {'name': this.login.value.name, 'is_active': this.is_active,'spec_id':this.login.value.spec_id}
    console.log(data);

     this.service.Send_data(data).pipe(untilDestroyed(this)).subscribe(res => {
       console.log(res);
       Swal.fire(res.msg)
       this.dialogRef.close();
     })
  
  
  }
  ngOnDestroy(){

  } 
  
}
@Component({
  selector: 'edit-page',
  templateUrl: 'edit.html',
  styleUrls: ['./reason-macro.component.scss']
})
export class Edit {
  login: any;
  form: any;
  add_val: any;
  tenant: any;
  user: any;
  is_active:any;

  approval: any;
  role: any;
  edit_data: any;
  constructor(private service: ReasonMacroService, public dialogRef: MatDialogRef<Edit>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, ) {
 
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
      name: [this.edit_data.name, Validators.required],
      spec_id: [this.edit_data.spec_id, Validators.required],
     

    })

  

  }

  editdata() {
    console.log(this.login.value);
    console.log(this.login.value,this.edit_data.id);
    this.is_active = true;
    let data = { 'is_active': this.is_active,'name': this.login.value.name,'spec_id':this.login.value.spec_id}

 
   
    this.service.edit(this.edit_data.id,data).pipe(untilDestroyed(this)).subscribe(res => {
    
      this.dialogRef.close();

      Swal.fire(res.msg)

      this.dialogRef.close();
    })
  }
  ngOnDestroy(){

  } 
  
}




@Component({
  selector: 'dialog-page',
  templateUrl: 'dialog.html',
  styleUrls: ['./reason-macro.component.scss']
})
export class Dialog {
  login:FormGroup;
  constructor(private service: ReasonMacroService, public dialogRef: MatDialogRef<Dialog>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, ) {

    


  }
 

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  ngOnInit() {
     this.login = this.fb.group({
      name:["",],spec_id:[""]
     })
    
  }

  logintest_func(){
    console.log(this.login.value);
    this.service.VAPMS(this.login.value).subscribe(res =>{
      console.log(res);
      Swal.fire(res.msg)
      this.dialogRef.close();
    })
  }
  
  
}