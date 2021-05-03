import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.css', '../../app.component.css']
})
export class SidenavComponent implements OnInit {
	user: any = JSON.parse(localStorage.getItem('user') || '{}');
	soyEstudiante: boolean = false;
	soyAdminGeneral: boolean = false;
	soyEncargadoDeCarrera: boolean = false;
	constructor(public auth: AngularFireAuth) {
	}

	ngOnInit(): void {
		console.log("ngOnInit");
		if (this.user.rol == "estudiante") {
			this.soyEstudiante = true;
			this.soyAdminGeneral = this.soyEncargadoDeCarrera = false;
		}
		if (this.user.rol == "administradorGeneral") {
			this.soyAdminGeneral = true;
			this.soyEstudiante = this.soyEncargadoDeCarrera = false;
		}
		if (this.user.rol == "encargadoCarrera") {
			this.soyEncargadoDeCarrera = true;
			this.soyEstudiante = this.soyAdminGeneral = false;
		}
		this.user = JSON.parse(localStorage.getItem('user') || '{}');
	}

	cambiarAdmin() {
		this.soyAdminGeneral = true;
		this.soyEstudiante = false;
		this.soyEncargadoDeCarrera = false;
	}

	cambiarEstudiante() {
		this.soyEstudiante = true;
		this.soyAdminGeneral = false;
		this.soyEncargadoDeCarrera = false;
	}

	cambiarEncargadoCarrera() {
		this.soyEncargadoDeCarrera = true;
		this.soyAdminGeneral = false;
		this.soyEstudiante = false;
	}

	deslogear() {
		this.user = '';
		localStorage.setItem('user', JSON.stringify(this.user));
		this.auth.signOut();
	}

}
