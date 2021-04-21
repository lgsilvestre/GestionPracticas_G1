import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuAdminGeneralComponent } from './menu-admin-general/menu-admin-general.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GraficosModule } from '../Graficos/graficos.module';
import { PlantillaGeneralComponent } from './plantilla-general/plantilla-general.component';

@NgModule({
  declarations: [
    // Aca van los modulos que se crean
    MenuAdminGeneralComponent,
    PlantillaGeneralComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    GraficosModule,
  ],
  exports: [
    // Aca van los modulos que se crean
  ]
})
export class AdminGeneralModule{}
