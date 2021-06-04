import { Component, OnInit,Inject } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import Swal from 'sweetalert2'
import { FormGroup, FormBuilder,Validators,FormControl} from '@angular/forms';
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
  displayedColumns: string[] = ['start_time', 'end_time', 'break_time','working_hours', 'action'];
  dataSource =new MatTableDataSource;
  myLoader = false;
  controls: any;
  Role_NAME:any;
  list: any;
  tenant: any;
  SHIFT_ID:any;
  machine_response: any;
  constructor(private nav:NavbarService,public dialog: MatDialog,private service:ShiftService) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id');
    this.Role_NAME = localStorage.getItem('role_name')
    console.log(this.Role_NAME);

   }
   usernot(){
    Swal.fire("You are not allow to access.Please contact Admin")

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
      width: '500px',
      data: { new: 'new' }
    });

    dialogRef.afterClosed().subscribe(result => {
       this.ngOnInit();
    });
  }

  shift_edit(shift, id) {
    const dialogRef = this.dialog.open(Add, {
      width: '500px',
      data: { edit_shift: shift, shift_id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
       this.ngOnInit();
    });
  }

  ngOnInit() {
    this.myLoader = true;
    this.service.shift(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.myLoader = false;
      this.machine_response=res;
      this.SHIFT_ID = res.id;
      localStorage.setItem('SHIFT_IDEN', res.id);

      console.log(this.SHIFT_ID);
      console.log(this.machine_response.id);
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
              if(res === true)
              {
                Swal.fire("Deleted Succesfully !")
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
  meridian = true;
  seconds = true;
  constructor(private service:ShiftService,public dialogRef: MatDialogRef<Edit>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder) {
    this.edit_data = data;  
  }

  onNoClick(): void {
    this.dialogRef.close();
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
    this.tenant=localStorage.getItem('tenant_id')
    this.login=this.fb.group({
      day_start_time:["",Validators.required],
      // working_time:["",Validators.required],
      no_of_shift:["",Validators.required],
    })
  }
  logintest() {
    
    // this.service.shift(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
    //   this.machine_response=res;
    //   this.service.shifttransaction(this.machine_response.id).pipe(untilDestroyed(this)).subscribe(res =>{
    // })
    // })
    let register = {
      "day_start_time": this.convertTimeAM(this.login.value.day_start_time),
       "working_time": "00:00:00",
      "no_of_shift": this.login.value.no_of_shift,
      "tenant_id":this.tenant
        }
        console.log(register);
    // data.day_start_time = this.convertTimeAM(this.login.value.day_start_time)
    this.service.edit(register).pipe(untilDestroyed(this)).subscribe(res => {
      Swal.fire("Created successfully!")
      this.dialogRef.close();
      // this.ngOnInit();

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
  shiftForm: FormGroup;
  difference: any;
  value: any;
  shiftonkay:any;
  myLoader = false;
  meridian = true;
  seconds = true;
  tenant:any;
  end_day = [
    { name: 'Day 1', value: 1 },
    { name: 'Day 2', value: 2 },
  ]


  constructor(public dialogRef: MatDialogRef<Add>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private shift: ShiftService) {
    this.value = data;
    console.log(this.value);
    this.tenant=localStorage.getItem('tenant_id');
    this.shiftonkay=localStorage.getItem('SHIFT_IDEN');
    

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.value.new) {
      this.shiftForm = this.fb.group({
        shift_start_time: ["", Validators.required],
        shift_end_time: ["", Validators.required],
        break_time:["",Validators.required],
        shift_no: ["", Validators.required],
        day: ["", Validators.required],
        end_day: ["", Validators.required],
      })
    } else {
      let shift = this.value.edit_shift;
      this.shiftForm = this.fb.group({
        shift_start_time: [this.TimeAM(shift.shift_start_time),Validators.required],
        shift_end_time: [this.TimeAM(shift.shift_end_time),Validators.required],
        break_time:[this.Time(shift.break_time),Validators.required],
        shift_no: [this.value.edit_shift.shift_no,Validators.required],
        day: [this.value.edit_shift.day,Validators.required],
        end_day: [this.value.edit_shift.end_day,Validators.required],
      })
    }
  }
  submit() {
    console.log(this.shiftForm.value)
    if (this.shiftForm.invalid) {
      return; 
    }
  
    let data = this.shiftForm.value;
    data.tenant_id = this.tenant;
    data.shift_id = this.shiftonkay
    data.shift_start_time = this.convertTimeAM(this.shiftForm.value.shift_start_time)
    data.shift_end_time = this.convertTimeAM(this.shiftForm.value.shift_end_time)
    data.break_time = this.convertTime(this.shiftForm.value.break_time)  
    console.log(data);
     
if (this.value.new) {
      this.myLoader = true;
      this.shift.post(data).pipe(untilDestroyed(this)).subscribe(res => {
        console.log(res);
        this.myLoader = false;
         Swal.fire(res.msg);

        this.dialogRef.close();
      })
    } 
    else {
      this.myLoader = true;
      this.shift.shift_edit(this.value.edit_shift.id,this.shiftForm.value).pipe(untilDestroyed(this)).subscribe(res => {
        this.myLoader = false;
        Swal.fire(res.msg);

        this.dialogRef.close();
      })
    }
  }

  end_day_validation(val) {
    if (val === '2') {
      this.end_day = [
        { name: 'Day 2', value: 2 },
      ]
    } else {
      this.end_day = [
        { name: 'Day 1', value: 1 },
        { name: 'Day 2', value: 2 },
      ]
    }

  }

 // convertTimeAM(time) {
  //   let AMPM;
  //   let hour;
  //   if (time.hour >= 12) {
  //     hour = time.hour - 12;
  //     AMPM = 'PM';
  //   } else {
  //     hour = time.hour;
  //     AMPM = 'AM';
  //   }
  //   const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;
  //   return time != null ? `${pad(hour)}:${pad(time.minute)}:${pad(time.second)} ${AMPM}` : null;
  // }




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




 

  

  ngOnDestroy() { }


}