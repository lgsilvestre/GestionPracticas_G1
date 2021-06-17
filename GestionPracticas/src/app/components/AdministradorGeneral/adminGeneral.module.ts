import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuAdminGeneralComponent } from './menu-admin-general/menu-admin-general.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GraficosModule } from '../Graficos/graficos.module';
import { PlantillaGeneralComponent } from './plantilla-general/plantilla-general.component';
import { FirebaseEstudianteService } from '../Servicios/firebase-estudiante.service';
import { CrearCuentaEncargadoComponent } from './crear-cuenta-encargado/crear-cuenta-encargado.component';
import { CrearCuentaAdministradorGeneralComponent } from './crear-cuenta-administrador-general/crear-cuenta-administrador-general.component';
import { CrearCuentaEstudianteComponent } from './crear-cuenta-estudiante/crear-cuenta-estudiante.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { GestionarCarrerasComponent, preguntaEliminar } from './gestionar-carreras/gestionar-carreras.component';
import { editarPlanes, VerCarreraParticularComponent, AgregarPlan } from './gestionar-carreras/ver-carrera-particular/ver-carrera-particular.component';
import { AppRoutingModule } from '../../app-routing.module';
import { CrearCarreraComponent } from './gestionar-carreras/crear-carrera/crear-carrera.component';
import { DynamicHostDirective } from './directivas/dynamic-host.directive';
import { DinamicFileContainerComponent } from './dinamic/dinamic-file-container/dinamic-file-container.component';
import { DefinirFechasImportantesComponent } from './definir-fechas-importantes/definir-fechas-importantes.component';



@NgModule({
  declarations: [
    // Aca van los modulos que se crean
    MenuAdminGeneralComponent,
    PlantillaGeneralComponent,
    CrearCuentaEncargadoComponent,
    CrearCuentaAdministradorGeneralComponent,
    CrearCuentaEstudianteComponent,
    CrearCuentaComponent,
    DynamicHostDirective,
    DinamicFileContainerComponent,
    GestionarCarrerasComponent,
		preguntaEliminar,
		editarPlanes,
		AgregarPlan,
		VerCarreraParticularComponent,
		CrearCarreraComponent,
		DefinirFechasImportantesComponent,
  ],
  entryComponents: [
    // aqui van los componentes que se crean en tiempo de ejecucion
    DinamicFileContainerComponent
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
    CrearCuentaEncargadoComponent
  ],
  providers: [
    FirebaseEstudianteService,
  ]
})
export class AdminGeneralModule { }
