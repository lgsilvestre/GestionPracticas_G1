/* tslint:disable:no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../../Servicios/local-storage.service';
import {GestionarArchivosGeneralesService} from '../../../Servicios/gestionar-archivos-generales.service';

@Component({
  selector: 'app-archivos-informativo',
  templateUrl: './archivos-informativo.component.html',
  styleUrls: ['./archivos-informativo.component.css', '../../../../app.component.css']
})
export class ArchivosInformativoComponent implements OnInit {
  id: string = '0';
  nombre: string = '';
  textoInformativo: string = '';
  urlArchivo: string = '';
  visible: boolean = true;
  filename: string = '';
  rol: string = ' ';
  constructor(
    private localStore: LocalStorageService,
    private gestionArchivosGenerales: GestionarArchivosGeneralesService
  )
  {
    this.rol = localStore.getRol();
  }
  ngOnInit(): void
  {}
  setValues(id: string, nombre: string, textoInformativo: string, url: string, filename: string): void
  {
    this.id = id;
    this.nombre = nombre;
    this.textoInformativo = textoInformativo;
    this.urlArchivo = url;
    this.filename = filename;
  }
  borrarArchivo(): void
  {
    this.gestionArchivosGenerales.deleteFile(this.id, this.filename);
  }

}
