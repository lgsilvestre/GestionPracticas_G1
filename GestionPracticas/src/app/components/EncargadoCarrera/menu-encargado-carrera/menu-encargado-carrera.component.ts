import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../Servicios/autenticacion.service';

@Component({
	selector: 'app-menu-encargado-carrera',
	templateUrl: './menu-encargado-carrera.component.html',
	styleUrls: ['./menu-encargado-carrera.component.css', '../../../app.component.css']
})
export class MenuEncargadoCarreraComponent implements OnInit 
{
    encargadoCarrera: JSON;

	constructor(private autenticacionService: AutenticacionService) 
    {
        this.encargadoCarrera = JSON.parse(localStorage.getItem('user')+'');
    }

	ngOnInit(): void 
    {

    }

}
