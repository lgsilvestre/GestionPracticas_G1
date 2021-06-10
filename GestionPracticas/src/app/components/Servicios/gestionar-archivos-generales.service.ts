import { Injectable } from '@angular/core';
import {ArchivoInformativoModel} from '../../model/archivoInformativo.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionarArchivosGeneralesService
{
  private archivos$ = new BehaviorSubject<ArchivoInformativoModel[]>([]);
  archivos: ArchivoInformativoModel[] = [{
    id: 0,
    nombre: 'informativo',
    textoInformativo: 'hola soy un archivo informativo',
    urlArchivo: 'www.google.cl',
    visible: true }];

  constructor()
  { }
  updateGeneralFiles(): void
  {
    this.archivos$.next(this.archivos);
  }
  getGeneralFiles(): BehaviorSubject<ArchivoInformativoModel[]>
  {
    return this.archivos$;
  }
}
