import { Component, OnInit } from '@angular/core';
import { GraficosService } from '../../Servicios/graficos.service';

@Component({
  selector: 'app-menu-encargado-carrera',
  templateUrl: './menu-encargado-carrera.component.html',
  styleUrls: ['./menu-encargado-carrera.component.css', '../../../app.component.css']
})
export class MenuEncargadoCarreraComponent implements OnInit {
  encargadoCarrera: any;
  cantidadSolicitudesPracticasPendientes: number = 0;
  user: any = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private _gestionGraficos: GraficosService) {
    this.encargadoCarrera = { nombres: '', apellidos: '' };
    let encargado = JSON.parse(localStorage.getItem('user') + '');
    this.encargadoCarrera.nombres = encargado.nombres;
    this.encargadoCarrera.apellidos = encargado.apellidos;

    this._gestionGraficos.obtenerInformacionSolicitudPracticasPendientesCarrera(this.user.carrera).valueChanges().subscribe(datos => {
      this.cantidadSolicitudesPracticasPendientes = datos.length;
    })
  }

  ngOnInit(): void {
  }

}
