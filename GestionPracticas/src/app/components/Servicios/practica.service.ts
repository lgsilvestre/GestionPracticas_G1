import { Injectable } from '@angular/core';
import {Practica} from '../../model/practica.model';

@Injectable({
  providedIn: 'root'
})
export class PracticaService {

  constructor() { }
  private cargarPractica(): boolean
  {
    return true;
  }
  /*
  public getPractica(): Practica
  {}
   */
  public subirSeguroPractica(seguro: File): void
  {}
  public subirInformePractica(informe: File): void
  {}
  public subirEvaluacionEmpresa(evaluacionEmpresa: File): void
  {}
}
