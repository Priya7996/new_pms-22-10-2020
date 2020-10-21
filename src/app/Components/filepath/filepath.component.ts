import { Component, OnInit,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { NavbarService} from '../../Nav/navbar.service';
import Swal from 'sweetalert2'
import { FilepathService } from 'src/app/Service/app/filepath.service';
import { HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-filepath',
  templateUrl: './filepath.component.html',
  styleUrls: ['./filepath.component.scss']
})
export class FilepathComponent implements OnInit {
  displayedColumns: string[] = ['position', 'machine_name', 'master_location', 'slave_location','action'];
  dataSource = new MatTableDataSource();
  tenant: any;
  result: any;
  myLoader = false;
  constructor(public dialog: MatDialog,private fb:FormBuilder,private nav:NavbarService,private service:FilepathService) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id')

   }
  openDialog(): void {
    const dialogRef = this.dialog.open(Popup, {
      width: '450px',
       data: { new: 'new' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();

    });
  }
  filepath_edit(shift, id): void{

    const dialogRef = this.dialog.open(Edit, {
      width: '450px',
      data: { edit_shift: shift, shift_id: id }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
    this.myLoader = true;
this.service.show_filepath(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
  console.log(res);
  this.myLoader = false;
  this.result = res;
  this.dataSource = new MatTableDataSource(this.result);
})

  }
  filepath_delete(id){
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
              if(res === true)
              {
                Swal.fire("Deleted Succesfully !")
              }
              else{
                Swal.fire("Delete Succesfully")
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
  selector: 'popup-page',
  templateUrl: 'popup.html',
  styleUrls: ['./filepath.component.scss']

})
export class Popup {
  login:FormGroup;
  http: any;
  machinesArray: any;
  tenant_id: string;
  headers: string;
  filepath_response:any;
  tenant: any;
  value:any;
  status:any;
  hide: boolean = true;

  constructor(private service:FilepathService,public dialogRef: MatDialogRef<Popup>,@Inject(MAT_DIALOG_DATA) public data: Popup,private fb:FormBuilder, private filepath: FilepathService) {
   this.value = data;
   console.log(this.value)
    this.tenant=localStorage.getItem('tenant_id')
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {


      this.login = this.fb.group({
        ip: ["",Validators.required],
        user_name: ["",Validators.required],
        pass: ["",Validators.required],
        master_location: ["",Validators.required],
        slave_location: ["",Validators.required],
        machine_id:["",Validators.required]
      })
     
    
    
  this.service.tenant_id().pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.filepath_response=res;
      console.log(localStorage.getItem('token'));});

      this.service.machine(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      console.log(res);
  })
  }
  onSelect(id: any) {
    throw new Error("Method not implemented.");
  }
  
  loginform() {
    console.log(this.login.value);
    this.service.popup(this.login.value).pipe(untilDestroyed(this)).subscribe(res => {
      // console.log(res.status);
      Swal.fire(res['status'])
      
      this.dialogRef.close();
  })

   
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
    }
   }
   
   ngOnDestroy(){

  }
  
}


@Component({
  selector: 'edit-page',
  templateUrl: 'edit.html',
  styleUrls: ['./filepath.component.scss']

})
export class Edit {
  login:FormGroup;
  http: any;
  machinesArray: any;
  tenant_id: string;
  headers: string;
  tenant: any;
  value:any;
  status:any
  service_response: any;
  add_val: any;
  hide: boolean = true;

  constructor(private service:FilepathService,public dialogRef: MatDialogRef<Edit>,@Inject(MAT_DIALOG_DATA) public data: Edit,private fb:FormBuilder, private filepath: FilepathService) {
   this.value = data;
   console.log(this.value)
    this.tenant=localStorage.getItem('tenant_id')
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSelect(id: any) {
    throw new Error("Method not implemented.");
  }
  ngOnInit() {


    this.login = this.fb.group({
      ip: [this.value.edit_shift.ip,],
      user_name: [this.value.edit_shift.user_name,],
      pass: [this.value.edit_shift.pass,],
      master_location: [this.value.edit_shift.master_location,],
      slave_location: [this.value.edit_shift.slave_location,],
      machine_id:[this.value.edit_shift.machine.id,]

    })
  this.service.tenant_id().pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.service_response=res;
      console.log(localStorage.getItem('token'));});

      this.service.machine(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      console.log(res);
  })
  }
 
  logintest() {
    console.log(this.login.value);

    this.add_val = this.login.value 
    console.log(this.value.edit_shift.id)
    // this.add_val["slave_location"] =  "/home/part_program";
    console.log(this.add_val);
    this.service.edit(this.value.edit_shift.id,this.add_val).pipe(untilDestroyed(this)).subscribe(res => {
       Swal.fire("Updated Successfully!")
      
      this.dialogRef.close();
  })

    
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
    }
   }
   ngOnDestroy(){

  }
  
}

