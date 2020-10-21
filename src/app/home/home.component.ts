import { Subscription } from 'rxjs';
// import { Component, OnInit } from '@angular/core';
// import { Observable, Subject } from 'rxjs';
// import { DiffResults } from '../../../projects/ngx-text-diff/src/lib/ngx-text-diff.model';

// export interface DiffContent {
//   leftContent: string;
//   rightContent: string;
// }

// @Component({
//   selector: 'tda-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   submitted = false;
//   content: DiffContent = {
//     leftContent: '',
//     rightContent: ''
//   };

//   options: any = {
//     lineNumbers: true,
//     mode: 'xml'
//   };

//   contentObservable: Subject<DiffContent> = new Subject<DiffContent>();
//   contentObservable$: Observable<DiffContent> = this.contentObservable.asObservable();

//   constructor() {}

//   ngOnInit() {
//     this.submitted = false;
//     this.content.leftContent =
//       '<card xmlns="http://businesscard.org">\n' +
//       '   <name>John Doe</name>\n' +
//       '   <title>CEO, Widget Inc.</title>\n' +
//       '   <email>john.Moe@widget.com</email>\n' +
//       '   <cellphone>(202) 456-1414</cellphone>\n' +
//       '   <phone>(202) 456-1414</phone>\n' +
//       '   <logo url="widget.gif"/>\n' +
//       ' </card>';
//     this.content.rightContent =
//       '<card xmlns="http://businesscard.org">\n' +
//       '   <name>John Moe</name>\n' +
//       '   <title>CEO, Widget Inc.</title>\n' +
//       '   <email>john.Moe@widget.com</email>\n' +
//       '   <phone>(202) 456-1414</phone>\n' +
//       '   <address>Test</address>\n' +
//       '   <logo url="widget.gif"/>\n' +
//       ' </card>';
//   }

//   submitComparison() {
//     this.submitted = false;
//     this.contentObservable.next(this.content);
//     this.submitted = true;
//   }

//   handleChange(side: 'left' | 'right', value: string) {
//     switch (side) {
//       case 'left':
//         this.content.leftContent = value;
//         break;
//       case 'right':
//         this.content.rightContent = value;
//         break;
//       default:
//         break;
//     }
//   }

//   onCompareResults(diffResults: DiffResults) {
//     console.log('diffResults', diffResults);
//   }
// }
import { Component, OnInit,Inject } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
// import { DiffResults } from '../../../projects/ngx-text-diff/src/lib/ngx-text-diff.model';
import { DiffResults } from '../../../projects/ngx-text-diff/src/lib/ngx-text-diff.model';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarService} from '../Nav/navbar.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { NavbarService} from '../../Nav/navbar.service';

export interface DiffContent {
  leftContent: string;
  rightContent: string;
}

