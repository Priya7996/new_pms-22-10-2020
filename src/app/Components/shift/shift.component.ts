import { Component, OnInit,Inject } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import Swal from 'sweetalert2'
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ShiftService} from '../../Service/app/shift.service';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit {
  displayedColumns: string[] = ['start_time', 'end_time', 'working_hours', 'action'];
  dataSource =new MatTableDataSource;
  myLoader = false;
  list: any;
  tenant: any;
  machine_response: any;
  constructor(private nav:NavbarService,public dialog: MatDialog,private service:ShiftService) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id')

   }
   
   card_edit(data):void{
    const dialogRef = this.dialog.open(Edit, {
      width: '450px',
      height:'auto',
      data:data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(Add, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  shift_edit(data):void{

    const dialogRef = this.dialog.open(Sedit, {
      width: '450px',
      height:'auto',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
            // this.ngOnInit();
    });
  }

  ngOnInit() {
    this.myLoader = true;
    this.service.shift(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.myLoader = false;
      this.machine_response=res;
      this.service.shifttransaction(this.machine_response.id).pipe(untilDestroyed(this)).subscribe(res =>{
        this.list=res;
        this.dataSource=new MatTableDataSource(this.list)
    })
    })

  }
  shift_delete(id)

   {
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
  selector: 'edit-page',
  templateUrl: 'edit.html',


})
export class Edit {
  login:FormGroup;
  add_val: any;
  edit_data: any;
  tenant: any;
  machine_response: any;
  
  constructor(private service:ShiftService,public dialogRef: MatDialogRef<Edit>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder) {
    this.edit_data = data;  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }




  ngOnInit()
  {
    this.tenant=localStorage.getItem('tenant_id')
    this.login=this.fb.group({
      day_start_time:[this.edit_data.day_start_time],
      working_time:[this.edit_data.working_time],
      no_of_shift:[this.edit_data.no_of_shift],
    })
  }
  logintest() {
    this.service.shift(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.machine_response=res;
      this.service.shifttransaction(this.machine_response.id).pipe(untilDestroyed(this)).subscribe(res =>{
    })
    })
    this.add_val = this.login.value
    this.add_val["tenant_id"] = this.tenant;
    this.service.edit(this.edit_data.id, this.add_val).pipe(untilDestroyed(this)).subscribe(res => {
      Swal.fire("Submitted Successfully!")
      this.dialogRef.close();
      // this.ngOnInit();

    })

  }
  ngOnDestroy(){

  }
}
@Component({
  selector: 'sedit-page',
  templateUrl: 'sedit.html',


})
export class Sedit {
  login:FormGroup;
  edit_data1: any;
  tenant:any;
  add_val:any;
  constructor(private service:ShiftService,public dialogRef: MatDialogRef<Sedit>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,) {
    this.edit_data1 = data;
    this.tenant = localStorage.getItem('tenant_id')
 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }




  ngOnInit()
  {
    this.login=this.fb.group({
      shift_start_time:[this.edit_data1.shift_start_time],
      shift_end_time:[this.edit_data1.shift_end_time],
      shift_no:[this.edit_data1.shift_no],
      day:[this.edit_data1.day],
      end_day:[this.edit_data1.end_day],
    })
  }
  loginform()
  {
    this.add_val = this.login.value
    this.add_val["tenant_id"] = this.tenant;
    this.service.shift_edit(this.edit_data1.id, this.add_val).pipe(untilDestroyed(this)).subscribe(res => {
      Swal.fire("Updated Successfully!")
      this.dialogRef.close();
      this.ngOnInit();

    })
  }
  ngOnDestroy(){

  }
  
}
@Component({
  selector: 'add-page',
  templateUrl: 'add.html',
  styleUrls: ['./shift.component.scss']


})
export class Add {
  login:FormGroup;
  add_val: any;
  tenant: any;
  constructor(public dialogRef: MatDialogRef<Add>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,public service:ShiftService) {
  this.tenant = localStorage.getItem('tenant_id')  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  cancel():void{
    this.dialogRef.close();
  }

  ngOnInit()
  {
    this.login=this.fb.group({
      shift_start_time:["",],
      shift_end_time:["",],
      shift_no:["",],
      day:["",],
      end_day:["",],
    })
  }
  logintest()
  {
    this.add_val = this.login.value
    this.add_val["tenant_id"] = this.tenant;
    this.service.post(this.login.value).pipe(untilDestroyed(this)).subscribe(res => {
      Swal.fire("Submitted Successfully!")
      this.dialogRef.close();
    })

  }
  ngOnDestroy(){

  }
}