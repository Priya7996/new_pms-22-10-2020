import { Component, OnInit,Inject } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormArray,FormControl,FormGroup } from '@angular/forms';
import { OEEService} from '../../Service/app/oee.service';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import Swal from 'sweetalert2';
@Component({

  selector: 'app-oee',
  templateUrl: './oee.component.html',
  styleUrls: ['./oee.component.scss']
})
export class OeeComponent implements OnInit {
  myLoader = false;
  searchText:any;
  displayedColumns: string[] = ['position', 'date', 'shift', 'machine','operating','cycle','produced','rejected','availability','performance','quality','oee'];
  dataSource = new MatTableDataSource();
  public dolly = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  tenant: any;
  oee_get: any;
  allocation: any;

  
  constructor(private nav:NavbarService,public dialog: MatDialog,private service:OEEService) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id')
   }
   add_shift_registartion(): void {
    const dialogRef = this.dialog.open(Shift, {
      width: '450px',
      height:'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  ngOnInit() {
    this.myLoader = false;
    this.service.oee(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.myLoader = false;

      this.oee_get = res;
      this.dataSource=new MatTableDataSource(this.oee_get)

    })

    
    this.service.operator(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
      this.allocation=res;
    })
     
  }
  
  export(){

  }
  ngOnDestroy(){

  } 
  

}
@Component({
  selector: 'shift-page',
  templateUrl: 'shift.html',
})
export class Shift {
  form: any;
  
data_array:any;
array:any;
datepicker:any;
data1:any;
data2:any=[];
sampletest:any;
  tenant: any;
  machine_response: any;
  shift_response: any;
  list: any;
  shiftID:any;
  machineID:any;
  // duration:any;
  // productionTime:any;
  // balance:any;
  //formarray
  login: FormGroup;
  items: FormArray;
// data_array:any;
// array:any;
// data1:any;
  allocation: any;
  constructor(private service:OEEService,public dialogRef: MatDialogRef<Shift>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder) {
  this.tenant = localStorage.getItem('tenant_id')  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit()
  { 
    this.login=this.fb.group({
      machine_id:["",],
      shift_id:[""],
      date:[""],
      duration:["",],
      production_time:["",],
      balance:["",],
      items: this.fb.array([ this.createItem() ])
    })
    
    this.service.machine( this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      this.machine_response=res;
    })
      
      this.service.shift(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
        this.shift_response=res;
        
        })

    
    this.service.shiftidentity(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
     
      this.service.shift(res.id).subscribe(res => {
  
       this.shift_response=res; 
     
      })
    })
  }
  createItem(): FormGroup {
    return this.fb.group({
      name: '',
      description: '',
      price: '',
      time: ''
    });
  }
  add(){
    this.items = this.login.get('items') as FormArray;
    this.items.push(this.createItem());
  }
  shiftChange(id){
    this.shiftID = id;
  
    this.service.oeeshift(id).pipe(untilDestroyed(this)).subscribe(res => {
      this.login.patchValue({
        duration: res.duration,
        production_time: res.prod_time,
        balance: res.balance,
      })
    })
  }
  machineChange(id){
  this.machineID = id;
  }
  logintest(){
    this.array=this.login.value.items;
    
    for(let i=0;i<this.array.length;i++){
   this.data1={
        "programe_number":this.array[i].name,
        "idle_run_rate":this.array[i].description,
  
       "count":this.array[i].price,
       "time":this.array[i].time
      }
        this.data2.push(this.data1);
          this.sampletest = [].concat.apply([], this.data2);
   }
  
  
    this.data_array={
      "machine_id":this.machineID,
      "shifttransaction_id":this.shiftID,
      "date":this.login.value.date,
      "duration":this.login.value.duration,
      "prod_time":this.login.value.production_time,
      "balance":this.login.value.balance,
      prog_count:this.sampletest
     
    }
   
   
  this.service.oee_show(this.data_array).subscribe(res =>{
 
  Swal.fire("Value Entered Succesfully !")
   this.dialogRef.close();

   })
   
  }
 
ngOnDestroy(){

} 


}
