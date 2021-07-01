import { Component, OnInit } from '@angular/core';
import { GestionCarreraService } from '../../Servicios/adminGenerla/gestion-carrera.service';
import { GraficosService } from '../../Servicios/graficos.service';

@Component({
	selector: 'app-menu-admin-general',
	templateUrl: './menu-admin-general.component.html',
	styleUrls: ['./menu-admin-general.component.css', '../../../app.component.css']
})
export class MenuAdminGeneralComponent implements OnInit {

  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  practicasPendientes: number = 0;

  carreras:string[] = [];
  opcionCarrera:string = "click aca plis";
  activarDropdown:boolean = false;

	constructor(private _gestionGraficos:GraficosService, private _gestionCarreras:GestionCarreraService) {
    this._gestionGraficos.obtenerInformacionSolicitudPracticasPendientes().valueChanges().subscribe(datos => {
      this.practicasPendientes = datos.length;
    })
	}

	ngOnInit(): void {
    this.rellenarCarrera();
    // if(this.user.rol != "administrador"){
    //   console.log("No es adminitrador");
    //   this.activarDropdown = false;
    // }else{
    //   console.log("Es administrador");
    //   this.activarDropdown = true;
    // }
	}

  cambiarCarrera(carrera:string){
    this.opcionCarrera = carrera;
  }

  rellenarCarrera(){
    this._gestionCarreras.getCarreras().subscribe(carreras => {
      carreras.forEach( datos => {
        this.carreras.push(datos.nombreCarrera!);
        console.log(datos.nombreCarrera);
        console.log(this.carreras.length);
      })
    })
  }


}
