import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ApprovalService } from '../../Service/app/approval.service';
@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  public dolly = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    
  }
  dataSource = new MatTableDataSource;
  approval: any;
  searchText:any;
  myLoader = false;

  constructor(private service:ApprovalService) { }

  ngOnInit() {
    this.  myLoader = true;

    this.service.second_api().subscribe(res =>{
      console.log(res)
      this.approval=res;
     this. myLoader = false;


      this.dataSource=new MatTableDataSource(this.approval)

    })
  }

}
