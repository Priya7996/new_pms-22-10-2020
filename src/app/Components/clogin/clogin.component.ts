import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarService} from '../../Nav/navbar.service';

@Component({
  selector: 'app-clogin',
  templateUrl: './clogin.component.html',
  styleUrls: ['./clogin.component.scss']
})
export class CloginComponent implements OnInit {
  login:FormGroup;
   hide: boolean = true;
   hide1 = true;
  constructor(private fb:FormBuilder,private route:Router,private nav:NavbarService) {
    this.nav.hide()
   }

  ngOnInit() {
    this.login = this.fb.group({
      email_id:["",[Validators.email]],
      password:["",[Validators.required]]
       
    })
  }
  logintest(val)
 { 
       console.log(this.login.value);
 }

}
