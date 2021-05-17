import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-crear-cuenta-encargado',
	templateUrl: './crear-cuenta-encargado.component.html',
	styleUrls: ['./crear-cuenta-encargado.component.css', '../../../app.component.css']
})

export class crearCuentaEncargadoComponent implements OnInit {
	primeraEtapa: FormGroup;
	constructor(private _formBuilder: FormBuilder) {
		this.primeraEtapa = this._formBuilder.group({
			Nombres: new FormControl('', Validators.required),
			Apellidos: new FormControl('', Validators.required),
			Run: new FormControl('', Validators.required),
			Carrera: new FormControl('', Validators.required),
			CorreoInstitucional: new FormControl('', Validators.required),
			CorreoElectronico: new FormControl(''),
			rol: [{ value: 'Encargado de carrera', disabled: true }],
		});
	}
	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}
}