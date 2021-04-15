import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// importaciones de material
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

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
  ],
})

export class MaterialModule {}
