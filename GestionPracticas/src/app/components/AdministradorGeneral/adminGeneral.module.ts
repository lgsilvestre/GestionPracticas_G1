import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuAdminGeneralComponent } from './menu-admin-general/menu-admin-general.component';
import { MaterialModule } from 'src/app/material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GraficosModule } from '../Graficos/graficos.module';
import { PlantillaGeneralComponent } from './plantilla-general/plantilla-general.component';
import { FirebaseEstudianteService } from '../Servicios/firebase-estudiante.service';
import { CrearCuentaEncargadoComponent } from './crear-cuenta-encargado/crear-cuenta-encargado.component';
import { CrearCuentaAdministradorGeneralComponent } from './crear-cuenta-administrador-general/crear-cuenta-administrador-general.component';
import { CrearCuentaEstudianteComponent } from './crear-cuenta-estudiante/crear-cuenta-estudiante.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { GestionarCarrerasComponent, preguntaEliminar } from './gestionar-carreras/gestionar-carreras.component';
import { editarPlanes, VerCarreraParticularComponent, AgregarPlan } from './ver-carrera-particular/ver-carrera-particular.component';
import { CrearCarreraComponent } from './crear-carrera/crear-carrera.component';
import { DynamicHostDirective } from './directivas/dynamic-host.directive';
import { DinamicFileContainerComponent } from './dinamic/dinamic-file-container/dinamic-file-container.component';
import { GestionArchivosComponent } from './GestionArchivos/gestion-archivos/gestion-archivos.component';
import { ArchivosInformativoComponent } from './GestionArchivos/archivos-informativo/archivos-informativo.component';
import { DialogCrearArchivoinformativoComponent } from './GestionArchivos/dialog-crear-archivoinformativo/dialog-crear-archivoinformativo.component';
import { ArchivoFormContainerComponent } from './GestionArchivos/archivo-form-container/archivo-form-container.component';
import { DynamicHostFormDirective } from './directivas/dynamic-host-form.directive';
import { DialogSubirFormularioComponent } from './GestionArchivos/dialog-subir-formulario/dialog-subir-formulario.component';
import { VisualizarPracticasAdminComponent } from './visualizar-practicas-admin/visualizar-practicas-admin.component';
import { DefinirFechasImportantesComponent } from './definir-fechas-importantes/definir-fechas-importantes.component';
import { ImportarAlumnosComponent } from './importar-alumnos/importar-alumnos.component';



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
		GestionArchivosComponent,
		ArchivosInformativoComponent,
		DialogCrearArchivoinformativoComponent,
		ArchivoFormContainerComponent,
		DynamicHostFormDirective,
		DialogSubirFormularioComponent,
		VisualizarPracticasAdminComponent,
		DefinirFechasImportantesComponent,
		ImportarAlumnosComponent,
  ],
  entryComponents: [
    // aqui van los componentes que se crean en tiempo de ejecucion
    DinamicFileContainerComponent,
    ArchivosInformativoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    GraficosModule,
    FormsModule,
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
