import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// importaciones de material
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatTableExporterModule } from 'mat-table-exporter';

/**
 * Se agregan los modules en imports y exports para poder usarlos en los otros componentes
 */

@NgModule({
  declarations: [
    ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTableExporterModule,
  ],
	exports: [
		MatSliderModule,
		MatSlideToggleModule,
		MatDividerModule,
		MatSidenavModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatCardModule,
		MatStepperModule,
		MatFormFieldModule,
		MatInputModule,
		MatRadioModule,
		MatSelectModule,
		MatTableModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatDialogModule,
		MatPaginatorModule,
        MatProgressBarModule,
        MatTableExporterModule,
	],
})

export class MaterialModule { }
