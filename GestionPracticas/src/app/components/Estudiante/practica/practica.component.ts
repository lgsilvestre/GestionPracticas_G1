import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-practica',
  templateUrl: './practica.component.html',
  styleUrls: ['./practica.component.css']
})
export class PracticaComponent implements OnInit {

  urlInformePractica: string = 'https://www.google.com/';
  urlSeguroPractica: string = 'https://www.google.com/';
  estadoPractica: string = 'pendiente';
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  fechaInicioMostrar: string = '';
  fechaFinMostrar: string = '';
  fechaActual: Date = new Date();
  constructor(){
    const options = {
        day: 'numeric', month: 'numeric', year: 'numeric'
    };
    const fechainicioFormato = new Intl.DateTimeFormat('es', options).format(this.fechaInicio);
    const fechaFinFormato = new Intl.DateTimeFormat('es', options).format(this.fechaFin);
    this.fechaInicioMostrar = fechainicioFormato.toString();
    this.fechaFinMostrar = fechaFinFormato.toString();
  }
  ngOnInit(): void {
  }

}
