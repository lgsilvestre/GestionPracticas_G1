import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-editar-proceso-carrera',
	templateUrl: './editar-proceso-carrera.component.html',
	styleUrls: ['./editar-proceso-carrera.component.css', '../../../app.component.css']
})
export class EditarProcesoCarreraComponent implements OnInit {
	primeraEtapa: FormGroup;
	segundaEtapa: FormGroup;
	terseraEtapa: FormGroup;
	cuartaEtapa: FormGroup;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	constructor(private _formBuilder: FormBuilder) {
		this.primeraEtapa = this._formBuilder.group({
			Nombres: [''],
			Apellidos: [''],
			Carrera: [''],
			NumeroMatricula: [''],
			Run: [''],
			NumeroContacto: [''],
			CorreoElectronico: [''],
			ContactoEmergencia: [''],
			TelefonoEmergencia: [''],
		});
		this.segundaEtapa = this._formBuilder.group({
			Nombre: [''],
			Rut: [''],
			NumeroTelefono: [''],
			CorreoElectronico: [''],
			Direccion: [''],
		});
		this.terseraEtapa = this._formBuilder.group({
			Nombres: [''],
			Apellidos: [''],
			Run: [''],
			AreaDepto: [''],
			Puesto: [''],
			NumeroContacto: [''],
			CorreoElectronico: [''],
		});
		this.cuartaEtapa = this._formBuilder.group({
			startDate: [''],
			endDate: [''],
			HoraInicio: [''],
			HoraFin: [''],
			Jornada: [''],
			Archivo: [],
		});
		this.firstFormGroup = this._formBuilder.group({
			firstCtrl: ['']
		});
		this.secondFormGroup = this._formBuilder.group({
			secondCtrl: ['']
		});
	}

	ngOnInit(): void {
	}

}
