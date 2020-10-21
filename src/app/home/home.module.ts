import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { NgxTextDiffModule} from '../../../projects/ngx-text-diff/src/lib/ngx-text-diff.module';

import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card'; 
import { MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule} from '@angular/material/select'; 
import { MatDatepickerModule,MatNativeDateModule} from '@angular/material';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [RouterModule.forChild(routes),MatInputModule,MatButtonModule,MatIconModule,MatCardModule,
    CommonModule,NgxTextDiffModule,HttpClientModule,MatFormFieldModule,MatDialogModule,MatSelectModule,
    MatDatepickerModule,MatNativeDateModule,FormsModule,ReactiveFormsModule
  ]
})
export class HomeModule { }
// import { NgxTextDiffModule } from '../../projects/ngx-text-diff/src/lib/ngx-text-diff.module';
