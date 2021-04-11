import { Component, OnInit,Inject } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormArray,FormControl,FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { PartService} from '../../Service/app/part.service';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
@Component({
  selector: 'app-part-doucumentation',
  templateUrl: './part-doucumentation.component.html',
  styleUrls: ['./part-doucumentation.component.scss']
})
export class PartDoucumentationComponent implements OnInit {

  displayedColumns: string[] = ['position', 'part_number', 'part_name','customer_name','created_by','status','action'];
  dataSource = new MatTableDataSource();
  tenant: any;
  list: any;
  myLoader= false;
show_status:any;
  constructor(private nav:NavbarService,private fb:FormBuilder,public dialog: MatDialog,private service:PartService)
  {
  this.nav.show();
  this.tenant=localStorage.getItem('tenant_id')
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

  ngOnInit() {
    // this.myLoader= true;
    //    this.service.operator(this.tenant).pipe(untilDestroyed(this)).subscribe(res =>{
    //    this.myLoader= false;
    //    this.list=res;
    //    this.dataSource=new MatTableDataSource(this.list)
    // })
  }


  
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
  styleUrls: ['./part-doucumentation.component.scss']
})

export class Edit {
  login:FormGroup;
  tenant: any;
  add_val:any;
  constructor(public dialogRef: MatDialogRef<Edit>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,public service :PartService) {}

  cancel() {
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit()
  { this.tenant=localStorage.getItem('tenant_id');
    this.login=this.fb.group({
      operator_name:["",Validators.required],
      operator_spec_id:["",Validators.required],
      description:["",Validators.required],
      part_description:["",Validators.required],
      status:["",Validators.required]
    })
  }
  logintest() {
    this.add_val=this.login.value;
    this.add_val["tenant_id"] =this.tenant ;
    this.service.post(this.add_val).pipe(untilDestroyed(this)).subscribe(res => {
    Swal.fire("Created Successfully!")
    this.dialogRef.close(status);
   

    })
  }

  ngOnDestroy(){

  }}

@Component({
  selector: 'add-page',
  templateUrl: 'add.html',
  styleUrls: ['./part-doucumentation.component.scss']
})
export class Add {
  login:FormGroup;
  add_val:any;
  tenant:any;
  edit_data:any;

  constructor(public dialogRef: MatDialogRef<Add>,@Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder,private service:PartService) 
  {
    this.edit_data=data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit()
  {
    this.tenant=localStorage.getItem('tenant_id');
    this.login=this.fb.group({
      operator_name:["",Validators.required],
      operator_spec_id:["",Validators.required],
      description:["",Validators.required],
      part_description:["",Validators.required],
      status:["",Validators.required]
    })
  }

  editdata() {
    this.add_val=this.login.value
    this.add_val["tenant_id"] =this.tenant ;
    this.service.put(this.edit_data.id,this.add_val).pipe(untilDestroyed(this)).subscribe(res =>{
    Swal.fire("Updated Successfully!")
    this.dialogRef.close();
})
}



ngOnDestroy(){

}

}