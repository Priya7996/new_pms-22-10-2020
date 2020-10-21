import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../Service/app/setting.service';
import { NavbarService} from '../../Nav/navbar.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  // public dolly = (value: string) => {
  //   this.dataSource.filter = value.trim().toLocaleLowerCase();
    
  // }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'datewise', 'monthwise', 'hourwise', 'programwise', 'pushnotification', 'sms', 'email', ];
  dataSource = [
  ];

  myLoader = false;
  // searchText:any;
 
  constructor(private service:SettingService,private nav:NavbarService) {
    this.nav.show();
   }

  ngOnInit() {
    this.myLoader = true;

    this.service.fourth_api().subscribe(res =>{
      console.log(res);
      this.myLoader = false;

    })
  }

}
