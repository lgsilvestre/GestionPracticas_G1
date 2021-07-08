/* tslint:disable:no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../Servicios/local-storage.service';
import {MatDialog} from '@angular/material/dialog';
import {AlertComponent} from '../../dialogs/alert/alert.component';
import {PracticaService} from '../../Servicios/practica.service';

@Component({
  selector: 'app-practica',
  templateUrl: './practica.component.html',
  styleUrls: ['./practica.component.css']
})
export class PracticaComponent implements OnInit {
  editarInformeValue: boolean = false;
  editarEvaluacionValue: boolean = false;
  notaPractica: string = ' ';
  urlInformePractica: string = ' ';
  urlSeguroPractica: string = 'https://www.google.com/';
  urlEvaluacionEmpresa: string = ' ';
  estadoPractica: string = 'pendiente';
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date(1995, 11, 17);
  fechaInicioMostrar: string = '';
  fechaFinMostrar: string = '';
  fechaActual: Date = new Date();
  rol: string;
  informe: File[] = [];
  evaluacion: File[] = [];
  constructor(
    private locaSTF: LocalStorageService,
    public dialog: MatDialog,
    private miPeacticaService: PracticaService
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
  public subirInforme(): void
  {
    if (this.informe.length > 0)
    {
      // llamar al metodo de subir informe de el servicio practica
      this.editarInformeValue = false;
    }
    else
    {
      this.openNoFileDialog();
    }
  }
  public subirEvaluacion(): void
  {
    if (this.informe.length > 0)
    {
      // llamar al metodo de subir evaluacion de el servicio practica
      this.editarEvaluacionValue = false;
    }
    else
    {
      this.openNoFileDialog();
    }
  }
  onInformeChange(event: any): void
  {
    console.log(event.target.files[0]);
    this.informe.push(event.target.files[0]);
  }
  onEvaluacionChange(event: any): void
  {
    console.log(event.target.files[0]);
    this.evaluacion.push(event.target.files[0]);
  }
  changeEditInforme(valor: boolean): void
  {
    this.editarInformeValue = valor;
  }
  changeEditEvaluacion(valor: boolean): void
  {
    this.editarEvaluacionValue = valor;
  }
  openNoFileDialog(): void
  {
    const tituloAc: string = 'Ningun Archivo Seleccionado';
    const contenidoAc: string = 'no se detecto ningun archivo seleccionado, por favor selecciones uno';
    this.dialog.open(AlertComponent, {
      data: {
        titulo: tituloAc,
        contenido: contenidoAc,
      }
    });
  }
  private cargarPractica(): void
  {}

}
