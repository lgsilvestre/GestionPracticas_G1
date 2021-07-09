/* tslint:disable:no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../Servicios/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../dialogs/alert/alert.component';
import { PracticaService } from '../../Servicios/practica.service';

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
  urlSeguroPractica: string = ' ';
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
    private miPracticaService: PracticaService
  ) {
    this.rol = this.locaSTF.getRol();
    this.asignarFecha(this.fechaInicio,this.fechaFin);
  }
  ngOnInit(): void {
    this.miPracticaService.getPractica$().subscribe(respuesta => {
      this.estadoPractica = respuesta.estadoDePractica;
      this.urlEvaluacionEmpresa = respuesta.urlEvaluacionEmpresa;
      this.urlInformePractica = respuesta.urlInformePractica;
      this.urlSeguroPractica = respuesta.urlSeguroDePractica;
      this.asignarFecha(respuesta.fechaInicio,respuesta.fechaTermino);
    })
  }
  comprarFeschas(): boolean {
    if (this.fechaActual > this.fechaFin) {
      return true;
    }
    return false;
  }
  public subirInforme(): void {
    if (this.informe.length > 0) {
      // llamar al metodo de subir informe de el servicio practica
      this.miPracticaService.subirInformePractica(this.informe[0]);
      this.editarInformeValue = false;
    }
    else {
      this.openNoFileDialog();
    }
  }
  public subirEvaluacion(): void {
    if (this.evaluacion.length > 0) {
      // llamar al metodo de subir evaluacion de el servicio practica
      this.miPracticaService.subirEvaluacionEmpresa(this.evaluacion[0]);
      this.editarEvaluacionValue = false;
    }
    else {
      this.openNoFileDialog();
    }
  }
  onInformeChange(event: any): void {
    console.log(event.target.files[0]);
    this.informe[0] = event.target.files[0];
  }
  onEvaluacionChange(event: any): void {
    console.log(event.target.files[0]);
    this.evaluacion[0] = event.target.files[0];
  }
  changeEditInforme(valor: boolean): void {
    this.editarInformeValue = valor;
  }
  changeEditEvaluacion(valor: boolean): void {
    this.editarEvaluacionValue = valor;
  }
  openNoFileDialog(): void {
    const tituloAc: string = 'Ningun Archivo Seleccionado';
    const contenidoAc: string = 'no se detecto ningun archivo seleccionado, por favor selecciones uno';
    this.dialog.open(AlertComponent, {
      data: {
        titulo: tituloAc,
        contenido: contenidoAc,
      }
    });
  }
  private cargarPractica(): void { }
  asignarFecha(fechaInicio:Date, fechaFin:Date) {
    const options = {
      day: 'numeric', month: 'numeric', year: 'numeric'
    };
    const fechainicioFormato = new Intl.DateTimeFormat('es', options).format(this.fechaInicio);
    const fechaFinFormato = new Intl.DateTimeFormat('es', options).format(this.fechaFin);
    this.fechaInicioMostrar = fechainicioFormato.toString();
    this.fechaFinMostrar = fechaFinFormato.toString();
  }

}
