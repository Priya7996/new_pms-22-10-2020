import { Component, OnInit,Inject} from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormArray,FormControl,FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { OperatorService} from '../../Service/app/operator.service';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-operation-man',
  templateUrl: './operation-man.component.html',
  styleUrls: ['./operation-man.component.scss']
})
export class OperationManComponent implements OnInit {

  displayedColumns: string[] = ['position','operator_name', 'operator_spec_id', 'description','setup_time','created_by','part_per_cycle','created','status','action'];
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
       this.service.operator1(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
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
            this.service.delete_row_man(id).pipe(untilDestroyed(this)).subscribe(res => {
            
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
  styleUrls: ['./operation-man.component.scss']
})

export class Edit {
  login:FormGroup;
  tenant: any;
  add_val:any;
  role_name:any;
  meridian = true;
  seconds = true;
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
  { this.tenant=localStorage.getItem('tenant_id');
    this.login=this.fb.group({
      operation_name:["",Validators.required],
      operation_id:["",Validators.required],
      std_cycle_time:[""],
      load_unload_time:[""],
      part_per_cycle:[""],
      setup_time:[""],
      status:[""]
    }) 
  }

  convertTimeAM(time) {
    let AMPM;
    let hour;
    if (time.hour >= 12) {
      if (time.hour > 12) {
        hour = time.hour - 12;
      } else if(time.hour == 12){
        hour = time.hour;
      }
      AMPM = 'PM';
    } else {
      hour = time.hour;
      AMPM = 'AM';
    }
    const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;
    return time != null ? `${pad(hour)}:${pad(time.minute)}:${pad(time.second)} ${AMPM}` : null;
  }
  convertTime(time) {
    let hour;
    if (time.hour >= 12) {
      hour = time.hour - 12;
    } else {
      hour = time.hour;
    }
    const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;
    return time != null ? `${pad(hour)}:${pad(time.minute)}:${pad(time.second)}` : null;
  }

  TimeAM(time) {
    if (!time) {
      return null;
    }
    const split = time.split(':');
    const AM = time.split(' ');
    let hours;
    if (AM[1] === 'PM') {
      hours = parseInt(split[0], 10) + 12;
    } else {
      hours = parseInt(split[0], 10);
    }
    return {
      hour: hours,
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  Time(time) {
    if (!time) {
      return null;
    }
    const split = time.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }



  logintest() {

    // this.add_val=this.login.value;
    // this.add_val["tenant_id"] =this.tenant ;
    console.log(this.login.value)
    let datas = this.login.value;
    // data.shift_id = this.shiftonkay
    datas.std_cycle_time = this.convertTimeAM(this.login.value.std_cycle_time)
    datas.load_unload_time = this.convertTimeAM(this.login.value.load_unload_time)
    datas.setup_time = this.convertTime(this.login.value.setup_time)  
    console.log(datas);
   // console.log(this.add_val)
    let data = {'operation_name': this.login.value.operation_name, 'operation_id':this.login.value.operation_id,'std_cycle_time': this.login.value.std_cycle_time,'load_unload_time':this.login.value.load_unload_time,'part_per_cycle': this.login.value.part_per_cycle,'setup_time': this.login.value.setup_time,'status': this.login.value.status,'tenant_id':this.tenant}
    console.log(data);

    this.service.post1(data).pipe(untilDestroyed(this)).subscribe(res => {
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
  styleUrls: ['./operation-man.component.scss']
})
export class Add {
  login:FormGroup;
  add_val:any;
  tenant:any;
  edit_data:any;
  meridian = true;
  seconds = true;
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

   convertTimeAM(time) {
    let AMPM;
    let hour;
    if (time.hour >= 12) {
      if (time.hour > 12) {
        hour = time.hour - 12;
      } else if(time.hour == 12){
        hour = time.hour;
      }
      AMPM = 'PM';
    } else {
      hour = time.hour;
      AMPM = 'AM';
    }
    const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;
    return time != null ? `${pad(hour)}:${pad(time.minute)}:${pad(time.second)} ${AMPM}` : null;
  }
  convertTime(time) {
    let hour;
    if (time.hour >= 12) {
      hour = time.hour - 12;
    } else {
      hour = time.hour;
    }
    const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;
    return time != null ? `${pad(hour)}:${pad(time.minute)}:${pad(time.second)}` : null;
  }

  TimeAM(time) {
    if (!time) {
      return null;
    }
    const split = time.split(':');
    const AM = time.split(' ');
    let hours;
    if (AM[1] === 'PM') {
      hours = parseInt(split[0], 10) + 12;
    } else {
      hours = parseInt(split[0], 10);
    }
    return {
      hour: hours,
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  Time(time) {
    if (!time) {
      return null;
    }
    const split = time.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }
  ngOnInit()
  {

  
    let shift = this.edit_data;

    this.tenant=localStorage.getItem('tenant_id');
    this.login=this.fb.group({
      operation_name:[this.edit_data.operation_name],
      operation_id:[this.edit_data.operation_id],
      std_cycle_time:[this.TimeAM(shift.std_cycle_time)],
      load_unload_time:[this.TimeAM(shift.load_unload_time)],
      part_per_cycle:[this.edit_data.part_per_cycle],
      setup_time:[this.TimeAM(shift.setup_time)],
      status:[this.edit_data.status],


    })
  }

  editdata() {


    let dat = this.login.value;
    // data.shift_id = this.shiftonkay
    dat.std_cycle_time = this.convertTimeAM(this.login.value.std_cycle_time)
    dat.load_unload_time = this.convertTimeAM(this.login.value.load_unload_time)
    dat.setup_time = this.convertTime(this.login.value.setup_time)  
    let datak = {'operation_name': this.login.value.operation_name, 'operation_id':this.login.value.operation_id,'std_cycle_time': this.login.value.std_cycle_time,'load_unload_time':this.login.value.load_unload_time,'part_per_cycle': this.login.value.part_per_cycle,'setup_time': this.login.value.setup_time,'status': this.login.value.status,'tenant_id':this.tenant}
    console.log(datak);
   

   
  
    this.service.put1(this.edit_data.id,datak).pipe(untilDestroyed(this)).subscribe(res =>{
    Swal.fire(res.msg)
    this.dialogRef.close();
})
}



ngOnDestroy(){

}

}