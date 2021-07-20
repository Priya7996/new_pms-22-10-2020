import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormArray,FormControl,FormGroup } from '@angular/forms';
import { OEEService} from '../../Service/app/oee.service';
import { MatTableDataSource } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hour',
  templateUrl: './hour.component.html',
  styleUrls: ['./hour.component.scss']
})
export class HourComponent implements OnInit {

  myLoader = false;
  searchText:any;
  displayedColumns: string[] = ['position', 'date', 'shift', 'machine','operating','cycle','produced','rejected','availability','hour1','hour2','hour3','hour4','hour5','hour6','hour7','hour8','planned','actual'];
  dataSource = new MatTableDataSource();
  public dolly = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  tenant: any;
  oee_get: any;
  allocation: any;

  
  constructor(private nav:NavbarService,private service:OEEService) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id')
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