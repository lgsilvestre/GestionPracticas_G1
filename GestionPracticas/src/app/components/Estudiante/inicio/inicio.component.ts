import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker/calendar-body';

@Component({
	selector: 'app-inicio',
	templateUrl: './inicio.component.html',
	styleUrls: ['./inicio.component.css', '../../../app.component.css'],
	providers: [{
		provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
	}]
})
export class InicioComponent implements OnInit {


	// firstFormGroup: FormGroup;
	// secondFormGroup: FormGroup;

	// constructor(private _formBuilder: FormBuilder) {
	// 	this.firstFormGroup = this._formBuilder.group({
	// 		firstCtrl: ['', Validators.required]
	// 	});
	// 	this.secondFormGroup = this._formBuilder.group({
	// 		secondCtrl: ['', Validators.required]
	// 	});
	// }

	fecha_seleccionada = new Date('2021/05/29')
	fecha_seleccionada_arreglo = [new Date('2021/05/29'), new Date('2022/01/29')];
	fechas_multiple: Boolean= true;
	dateClass() {
		return (fecha_seleccionada: Date): MatCalendarCellCssClasses => {
			if (fecha_seleccionada.getDate() === 1) 
			{return 'special-date';}
			else 
			{return 'nothing'}
		};
	}

	// getFecha()
	// {
	// 	return this.fecha_seleccionada.getDate;
	// }

	ngOnInit(): void {
	}

}
