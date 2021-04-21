import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuEstudianteComponent } from "./menu-estudiante/menu-estudiante.component";
import { MaterialModule } from '../../material/material.module';
import { InicioComponent } from "./inicio/inicio.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    // Aca van los modulos que se crean
    MenuEstudianteComponent,
    InicioComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    // Aca van los modulos que se crea.
  ]
})
export class EstudianteModule{}
