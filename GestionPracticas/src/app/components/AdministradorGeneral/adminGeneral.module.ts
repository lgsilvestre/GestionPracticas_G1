import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuAdminGeneralComponent } from './menu-admin-general/menu-admin-general.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GraficosModule } from '../Graficos/graficos.module';
import { PlantillaGeneralComponent } from './plantilla-general/plantilla-general.component';
import {FirebaseEstudianteService} from '../Servicios/firebase-estudiante.service';
import { CrearCuentaEncargadoComponent } from './crear-cuenta-encargado/crear-cuenta-encargado.component';
import { CrearCuentaAdministradorGeneralComponent } from './crear-cuenta-administrador-general/crear-cuenta-administrador-general.component';
import { CrearCuentaEstudianteComponent } from './crear-cuenta-estudiante/crear-cuenta-estudiante.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { GestionarCarrerasComponent, preguntaEliminar } from './gestionar-carreras/gestionar-carreras.component';
import { editarPlanes, VerCarreraParticularComponent, AgregarPlan } from './gestionar-carreras/ver-carrera-particular/ver-carrera-particular.component';
import { AppRoutingModule } from '../../app-routing.module';



@NgModule({
  declarations: [
    // Aca van los modulos que se crean
    MenuAdminGeneralComponent,
    PlantillaGeneralComponent,
    CrearCuentaEncargadoComponent,
    CrearCuentaAdministradorGeneralComponent,
    CrearCuentaEstudianteComponent,
    CrearCuentaComponent,
    GestionarCarrerasComponent,
    preguntaEliminar,
    editarPlanes,
    AgregarPlan,
    VerCarreraParticularComponent

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
    CrearCuentaEncargadoComponent,
    VerCarreraParticularComponent
  ],
  providers: [
    FirebaseEstudianteService,
  ]
})
export class AdminGeneralModule{}
