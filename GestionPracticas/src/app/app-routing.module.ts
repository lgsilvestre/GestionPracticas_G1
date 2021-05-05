import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuAdminGeneralComponent } from './components/AdministradorGeneral/menu-admin-general/menu-admin-general.component';
import { MenuEstudianteComponent } from './components/Estudiante/menu-estudiante/menu-estudiante.component';
import { PlantillaGeneralComponent } from './components/AdministradorGeneral/plantilla-general/plantilla-general.component';
import { EditarSolicitudProcesoPracticaComponent } from './components/EncargadoCarrera/editar-solicitud-proceso-practica/editar-solicitud-proceso-practica.component';
import { MenuEncargadoCarreraComponent } from './components/EncargadoCarrera/menu-encargado-carrera/menu-encargado-carrera.component';
import { VisualizarComponent } from './components/EncargadoCarrera/visualizar-practica/visualizar-practica.component';
import { EditarCuentaComponent } from './components/editar-cuenta/editar-cuenta.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { EditarProcesoCarreraComponent } from './components/EncargadoCarrera/editar-proceso-carrera/editar-proceso-carrera.component';



const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'menu-admin-general', component: MenuAdminGeneralComponent },
	{ path: 'menu-estudiante', component: MenuEstudianteComponent },
	{ path: 'plantilla-general', component: PlantillaGeneralComponent },
	{ path: 'editar-solicitud-practica', component: EditarSolicitudProcesoPracticaComponent },
	{ path: 'menu-encargado-carrera', component: MenuEncargadoCarreraComponent },
	{ path: 'visualizar-practica', component: VisualizarComponent },
	{ path: 'editar-cuenta', component: EditarCuentaComponent },
	{ path: 'editar-proceso-carrera', component: EditarProcesoCarreraComponent },
	{ path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
	],
})
export class AppRoutingModule { }
