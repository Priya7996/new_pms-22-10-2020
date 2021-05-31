import { Component, OnInit,Inject } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import Swal from 'sweetalert2'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MachineService} from '../../Service/app/machine.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-machine-registration',
  templateUrl: './machine-registration.component.html',
  styleUrls: ['./machine-registration.component.scss']
})
export class MachineRegistrationComponent implements OnInit {
  tenant:any;
  myLoader = false;
  machine_response: any;
  Role_NAME:any;
  constructor(private fb:FormBuilder,public dialog: MatDialog,private nav:NavbarService,private service:MachineService) {
    this.nav.show()
    this.tenant=localStorage.getItem('tenant_id');
    this.Role_NAME = localStorage.getItem('role_name')
    console.log(this.Role_NAME);

   }
   add_registartion(): void {
    const dialogRef = this.dialog.open(Add, {
      width: '30%',
      height:'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  edit_view(data1): void {
    const dialogRef = this.dialog.open(Edit, {
      width: '30%',
      height:'auto',
      data:data1
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();

    });
  }
  setting_view(data): void {
    const dialogRef = this.dialog.open(Settings, {
      width: '30%',
      height:'auto%',
      data:data
    });

    dialogRef.afterClosed().subscribe(result => {
 
      this.ngOnInit();

    });
  }

  usernot(){
    Swal.fire("You are not allow to access.Please contact Admin")

  }
  view_setting(data): void {
    const dialogRef = this.dialog.open(Distance, {
      width: '30%',
      height:'auto%',
      data:data
    });

    dialogRef.afterClosed().subscribe(result => {
 
      this.ngOnInit();

    });
  }

  ngOnInit() {
    this.myLoader = true;
    this.service.card(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      this.myLoader = false;

      this.machine_response=res;
    })
  }
  
  delete_view(id) {
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
  selector: 'add-page',
  templateUrl: 'add.html',
  styleUrls: ['./machine-registration.component.scss']

})
export class Add {
  login: any;
  add_val: any;
  tenant: any;
  controller_type:any;
  
  
  constructor(public dialogRef: MatDialogRef<Add>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,private service:MachineService) {
   this.tenant = localStorage.getItem('tenant_id') 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  cancel() {
    this.dialogRef.close();
  }
  ngOnInit()
  {
    this.login=this.fb.group({
      machine_type:["",Validators.required],
      machine_name:["",Validators.required],
      machine_model:["",Validators.required],
      machine_serial_no:["",Validators.required],
      machine_ip:["",Validators.required],
      unit:["",Validators.required],
      device_id:["",Validators.required],
      controller_type:["",Validators.required],
    //   border_rate:["",],
    //   t1_ip:["",]
     
    })
   
  }
  form()
  {
     this.add_val = this.login.value;
     console.log(this.add_val);
     this.add_val["tenant_id"] = this.tenant
    //  this.add_val["controller_type"]=this.controller_type;

    this.service.machine(this.login.value).pipe(untilDestroyed(this)).subscribe(res => {
      Swal.fire(res.msg)
      this.dialogRef.close();

  })
}
machineSelect(machine){
     this.controller_type=machine
}

ngOnDestroy(){

}
}
@Component({
  selector: 'edit-page',
  templateUrl: 'edit.html',
  styleUrls: ['./machine-registration.component.scss']

})
export class Edit {
  login: FormGroup;
  edit_data:any;
  tenant: any;
  add_val: any;
  edit_data1:any;
  controller_type:any;

  constructor(public dialogRef: MatDialogRef<Edit>,@Inject(MAT_DIALOG_DATA) public data1: any,private fb:FormBuilder,private service:MachineService) {
     this.edit_data1 = data1;
     console.log(this.edit_data1)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  machineSelect(machine){
    this.controller_type=machine
}
  ngOnInit()
  {  this.tenant = localStorage.getItem('tenant_id')

    this.login=this.fb.group({
      machine_type:[this.edit_data1.machine_type],
      machine_name:[this.edit_data1.machine_name],
      machine_model:[this.edit_data1.machine_model],
      machine_serial_no:[this.edit_data1.machine_serial_no],
      machine_ip:[this.edit_data1.machine_ip],
      unit:[this.edit_data1.unit],
      device_id:[this.edit_data1.device_id],
      controller_type:[this.edit_data1.controller_type],
    //   border_rate:[this.edit_data1.controller_type],
    //   t1_ip:[this.edit_data1.controller_type]

    })
  }
  loginforum()
  {
    this.add_val = this.login.value 
    this.add_val["tenant_id"] = this.tenant;
    this.service.edit(this.edit_data1.id,this.add_val).pipe(untilDestroyed(this)).subscribe(res => {
      Swal.fire(res.msg)
      // if(res === true){
      //   Swal.fire("Updated Suceesfully")
      // }
      this.dialogRef.close();
    })
  }
  cancel() {
    this.dialogRef.close();
  }
 
  ngOnDestroy(){

  }

}
@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html',
  styleUrls: ['./machine-registration.component.scss']


})
export class Settings {
  tenant: any;
  settings_data:any;
  status:any;
  toggle_status:any;
  toggle_id:any;
  constructor(public dialogRef: MatDialogRef<Add>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,private service:MachineService) {
    this.tenant=localStorage.getItem('tenant_id');
    this.settings_data=data;
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit()
  {
     this.service.settinglist(this.settings_data.id,this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.status=res
     })

     
  }
  notify(e,s){
    this.toggle_id=s.id
    this.toggle_status=e.checked;
    this.service.statuschange(this.toggle_id,this.toggle_status).pipe(untilDestroyed(this)).subscribe(res =>{
      if(res === true)
      {
        Swal.fire("Updated Succesfully !")
      }
      else{
        Swal.fire("Updated Sucessfully !")
      }
    //  this.dialogRef.close();
      // this.ngOnInit();

     
    })
  }
 


  ngOnDestroy(){

  }

}


@Component({
  selector: 'distance-page',
  templateUrl: 'distance.html',
  styleUrls: ['./machine-registration.component.scss']

})
export class Distance {
  login: any;
  add_val1: any;
  tenant: any;
  controller_type:any;
  edit_data1:any;
  constructor(public dialogRef: MatDialogRef<Distance>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,private service:MachineService) {
   this.tenant = localStorage.getItem('tenant_id');
   this.edit_data1 = data;
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  cancel() {
    this.dialogRef.close();
  }
  ngOnInit()
  {
    this.login=this.fb.group({
      dis_min:["",Validators.required],
      dis_sec:["",Validators.required],
      dis_tot:["",Validators.required],
     

     
    })
   
  }
  form()
  {
    console.log(this.login.value);
     this.add_val1 = this.login.value;
    //  this.add_val1 = this.edit_data1;
    
     console.log(this.add_val1);
    //  this.add_val["tenant_id"] = this.tenant
    //  this.add_val["controller_type"]=this.controller_type;

    this.service.machine_logs( this.edit_data1.id, this.add_val1).pipe(untilDestroyed(this)).subscribe(res => {
      Swal.fire('created successfully')
      this.dialogRef.close();

  })
}
machineSelect(machine){
     this.controller_type=machine
}

ngOnDestroy(){

}
}
