import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule,MatMenuModule,MatIconModule,MatInputModule,MatCardModule,MatFormFieldModule,MatListModule,
         MatAutocompleteModule,MatSelectModule,MatSlideToggleModule,
         MatSliderModule,MatSidenavModule,MatDividerModule,
         MatRadioModule,MatExpansionModule,MatDatepickerModule,
         MatGridListModule,MatStepperModule,MatTreeModule,
         MatSnackBarModule,MatTabsModule,MatDialogModule,MatTableModule,
         MatCheckboxModule,MatPaginatorModule,
         MatButtonToggleModule,MatToolbarModule,MatTooltipModule } from '@angular/material';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatNativeDateModule } from '@angular/material/core';
import { ExportService } from './export.service';
import { MatTableExporterModule } from 'mat-table-exporter';
// import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [FormsModule, ReactiveFormsModule,MatButtonModule,MatMenuModule,
    MatIconModule,MatInputModule,MatCardModule,MatFormFieldModule,MatListModule,
    MatAutocompleteModule,MatSelectModule,MatSlideToggleModule,MatSliderModule,
    MatSidenavModule,MatDividerModule,MatNativeDateModule,MatRadioModule
    ,MatExpansionModule,MatGridListModule,MatStepperModule,MatTooltipModule,
    MatTreeModule,MatButtonToggleModule,MatSnackBarModule,MatTabsModule,NgbModule,
    MatDialogModule,MatTableModule,MatDatepickerModule,MatCheckboxModule,MatTableExporterModule,
    CommonModule,DateRangePickerModule,MatToolbarModule,MatPaginatorModule,AngularFontAwesomeModule,
    
  ],
  exports:[FormsModule, ReactiveFormsModule,MatButtonModule,MatMenuModule,
    MatIconModule,MatInputModule,MatCardModule,MatFormFieldModule,MatListModule,
    MatAutocompleteModule,MatSelectModule,MatSlideToggleModule,MatSliderModule,
    MatSidenavModule,MatDividerModule,MatNativeDateModule,MatRadioModule
    ,MatExpansionModule,MatGridListModule,MatStepperModule,MatTooltipModule,
    MatTreeModule,MatButtonToggleModule,MatSnackBarModule,MatTabsModule,NgbModule,
    MatDialogModule,MatTableModule,MatDatepickerModule,MatCheckboxModule,MatTableExporterModule,
    CommonModule,DateRangePickerModule,MatToolbarModule,MatPaginatorModule,AngularFontAwesomeModule
  ],
  providers: [
    ExportService
  ]
})
export class SharedModule { }
