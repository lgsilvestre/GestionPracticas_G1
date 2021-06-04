import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuEstudianteComponent } from "./menu-estudiante/menu-estudiante.component";
import { MaterialModule } from '../../material/material.module';
import { InicioComponent } from "./inicio/inicio.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminGeneralModule } from '../AdministradorGeneral/adminGeneral.module';
import { SolicitarPracticaComponent } from './solicitar-practica/solicitar-practica.component';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
	declarations: [
		// Aca van los modulos que se crean
		MenuEstudianteComponent,
		InicioComponent,
		SolicitarPracticaComponent,
		FooterComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		AdminGeneralModule,
	],
	exports: [
		// Aca van los modulos que se crea.
		FooterComponent
	]
})
export class EstudianteModule { }