@Component({
  selector: 'tda-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  submitted = false;
  filName: any = "";
  filName1: any = "";
  status: any;
  content: DiffContent = {
    leftContent: '',
    rightContent: ''
  };

  options: any = {
    lineNumbers: true,
    mode: 'xml'
  };

  contentObservable: Subject<DiffContent> = new Subject<DiffContent>();
  contentObservable$: Observable<DiffContent> = this.contentObservable.asObservable();
  fileText: string | ArrayBuffer;
  FileText;
  filetext1;
  result: any;
  public show: boolean = false;
  public buttonName: any = 'Compare';
  login: FormGroup;
  Compare: any;
  // path:any;
  machinesArray: any;
  machineid: any;
  fileName: any;
  file_path: any;
  fileName1: any;
  // test: Object;
  sample_test: any;
  file: any;
  file_Name: any;
  file_name: any;
  machine: any;
  compare: any;
  maxDate = new Date();
  swal:any;
  Text1: any;
  me: any;
  Text: any;
  compareResults: string;
  file2: any;
  slave_file: string;
  date= new Date().toString();
  constructor(private nav:NavbarService,private route:Router,private fb: FormBuilder, private http: HttpClient,public dialog: MatDialog,) {

    this.nav.show();

    setInterval(() => {this.today = Date.now()}, 1);


    this.login = this.fb.group({
      // name:["",Validators.required],
      reason: ["", Validators.required],
      // old_revision_no:["",Validators.required],
      // new_revision_no:["",Validators.required],
    })


  }
  today: number = Date.now();


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
    }
   }
  
  
  // this.httpClient.post('http://192.168.1.160:3000/users/create',{user: this.user.value}).subscribe(result =>{
    
  ngOnInit() {

     console.log(localStorage.getItem("tenant_id"));
     console.log(localStorage.getItem("user_id"));
    this.sample_test = localStorage.getItem("tenant_id");
    console.log(this.sample_test)
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token")
      })
    }  

    //headers.set("Authorization", "Bearer " +localStorage.getItem("token"));
    this.http.get("https://app.yantra24x7.com/api/v1/machines?tenant_id=" + this.sample_test, headers).subscribe(res => {
      console.log(res);
      // console.log(filName);
      this.machinesArray = res;
      this.onSelect(this.machinesArray[0].id);
      localStorage.getItem("tenant_id");
      console.log(localStorage.getItem('tenant_id'),localStorage.getItem("user_id"));
console.log(localStorage.getItem("token"))
      // this.http.get("http://192.168.0.237:4000/api/v1/machines?tenant_id=' + $scope.tenant_id",).subscribe(res=>{
      //   console.log(res);


    });
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(Dialog, {
  //     width: '500px',
     
  //   });

  //   dialogRef.afterClosed().subscribe(result => {

  // })}
  
  onSelect(machine_id) {
    this.machineid = machine_id
    console.log(this.machineid)
    this.filName = "";
    this.filName1 = "";
    this.submitted = false;
    this.compareResults = "";

    this.login.reset();
    this.Compare = false;
    this.file_path = "";
    this.file_name = "";
    this.fileName1 = "";
    this.filetext1 = "";
    // this.me.FileText = "";

    // CHANGE THE NAME OF THE BUTTON.
    console.log(this.Compare)
    if (this.Compare)
      this.buttonName = "Compare";
   
    // this.ngOnInit();

    // this.Compare = false;
    console.log(this.Compare); 
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token")
      })
    }
    
