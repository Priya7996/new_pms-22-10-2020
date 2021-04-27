import { Component, OnInit,Inject } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormArray,FormControl,FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { OperatorService} from '../../Service/app/operator.service';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-operation-assign',
  templateUrl: './operation-assign.component.html',
  styleUrls: ['./operation-assign.component.scss']
})
export class OperationAssignComponent implements OnInit {

  displayedColumns: string[] = ['operator_name', 'operator_spec_id', 'description','created_by','action','shift','date'];
  dataSource = new MatTableDataSource();
  tenant: any;
  list: any;
  myLoader= false;
show_status:any;
Role_NAME:any;
  constructor(private nav:NavbarService,private fb:FormBuilder,public dialog: MatDialog,private service:OperatorService)
  {
  this.nav.show();
  this.tenant=localStorage.getItem('tenant_id');
  this.Role_NAME = localStorage.getItem('role_name')
  console.log(this.Role_NAME);
  }
  operator_edit(data): void{
      const dialogRef = this.dialog.open(Add, {
      width: '450px',
      height:'auto',
      data:data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  usernot(){
    Swal.fire("You are not allow to access.Please contact Admin")

  }
  ngOnInit() {
   
  

    this.myLoader= true;
       this.service.operator_get_ass(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
       this.myLoader= false;
       this.list=res;
       this.dataSource=new MatTableDataSource(this.list)
    })
  }


  // operator_delete(id)
  
  operator_delete(id) {
   
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
            
              if(res.status === true)
              {
                Swal.fire("Deleted Succesfuly !")
              }
              else{
                Swal.fire("Delete Failed")
              }
              
              this.ngOnInit()
            })
          }
        })
      }
    })
  }
  user():void{
    const dialogRef = this.dialog.open(Edit, {
      width: '450px',
      height:'auto'
    });
    dialogRef.afterClosed().subscribe(result => {
     
             this.ngOnInit();
 
      

    });
  }
  
ngOnDestroy(){

}
}

@Component({
  selector: 'edit-page',
  templateUrl: 'edit.html',
  styleUrls: ['./operation-assign.component.scss']
})

export class Edit {
  login:FormGroup;
  tenant: any;
  add_val:any;
  role_name:any;
  operation_id_response:any;
  machine_response:any;
  operator_response:any;
  shift_response:any;
  constructor(public dialogRef: MatDialogRef<Edit>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,public service :OperatorService) {
    this.role_name = localStorage.getItem('role_name');
    console.log(this.role_name);

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
  ngOnInit()
  { 
    this.tenant=localStorage.getItem('tenant_id');

    this.service.list_machine(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.machine_response=res;
   })
   this.service.list_operation_id(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
    this.operation_id_response=res;
 })


   this.service.list_operator(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
    this.operator_response=res;
 })

 this.service.shiftidentity(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
   console.log(res);
   console.log(res.id)

  this.service.shift(res.id).subscribe(res => {
   this.shift_response=res; 
  })
})
    
    
    this.login=this.fb.group({
      machine_id:["",],
      shift_id:["",],
      operator_id:[""],
      operation_id:[""],
      from_date:[""],
      to_date:[""],
      description:["",Validators.required],
    }) 
  }
  logintest() {

    // this.add_val=this.login.value;
    // this.add_val["tenant_id"] =this.tenant ;
   console.log(this.login.value)

   // console.log(this.add_val)
    let data = {'machine_id': this.login.value.machine_id, 'shift_id':this.login.value.shift_id,'operator_id': this.login.value.operator_id,'operation_id':this.login.value.operator_id,'from_date':this.login.value.from_date,'to_date':this.login.value.to_date,'tenant_id':this.tenant}
    console.log(data);

    this.service.post_oper_ass(data).pipe(untilDestroyed(this)).subscribe(res => {
    Swal.fire(res.msg)
    console.log(res.msg);

    this.dialogRef.close(status);
   

    })
  }

  ngOnDestroy(){

  }}

@Component({
  selector: 'add-page',
  templateUrl: 'add.html',
  styleUrls: ['./operation-assign.component.scss']
})
export class Add {
  login:FormGroup;
  add_val:any;
  tenant:any;
  edit_data:any;

  constructor(public dialogRef: MatDialogRef<Add>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,private service:OperatorService) 
  {
    this.edit_data=data;
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
  ngOnInit()
  {
    this.tenant=localStorage.getItem('tenant_id');
    this.login=this.fb.group({
    operator_name:[this.edit_data.operator_name],
    operator_spec_id:[this.edit_data.operator_spec_id],
    description:[this.edit_data.description],
    })
  }

  editdata() {
    this.add_val=this.login.value
    this.add_val["tenant_id"] =this.tenant ;
    this.service.put(this.edit_data.id,this.add_val).pipe(untilDestroyed(this)).subscribe(res =>{
    Swal.fire(res.msg)
    this.dialogRef.close();
})
}



ngOnDestroy(){

}

}