import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-crear-cuenta-estudiante',
	templateUrl: './crear-cuenta-estudiante.component.html',
	styleUrls: ['./crear-cuenta-estudiante.component.css', '../../../app.component.css']
})

export class CrearCuentaEstudianteComponent implements OnInit {
	primeraEtapa: FormGroup;
	constructor(private _formBuilder: FormBuilder) {
		this.primeraEtapa = this._formBuilder.group({
			Nombres: new FormControl('', Validators.required),
			Apellidos: new FormControl('', Validators.required),
			Run: new FormControl('', Validators.required),
			Carrera: new FormControl('', Validators.required),
			NumeroMatricula: new FormControl('', Validators.required),
			CorreoInstitucional: new FormControl('', Validators.required),
			Plan: new FormControl(''),
			SituacionActual: new FormControl('', Validators.required),
			AnnoIngreso: new FormControl(''),
			CorreoElectronico: new FormControl('', Validators.required),
			Telefono: new FormControl('', Validators.required),
			rol: [{ value: 'Estudiante', disabled: true }],
			FechaNacimiento: new FormControl(''),
			Comuna: new FormControl(''),
			Direccion: new FormControl(''),
			Nacionalidad: new FormControl(''),
		});
	}
	ngOnInit(): void {
	}
}
