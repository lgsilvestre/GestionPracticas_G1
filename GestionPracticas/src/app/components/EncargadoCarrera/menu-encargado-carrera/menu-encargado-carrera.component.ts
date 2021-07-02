import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-menu-encargado-carrera',
	templateUrl: './menu-encargado-carrera.component.html',
	styleUrls: ['./menu-encargado-carrera.component.css', '../../../app.component.css']
})
export class MenuEncargadoCarreraComponent implements OnInit 
{
    encargadoCarrera: any;

	constructor() 
    {
        this.encargadoCarrera = {nombres: '', apellidos: ''};
        let encargado = JSON.parse(localStorage.getItem('user')+'');
        this.encargadoCarrera.nombres   = encargado.nombres;
        this.encargadoCarrera.apellidos = encargado.apellidos;
    }

	ngOnInit(): void 
    {
    }

}
