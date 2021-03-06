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
import { PageNotFoundComponent } from './components/pageNotFound/page-not-found.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CrearCuentaEncargadoComponent } from './components/AdministradorGeneral/crear-cuenta-encargado/crear-cuenta-encargado.component';
import { VerCuentasComponent } from './components/SuperAdministrador/ver-cuentas/ver-cuentas.component';
import { CrearCuentasSaComponent } from './components/SuperAdministrador/crear-cuentas-sa/crear-cuentas-sa.component';
import { SolicitarPracticaComponent } from './components/Estudiante/solicitar-practica/solicitar-practica.component';
import { InicioComponent } from './components/Estudiante/inicio/inicio.component';
import { CrearCuentaAdministradorGeneralComponent } from './components/AdministradorGeneral/crear-cuenta-administrador-general/crear-cuenta-administrador-general.component';
import { CrearCuentaEstudianteComponent } from './components/AdministradorGeneral/crear-cuenta-estudiante/crear-cuenta-estudiante.component';
import { CrearCuentaComponent } from './components/AdministradorGeneral/crear-cuenta/crear-cuenta.component';
import { GestionarCarrerasComponent } from './components/AdministradorGeneral/gestionar-carreras/gestionar-carreras.component';
import { VerCarreraParticularComponent } from './components/AdministradorGeneral/ver-carrera-particular/ver-carrera-particular.component';
import { CrearCarreraComponent } from './components/AdministradorGeneral/crear-carrera/crear-carrera.component';
import { VisualizarPracticasAdminComponent } from './components/AdministradorGeneral/visualizar-practicas-admin/visualizar-practicas-admin.component';
import { GestionArchivosComponent } from './components/AdministradorGeneral/GestionArchivos/gestion-archivos/gestion-archivos.component';
import { DefinirFechasImportantesComponent } from './components/AdministradorGeneral/definir-fechas-importantes/definir-fechas-importantes.component';
import {SolicitududPracticaComponent} from './components/Estudiante/solicitudud-practica/solicitudud-practica.component';
import { ImportarAlumnosComponent } from './components/AdministradorGeneral/importar-alumnos/importar-alumnos.component';


const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'menu-admin-general', component: MenuAdminGeneralComponent },
	{ path: 'menu-estudiante', component: MenuEstudianteComponent },
	{ path: 'plantilla-general', component: PlantillaGeneralComponent },
	{ path: 'editar-solicitud-practica', component: EditarSolicitudProcesoPracticaComponent },
	{ path: 'menu-encargado-carrera', component: MenuEncargadoCarreraComponent },
	{ path: 'visualizar-practica', component: VisualizarComponent },
	{ path: 'editar-cuenta', component: EditarCuentaComponent },
	{ path: 'ver-cuentas', component: VerCuentasComponent },
    { path: 'importar-alumnos', component: ImportarAlumnosComponent },
	{ path: 'crear-cuentas-sa', component: CrearCuentasSaComponent },
	{ path: 'crear-cuenta/encargado-carrera', component: CrearCuentaEncargadoComponent },
	{ path: 'crear-cuenta/admin-general', component: CrearCuentaAdministradorGeneralComponent },
	{ path: 'crear-cuenta/estudiante', component: CrearCuentaEstudianteComponent },
	{ path: 'crear-cuenta', component: CrearCuentaComponent },
	{ path: 'gestionar-carreras', component: GestionarCarrerasComponent },
	{ path: 'gestionar-carreras/ver-carrera-particular/:id', component: VerCarreraParticularComponent },
	{ path: 'gestionar-carreras/crear-carrera', component: CrearCarreraComponent },
	{ path: 'solicitar-practica', component: SolicitarPracticaComponent },
	{ path: 'visualizar-practica-admin', component: VisualizarPracticasAdminComponent },
	{ path: 'solicitud-practica-carrera', component: SolicitududPracticaComponent },
	{ path: 'gestion-archivos', component: GestionArchivosComponent },
	{ path: 'definir-fechas-importantes', component: DefinirFechasImportantesComponent },
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
	],
})
export class AppRoutingModule { }
