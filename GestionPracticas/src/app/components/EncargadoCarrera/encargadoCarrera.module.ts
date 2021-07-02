import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/material/material.module";
import { EditarSolicitudProcesoPracticaComponent } from './editar-solicitud-proceso-practica/editar-solicitud-proceso-practica.component';
import { MenuEncargadoCarreraComponent } from './menu-encargado-carrera/menu-encargado-carrera.component';
import { GraficosModule } from '../Graficos/graficos.module';
import { VisualizarComponent } from './visualizar-practica/visualizar-practica.component';
import { ReactiveFormsModule } from "@angular/forms";
import { DialogoPracticaComponent } from 'src/app/components/EncargadoCarrera/dialogo-practica/dialogo-practica.component';

@NgModule({
  declarations: [
    // Aca van los modulos que se crean
    EditarSolicitudProcesoPracticaComponent,
    MenuEncargadoCarreraComponent,
    VisualizarComponent,
    DialogoPracticaComponent,

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
export class EncargadoCarreraModule { }
