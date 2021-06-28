import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker/calendar-body';
import { GestionCarreraService } from '../../Servicios/adminGenerla/gestion-carrera.service';

@Component({
	selector: 'app-inicio',
	templateUrl: './inicio.component.html',
	styleUrls: ['./inicio.component.css', '../../../app.component.css'],
	providers: [{
		provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
	}]
})
export class InicioComponent implements OnInit {

  constructor(private _gestionCarrera:GestionCarreraService){

  }

  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  userName: string = this.user.nombres;
  userApellidos: string = this.user.apellidos;

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
    this._gestionCarrera.getPlanesEstudios().subscribe( respuesta => {
      console.log(respuesta);
    })

  }

}
