import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuAdminGeneralComponent } from './menu-admin-general/menu-admin-general.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GraficosModule } from '../Graficos/graficos.module';
import { PlantillaGeneralComponent } from './plantilla-general/plantilla-general.component';
import {FirebaseEstudianteService} from '../Servicios/firebase-estudiante.service';
import { crearCuentaEncargadoComponent } from './crear-cuenta-encargado/crear-cuenta-encargado.component';
import { CrearCuentaAdministradorGeneralComponent } from './crear-cuenta-administrador-general/crear-cuenta-administrador-general.component';



@NgModule({
  declarations: [
    // Aca van los modulos que se crean
    MenuAdminGeneralComponent,
    PlantillaGeneralComponent,
    crearCuentaEncargadoComponent,
    CrearCuentaAdministradorGeneralComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    GraficosModule,
  ],
  exports: [
    // Aca van los modulos que se crean
    PlantillaGeneralComponent,
    crearCuentaEncargadoComponent
  ],
  providers: [
    FirebaseEstudianteService,
  ]
})
export class AdminGeneralModule{}
