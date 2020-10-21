import { Component, OnInit,OnChanges,SimpleChanges,Inject,Input} from '@angular/core';
import { NavbarService } from '../navbar.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SidebarService} from '../../Service/app/sidebar.service';
export interface Edit { }

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,OnChanges {
  @Input()navStatus: boolean;
  show1: boolean;
  show2: boolean;
  last_name: any;
  first_name: any;
  public keyboard_arrow_down: any = 'Compare';
  tenant: any;
  email:any;
  drawer:any;
  isHandset$:any;
  Compare :any;
  // first: any;
  // last: any; 
   
  constructor(public nav: NavbarService, private route: Router,private dialog:MatDialog) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.navStatus.currentValue){
      this.first_name =localStorage.getItem('first_name');
      this.last_name =localStorage.getItem('last_name');
      this.tenant =localStorage.getItem('tenant_id');
      this.email =localStorage.getItem('email');
    }

}

  view() {
    this.show2 = !this.show2
}
open(): void {
  const dialogRef = this.dialog.open(editComponent, {
    width: '450px',
    height: 'auto',
    disableClose: true
    // data: {new: 'new'}
  });
  dialogRef.afterClosed().subscribe(result => {
  });
}
toggle() {
  this.show1 = !this.show1
}


toggle_menu(){
  this.Compare = !this.Compare;

  // CHANGE THE NAME OF THE BUTTON.
  console.log(this.Compare)
  if (this.Compare)
    this.keyboard_arrow_down = "Compare";
  else
    this.keyboard_arrow_down = "Compare"; 
}
  close() {
    Swal.fire({
      title: 'Are you sure want to logout?',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        localStorage.clear();
        this.first_name = [];
        this.last_name = [];
        this.email = [];
        this.route.navigateByUrl('');
      }
    });
  }
}


@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit.component.html',


})
export class editComponent {
  edit1:FormGroup;
  tenant: any;
  fname:any;
  lname:any;
  phone:any;
  email:any;
  password:any;
  oldPassword:any;
  hide: boolean = true;
  flock: boolean = true;
  constructor(private service:SidebarService,public dialogRef: MatDialogRef<editComponent>,@Inject(MAT_DIALOG_DATA) public data,private fb:FormBuilder,) {
    this.tenant=localStorage.getItem('tenant_id')
    this.fname = localStorage.getItem('first_name')
    this.lname = localStorage.getItem('last_name')
    this.phone = localStorage.getItem('phone')
    this.email = localStorage.getItem('email')
    this.password = localStorage.getItem('password')
  }

  ngOnInit()
  { 
    this.edit1=this.fb.group({
      first_name:["",],
      last_name:["",],
      email_id:["",],
      old_password:[""],
      new_password:[{value:'', disabled: true}],
      phone_number:[""]
    })  
    this.edit1.patchValue({
      first_name: this.fname,
      last_name: this.lname,
      email_id: this.email,
      // password: this.password,
      phone_number: this.phone
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  checkPassword(){
    if(this.oldPassword==this.password){
      this.edit1.controls.new_password.enable()
    }else{
      Swal.fire('password entered is incorrect')
      this.edit1.controls.old_password.reset()
      this.edit1.controls.new_password.disable()
    }
  }
  editform() {
    this.service.editvalue(this.tenant,this.edit1.value).subscribe(res => {
      console.log(res)
      if(res === true)
      {
        Swal.fire("Updated Succesfully !")
      }
      else{
        Swal.fire("Updated Sucessfully !")
      }
      this.dialogRef.close();
      this.ngOnInit();
      })
  }
  
  
}

