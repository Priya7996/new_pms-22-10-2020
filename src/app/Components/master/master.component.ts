import { Component, OnInit,Inject,ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NavbarService} from '../../Nav/navbar.service';
import Swal from 'sweetalert2'
import {ProgramListService} from '../../Service/app/programlist.service';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'], 
  // encapsulation: ViewEncapsulation.None

})
export class MasterComponent implements OnInit {
  date: any;
  myLoader = false;
  public today: Date = new Date(new Date().toDateString());
  public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
  public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
      - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString())
      ;
  public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
  public monthEnd: Date = this.today;
  public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
  public lastEnd: Date = this.today;
  public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
  public yearEnd: Date = this.today;
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public maxDate: Object = new Date();
  public minDate: Object = new Date(new Date().setMonth(new Date().getMonth() - 1));
  data:string;   
  machine_response: any;
  tenant: any;
  reason: any;
  
  machine_id:any;
  constructor(private fb:FormBuilder,public dialog: MatDialog,private nav:NavbarService,private service:ProgramListService) {
    this.nav.show();
    this.tenant = localStorage.getItem('tenant_id')
   }
   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
   dataSource=new MatTableDataSource
   slave=new MatTableDataSource

   slavelist: string[] = ['position', 'name', 'weight', 'symbol','action'];
  
  openDialog(machine): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '250px',
      data: { edit_shift: machine}

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();

    });
  }

  slavepath_edit(){
    
  }
  ngOnInit() {
    this.service.machine( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.machine_response=res;
      // this.service.filelist( this.machine_response.id).subscribe(res =>{
        console.log(res);
        this.machine_id = this.machine_response[0].id;
        console.log(this.machine_id)
        this.getmachine(this.machine_response[0].id)
      });
   
  }
  getmachine(id) {
    this.myLoader = true;
     this.service.display_reason(id).pipe(untilDestroyed(this)).subscribe(res =>{
      console.log(res)
      this.myLoader = false;

      this.reason=res;
      this.dataSource=new MatTableDataSource(this.reason)
      this.slave=new MatTableDataSource(this.reason)
      if (res['status'] != null) {
        Swal.fire(res['status'])
      }
    })  
  }
  masterpath_delete():void {
    const dialogRef = this.dialog.open(Delete, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  masterpath_download(){

  }
    filepath_delete(){
      
    }
  slavepath_delete(){
    Swal.fire('Are you sure want to delete?')
  }
  ngOnDestroy(){

  }
}

@Component({
  selector: 'dialog-page',
  templateUrl: 'dialog.html',
})
export class Dialog {
  test:FormGroup;
  fileName1:any;
  machine_response: any;
  file2:any;
  value:any;
  daterangepicker:any;
  tenant:any;
  startDate:any;  

  constructor(private http: HttpClient,public dialogRef: MatDialogRef<Dialog>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,private service:ProgramListService) {
  this.tenant = localStorage.getItem('tenant_id')  ;
  this.value = data;
  console.log(this.value)
  // console.log(this.machine_id )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  fileUpload1(event){
    this.file2 = event.target.files[0];
    console.log(this.file2);
   
    
}
  ngOnInit()
  {
    this.test=this.fb.group ({
      machine_id:[this.value.edit_shift],
      user_name:["",],
      revision_no:["",],
      date:["",],

    })

    this.service.machine( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.machine_response=res;
      
    });

  }
  
  testform(val)
  {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token")
      })
    }  
    console.log(this.test.value.revision_no);
    var machine = new FormData();
    machine.append('machine_id', this.test.value.machine_id);
    machine.append('user_name', this.test.value.user_name);
    machine.append('revision_no', this.test.value.revision_no);

    machine.append('date',this.test.value.date);
    machine.append('file', this.file2);
    console.log(machine)
   
    this.http.post("https://app.yantra24x7.com/api/v1/file_upload",machine, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }).subscribe(res =>{
      
      if (res['status'] != null) {
        Swal.fire(res['status'])
      }
      this.dialogRef.close();



    })


    // var machine: FormData = new FormData();
    // this.image.map((image, index) => {
    // console.log(index)
    // machine.append('machine[machine_assets_attributes]' + index + '[pic_url]', image);
    // });
    // machine.append('machine[make]', data.make);
    // machine.append('machine[mac_model]', data.mac_model);
    // machine.append('machine[capacity_id]', data.capacity_id);
    // machine.append('machine[accuracy_id]', data.accuracy_id);
    // machine.append('machine[machine_class_id]', data.machine_class_id);
    // machine.append('machine[sl_no]', data.sl_no);
    // machine.append('machine[stamp_quarters]', data.stamp_quarters);
    // machine.append('machine[stamping_city]', data.stamping_city);
    // // machine.append('machine[si_circle]', data.si_circle);
    // machine.append('machine[customer_id]', data.customer_id)
    // machine.append('machine[distributor_id]', data.distributor_id)
    // machine.append('machine[stamping_dues_attributes][0][customer_id]', data.customer_id);
    // machine.append('machine[stamping_dues_attributes][0][stamp_due_date]', data.stamping_dues_attributes.stamp_due_date);
    // machine.append('machine[stamping_dues_attributes][0][status]', "Open");
    // machine.append('machine[stamping_dues_attributes][0][distributor_id]', data.distributor_id);
    // machine.forEach((value, key) => {
    // console.log(key + value)
    // });
    
    // this.customer.machine_create(machine).pipe(untilDestroyed(this)).subscribe(res => {
    // this.clicked = false;
    // this.toast.success('Created Successfully');
    // // this.ngOnInit();
    // this.dialogRef.close();
    // }, error => {
    // this.clicked = false;
    // this.toast.error(Object.keys(error.error) + ' ' + Object.values(error.error));
    // });
    // } else {
    // this.customer.machine_put(data, this.value.machine_id).pipe(untilDestroyed(this)).subscribe(res => {
    // this.clicked = false;
    // this.toast.success('Updated Successfully');
    // // this.ngOnInit();
    // this.dialogRef.close();
    // }, error => {
    // this.clicked = false;
    // this.toast.error(Object.keys(error.error) + ' ' + Object.values(error.error));
    // });
    // }


    // fd.append('file_name', this.filName);
    // fd.append('old_revision_no', this.login.value.old_revision_no);
    // fd.append('new_revision_no', this.login.value.new_revision_no);
  }
  // keyPress(event: any) {
  //   const pattern = /[0-9\+\-\ ]/;
  //   let inputChar = String.fromCharCode(event.charCode);
  //   if (event.keyCode != 8 && !pattern.test(inputChar)) {
  //   event.preventDefault();
  //   }
  //  }
   ngOnDestroy(){

  }

}
@Component({
  selector: 'delete-page',
  templateUrl: 'delete.html',
})
export class Delete {
  date: any;
  daterangepicker:any;
  public today: Date = new Date(new Date().toDateString());
  public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
  public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
      - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString())
      ;
  public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
  public monthEnd: Date = this.today;
  public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
  public lastEnd: Date = this.today;
  public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
  public yearEnd: Date = this.today;
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public maxDate: Object = new Date();
  public minDate: Object = new Date(new Date().setMonth(new Date().getMonth() - 1));
  login:FormGroup;
  constructor(public dialogRef: MatDialogRef<Delete>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit()
  {
    this.login =this.fb.group({
      user_name:["",],
      reason:["",],
    })
  }
  logintest(val)
  {
      console.log(val)
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