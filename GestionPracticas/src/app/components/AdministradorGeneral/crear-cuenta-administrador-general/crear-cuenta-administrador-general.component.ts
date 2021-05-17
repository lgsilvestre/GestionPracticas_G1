import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-crear-cuenta-administrador-general',
	templateUrl: './crear-cuenta-administrador-general.component.html',
	styleUrls: ['./crear-cuenta-administrador-general.component.css', '../../../app.component.css']
})

export class CrearCuentaAdministradorGeneralComponent implements OnInit {
	primeraEtapa: FormGroup;
	constructor(private _formBuilder: FormBuilder) {
		this.primeraEtapa = this._formBuilder.group({
			Nombres: new FormControl('', Validators.required),
			Apellidos: new FormControl('', Validators.required),
			Run: new FormControl('', Validators.required),
			CorreoElectronico: new FormControl('', Validators.required),
			CorreoInstitucional: new FormControl('', Validators.required),
			rol: [{ value: 'Encargado de carrera', disabled: true }],
			Telefono: new FormControl('', Validators.required),
		});
	}
	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}
}