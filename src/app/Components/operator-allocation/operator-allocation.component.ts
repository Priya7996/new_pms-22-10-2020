import { Component, OnInit,Inject } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormArray,FormControl,FormGroup, Validators } from '@angular/forms';
import { OperatorAllocationService } from 'src/app/Service/app/operator-allocation.service';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-operator-allocation',
  templateUrl: './operator-allocation.component.html',
  styleUrls: ['./operator-allocation.component.scss']
})
export class OperatorAllocationComponent implements OnInit {

  displayedColumns: string[] = ['position', 'operator_name', 'operator_id','machine_name','machine_id','shift','shifttime','description','date','created','action'];
  dataSource = new MatTableDataSource();
  allocation: any;
  public dongly = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  get_report: any;
  IsVisible: boolean;
  subid: any;
  search:any;
 
  tenant: any;
  myLoader = false;
  statusColapse:any;
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
  data: any;
  data1: any;
  constructor(private nav:NavbarService,public dialog: MatDialog,private service:OperatorAllocationService) {
    this.nav.show()
    this.tenant = localStorage.getItem('tenant_id')
   }
   user():void{

    const dialogRef = this.dialog.open(New, {
      width: '450px',
      height:'auto'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.ngOnInit();
    // });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

 
  ngOnInit() {
    this.myLoader = true;
    this.service.list(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
    console.log(res);
this.get_report = res;
      this.allocation=res;
      this.myLoader = false;

      this.dataSource=new MatTableDataSource(this.allocation)

      for(let i=0; i<this.allocation.length; i++){
        console.log(this.allocation[i].operator_mapping_allocations)
        this.data = this.allocation[i].operator_mapping_allocations;

      }

    })
  }
  alocate(res){

    if(this.statusColapse == res){
                                          this.IsVisible = this.IsVisible ? false : true;
                                          return;
                                       }else{
                                         this.IsVisible=true;
                                       }
                                       this.statusColapse= res;


                                       this.subid=res;
                                       console.log(this.subid)
}
  operator_delete(id) {
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
  selector: 'new-page',
  templateUrl: 'new.html',
  styleUrls: ['./operator-allocation.component.scss']


})

export class New {
  machine_response: any;
  operator_response: any;
  shift_response: any;
  tenant: string;
  login: any;
  startDate:any;
  endDate:any;
  shift_rep:any;
  constructor(private service:OperatorAllocationService,private fb:FormBuilder,public dialogRef: MatDialogRef<New> ) {
    this.tenant=localStorage.getItem('tenant_id')
  }

 
  ngOnInit()
  { 
  

    this.login=this.fb.group({
      machine_id:["",Validators.required],
      operator_id:["",Validators.required],
      shifttransaction_id:["",Validators.required],
      description:["",Validators.required],
      target:["",Validators.required],
      from_date: ["",Validators.required],

      to_date: ["",Validators.required]
      })

      
    this.service.machine(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.machine_response=res;
    
  
    this.service.shift(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
      this.shift_response=res;
      console.log(res)
      this.service.shifttransaction(this.shift_response.id).subscribe(res =>{
        console.log(this.shift_response.id)
        this.shift_rep = res
        console.log(this.shift_rep)

      })
  
      console.log(localStorage.getItem('token'));})

      this.service.operator().pipe(untilDestroyed(this)).subscribe(res => {
        console.log(res);
        this.operator_response=res;
        console.log(localStorage.getItem('token'));})
   
    
     
  })
}
 
logintest() {

  console.log(this.login.value);
  let register = this.login.value;
  
  register.tenant_id = this.tenant;
  console.log(register);
  this.service.operator_create(register).pipe(untilDestroyed(this)).subscribe(res=>{
    console.log(res);
    if(res){
    Swal.fire("Created Succesfully !")

  }
    this.dialogRef.close();
  })

}

close(): void {
  this.dialogRef.close();
}

  ngOnDestroy(){

  }
}