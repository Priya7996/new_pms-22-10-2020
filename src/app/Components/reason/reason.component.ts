import { Component, OnInit } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
//navservice
import { NavbarService} from '../../Nav/navbar.service';
import { ReasonService} from '../../Service/app/reason.service';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.scss']
})
export class ReasonComponent implements OnInit {

  displayedColumns: string[] = ['position', 'user_name', 'machine_name', 'description','old_revision_no','new_revision_no','file_name'];
  dataSource = new MatTableDataSource();
  public dolly = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  searchText:any;
  tenant: any;
  reason_response: any;
  reason: any;
  machine_id:any;
  constructor(private nav:NavbarService,private service:ReasonService) {
    this.nav.show();
    this.tenant=localStorage.getItem('tenant_id')

   }

  ngOnInit() {
    this.service.tenant_id(this.tenant).pipe(untilDestroyed(this)).subscribe(res => {
      this.reason_response=res;
      this.machine_id = this.reason_response[0].id;
      this.service.display_reason(this.machine_id).pipe(untilDestroyed(this)).subscribe(res =>{
        this.reason=res;
        this.dataSource=new MatTableDataSource(this.reason)
      })  
    });
  }

  code_compare(id) {
    this.service.display_reason(id).pipe(untilDestroyed(this)).subscribe(res =>{
      this.reason=res;
      this.dataSource=new MatTableDataSource(this.reason)
    })  
  }
 

  ngOnDestroy(){

  }
}
