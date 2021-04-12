import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// importaciones de material
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

/**
 * Se agregan los modules en imports y exports para poder usarlos en los otros componentes
 */

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  exports: [
    MatSliderModule,
    MatSlideToggleModule
  ],
})
export class MaterialModule {}
