import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/material/material.module";
import { EditarSolicitudProcesoPracticaComponent } from './editar-solicitud-proceso-practica/editar-solicitud-proceso-practica.component';
import { MenuEncargadoCarreraComponent } from './menu-encargado-carrera/menu-encargado-carrera.component';
import { GraficosModule } from '../Graficos/graficos.module';
import { VisualizarComponent } from './visualizar-practica/visualizar-practica.component';
import { ReactiveFormsModule } from "@angular/forms";
import { EditarProcesoCarreraComponent } from './editar-proceso-carrera/editar-proceso-carrera.component';
import { DialogoPracticaComponent } from './dialogo-practica/dialogo-practica.component';
import { InicioEncargadoCarreraComponent } from './inicio-encargado-carrera/inicio-encargado-carrera.component';
@NgModule({
  declarations: [
    // Aca van los modulos que se crean
    EditarSolicitudProcesoPracticaComponent,
    MenuEncargadoCarreraComponent,
    VisualizarComponent,
    EditarProcesoCarreraComponent,
    DialogoPracticaComponent,
    InicioEncargadoCarreraComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GraficosModule,
    ReactiveFormsModule
  ],
  exports: [
    // Aca van los modulos que se crean
  ]
})
export class EncargadoCarreraModule{}
