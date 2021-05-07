import { Component, OnInit,Inject } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormArray,FormControl,FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { OperatorService} from '../../Service/app/operator.service';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-operation-assign',
  templateUrl: './operation-assign.component.html',
  styleUrls: ['./operation-assign.component.scss']
})
export class OperationAssignComponent implements OnInit {

  displayedColumns: string[] = ['Position', 'date', 'machine','shift_num','description','created_by','action'];
  dataSource = new MatTableDataSource();
  tenant: any;
  list: any;
  myLoader= false;
show_status:any;
Role_NAME:any;
  constructor(private datepipe: DatePipe,private nav:NavbarService,private fb:FormBuilder,public dialog: MatDialog,private service:OperatorService)
  {
  this.nav.show();
  this.tenant=localStorage.getItem('tenant_id');
  this.Role_NAME = localStorage.getItem('role_name')
  console.log(this.Role_NAME);
  }


  operator_show(value):void{
    const dialogRef = this.dialog.open(Add, {
    width: '450px',
    height:'auto',
    data:{ val: value}
  });

  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit()
  });
}
  operator_edit(shift,id): void{
      const dialogRef = this.dialog.open(Edit, {
      width: '550px',
      height:'auto',
      data: { edit_shift: shift, shift_id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
  usernot(){
    Swal.fire("You are not allow to access.Please contact Admin")

  }
  ngOnInit() {
   
  

    this.myLoader= true;
       this.service.operator_get_ass().pipe(untilDestroyed(this)).subscribe(res =>{
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
            this.service.delete_row_operass(id).pipe(untilDestroyed(this)).subscribe(res => {
            
             
                Swal.fire(res.msg)
              
              
              
              this.ngOnInit()
            })
          }
        })
      }
    })
  }
  user():void{
    const dialogRef = this.dialog.open(Edit, {
      width: '550px',
      height:'auto',
      data: { new: 'new' }

    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
      

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
  items: FormArray;
  array:any;
  data2:any;
  new_date:any;
  sampletest:any;
  value:any;
  minDate = new Date();

  new_date3:any;
  shift_response:any;
  testg:any;
  constructor(private datepipe: DatePipe,public dialogRef: MatDialogRef<Edit>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,public service :OperatorService) {
    this.role_name = localStorage.getItem('role_name');
    console.log(this.role_name);
    console.log(data)
    // if(data.new === 'new'){
    //   console.log("crt")
    // }
    // else if(data.edit_shift === 'created_at'){
    //   console.log("VAP")
    // }
    this.value = data;
    

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

    
 if (this.value.new) {

    this.login=this.fb.group({
      machine_id:["",Validators.required],
      shift_id:["",Validators.required],
      date:["",Validators.required],
      description:["",Validators.required],
      items: this.fb.array([ this.createItem() ]) 
      })
     }
    else{
      this.login=this.fb.group({
        machine_id:[this.value.edit_shift.machine_id],
        shift_id:[this.value.edit_shift.shifttransaction_id],
        date:[this.value.edit_shift.date],
        description:[this.value.edit_shift.description],
        items: this.fb.array([ this.createItem() ]) 
        })
    } 
  }


  createItem(): FormGroup {
    if (this.value.new) {
      return this.fb.group({
        operator_id: ['', Validators.required],
        operation_management_id: ['', Validators.required]
      });
    } else {
      return this.fb.group({
       
        operator_id: [this.value.edit_shift.operator_allot_details[0].operator_id],
        operation_management_id: [this.value.edit_shift.operator_allot_details[0].operation_management_id]
      });
    }
  }
 add(){
  console.log('submitted');

    this.items = this.login.get('items') as FormArray;
    this.items.push(this.createItem());
  }
  adding(){
    alert("Not allow to create operator again")
  }
  logintest() {

   console.log(this.login.value)
 
   if (this.value.new) {

    this.new_date = new DatePipe('en-US').transform(this.login.value.date, 'dd-MM-yyyy');


    let data = {'machine_id': this.login.value.machine_id, 'shifttransaction_id':this.login.value.shift_id,'date':this.new_date,'tenant_id':this.tenant,'description':this.login.value.description,'operator_allot_details_attributes':this.login.value.items}

    let data1 = {"operator_allocation":data}
    console.log(data1);

    this.service.post_oper_ass(data1).pipe(untilDestroyed(this)).subscribe(res => {
    Swal.fire(res.msg)
    console.log(res.msg);

    this.dialogRef.close(status);
    

    })
  }
    else{

      this.new_date3 = new DatePipe('en-US').transform(this.login.value.date, 'dd-MM-yyyy');


    let datas = {'machine_id': this.login.value.machine_id, 'shifttransaction_id':this.login.value.shift_id,'date':this.new_date3,'tenant_id':this.tenant,'description':this.login.value.description,'operator_allot_details_attributes':this.login.value.items}

    let data5 = {"operator_allocation":datas}
    console.log(data5);

      console.log(this.value.edit_shift, this.value.shift_id)
      this.service.shift_put_ass(this.value.shift_id,data5).subscribe(res => {
        Swal.fire(res.msg)

          console.log(res);
          this.dialogRef.close();
        })
    }
  }

  ngOnDestroy(){

  }
}

@Component({
  selector: 'add-page',
  templateUrl: 'add.html',
  styleUrls: ['./operation-assign.component.scss']
})
export class Add {
  login:FormGroup;
  add_val:any;
  tenant:any;
  edit_data1:any;
  items: FormArray;
  val:any;
  out:any;
  constructor(public dialogRef: MatDialogRef<Add>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,private service:OperatorService) 
  {
    this.val=data.val.operator_allot_details;
    this.out = data.val;
    console.log(this.out)
    console.log(this.val);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

 
  ngOnInit() 
  {
   
  }
 
 






}