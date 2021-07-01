import { Component, OnInit } from '@angular/core';
import { GraficosService } from '../../Servicios/graficos.service';

@Component({
	selector: 'app-menu-admin-general',
	templateUrl: './menu-admin-general.component.html',
	styleUrls: ['./menu-admin-general.component.css', '../../../app.component.css']
})
export class MenuAdminGeneralComponent implements OnInit {

	constructor(private _gestionGraficos:GraficosService) {
	}

	ngOnInit(): void {
	}

}