// http://52.66.140.40
    // console.log(machine_id)
    // this.http.get("http:///52.66.140.40/api/v1/file_path?id=" + machine_id, headers).subscribe(res => {
      console.log(machine_id)
       this.http.get("https://app.yantra24x7.com/api/v1/file_path?id=" + machine_id, headers).subscribe(res => {
      //console.log(res);
      // alert(res.status);
      // alert(res.file_path);
      // alert(res['status'])

      if (res['status'] != null) {
        alert(res['status'])
      }
      this.file_path = res;

    },
      error => {
        console.log(error)
        this.file_path = error.error;
      })
  }

  submitComparison() {
    this.submitted = false;
    this.contentObservable.next(this.content);
    this.submitted = true;
  }

  handleChange(side: 'left' | 'right', value: string) {
    switch (side) {
      case 'left':
        this.content.leftContent = value;
        break;
      case 'right':
        this.content.rightContent = value;
        break;
      default:
        break;
    }
  }

  onCompareResults(diffResults: DiffResults) {
    console.log('diffResults', diffResults);
    // console.log(this.file.name)
  }

  fileUpload(event) {
    var reader = new FileReader();
    let file = event.target.files[0];
    let file_name = file.name;
    this.filName = file_name;
    console.log(this.filName)
    reader.readAsText(event.srcElement.files[0]);
    var me = this;
    reader.onload = function () {
      me.FileText = reader.result;
      console.log(me)
      // me.content.leftContent = (reader.result).toString()
      me.handleChange('left', me.FileText)
    }
    //this.handleChange('left',me.FileText)
    this.Text = me.FileText;

  }

  fileUpload1(event) {
    var reader = new FileReader();
    console.log(event)
    this.file2 = event.target.files[0];
    console.log(this.file2);
    let fileName = this.file2.name;
    this.filName1 = fileName
    reader.readAsText(event.srcElement.files[0]);
    var me = this;
    reader.onload = function () {
      me.filetext1 = reader.result;
      console.log(me)
      //me.content.rightContent = (reader.result).toString()
      me.handleChange('right', me.filetext1)
    }
    //this.handleChange('right',right)
    this.Text1 = me.filetext1 
  }
  logintest(val) {
    console.log(this.date)
    console.log(this.login.value)
    this.Compare = false;

    console.log(this.Compare) 
    console.log(this.file2);
    
    var fd = new FormData();
    fd.append('id', this.machineid);
    // fd.append('user_id', this.sample_test.user_id);
    fd.append('reason', this.login.value.reason);
    // fd.append('user_name', this.login.value.name);
    fd.append('slave_file',this.file2);
    // fd.append('date',this.date);

    fd.append('file_name', this.filName);
    // fd.append('old_revision_no', this.login.value.old_revision_no);
    // fd.append('new_revision_no', this.login.value.new_revision_no);
    // let data = {
    //   "id": this.machineid,
    //   "user_id": this.sample_test.user_id,
    //   "reason": this.login.value.reason,
    //   "file_name": this.filName,
    //   "file_Name": this.file2

    // }
    console.log(fd);
    //  this.http.post('http:///192.168.0.237:4000/api/v1/compare_reason', fd, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }).subscribe(res => {
    //    console.log(res);
       this.http.post("https://app.yantra24x7.com/api/v1/file_move", fd, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }).subscribe(resp => {
      console.log(resp);
      alert(resp['status'])
      
      this.ngOnInit();
      
      
  })
    this.submitted = false;
    
    this.login.reset();
    this.filName = "";
    this.Compare = false;
    this.slave_file="";
    this.filName1 = "";
    this.file_path = "";
    this.file_name = "";
    this.fileName1 = "";
    this.filetext1 = "";
    this.me.FileText = "";
    this.compareResults = "";
    this.machinesArray = "";

    // 192.168.0.237:4030/api/v1/file_move?
    
  }
  old(arg0: string, old: any) {
    throw new Error("Method not implemented.");
  }
  toggle() {
    this.Compare = !this.Compare;

    // CHANGE THE NAME OF THE BUTTON.
    console.log(this.Compare)
    if (this.Compare)
      this.buttonName = "Compare";
    else
      this.buttonName = "Compare";
  }
  change(event){
    this.date=event.value
  }
  logout()
  {
   
        localStorage.clear();
        this.route.navigateByUrl('');
    
  }
}
// @Component({
//   selector: 'dialog-page',
//   templateUrl: './dialog.component.html',
// })
// export class Dialog {
//   login:FormGroup;
//   reason:any;
//   // machineid: any;
//   constructor(private fb:FormBuilder,
//     public dialogRef: MatDialogRef<Dialog>,
//     @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {
  
//       this.login=this.fb.group({
//         changed:["",Validators.required],
//         old:["",Validators.required],
//         new:["",Validators.required],
//         reason:["",Validators.required]
       
          

//       })
//     }

   
  

//   loginform(val)
//   {
//     console.log(val)
//     var fd = new FormData();
//     fd.append('id', this.machineid);
//     fd.append('file_name', this.filName);
//     fd.append('slave_file', this.file2);

//     console.log(fd);
//     //  this.http.post('http:///192.168.0.237:4000/api/v1/compare_reason', fd, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }).subscribe(res => {
//     //    console.log(res);
//        this.http.post("http:///192.168.0.237:4000/api/v1/file_move", fd, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }).subscribe(resp => {
//       console.log(resp);
//       alert(resp['status'])
      
      
//   })
//   }
//   filName(arg0: string, filName: any) {
//     throw new Error("Method not implemented.");
//   }
//   machineid(arg0: string, machineid: any) {
//     throw new Error("Method not implemented.");
//   }
// }




// Method : POST
// url : http://183.82.250.137:4000/api/v1/compare_reason?
// Parametrs :
// {
//   "id": "40",
//   "user_id": "56",
//   "reason": "Comparing the master program and slave program"
// }



// Method : GET
// url : http://183.82.250.137:4000/api/v1/file_path?id=40