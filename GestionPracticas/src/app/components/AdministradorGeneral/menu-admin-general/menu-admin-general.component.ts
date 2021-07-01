import { Component, OnInit } from '@angular/core';
import { GraficosService } from '../../Servicios/graficos.service';

@Component({
	selector: 'app-menu-admin-general',
	templateUrl: './menu-admin-general.component.html',
	styleUrls: ['./menu-admin-general.component.css', '../../../app.component.css']
})
export class MenuAdminGeneralComponent implements OnInit {

  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  practicasPendientes: number = 0;

	constructor(private _gestionGraficos:GraficosService) {
    this._gestionGraficos.obtenerInformacionPracticasPendientes().valueChanges().subscribe(datos => {
      this.practicasPendientes = datos.length;
    })
	}

	ngOnInit(): void {
	}

}
