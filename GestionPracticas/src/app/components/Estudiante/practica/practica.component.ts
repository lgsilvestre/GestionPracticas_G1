import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../Servicios/local-storage.service';

@Component({
  selector: 'app-practica',
  templateUrl: './practica.component.html',
  styleUrls: ['./practica.component.css']
})
export class PracticaComponent implements OnInit {

  urlInformePractica: string = ' ';
  urlSeguroPractica: string = 'https://www.google.com/';
  estadoPractica: string = 'pendiente';
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  fechaInicioMostrar: string = '';
  fechaFinMostrar: string = '';
  fechaActual: Date = new Date();
  rol: string;
  constructor(
    private locaSTF: LocalStorageService
  )
  {
    this.rol = this.locaSTF.getRol();
    const options = {
        day: 'numeric', month: 'numeric', year: 'numeric'
    };
    const fechainicioFormato = new Intl.DateTimeFormat('es', options).format(this.fechaInicio);
    const fechaFinFormato = new Intl.DateTimeFormat('es', options).format(this.fechaFin);
    this.fechaInicioMostrar = fechainicioFormato.toString();
    this.fechaFinMostrar = fechaFinFormato.toString();
  }
  ngOnInit(): void
  {
  }
  comprarFeschas(): boolean
  {
    if (this.fechaActual > this.fechaFin)
    {
      return true;
    }
    return false;
  }

}
