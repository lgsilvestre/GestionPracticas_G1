/* tslint:disable:no-inferrable-types */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archivos-informativo',
  templateUrl: './archivos-informativo.component.html',
  styleUrls: ['./archivos-informativo.component.css']
})
export class ArchivosInformativoComponent implements OnInit {
  id: number = 0;
  nombre: string = '';
  textoInformativo: string = '';
  urlArchivo: string = '';
  visible: boolean = true;

  constructor() { }

  ngOnInit(): void
  {
  }
  setValues(id: number, nombre: string, textoInformativo: string, url: string ): void
  {
    this.id = id;
    this.nombre = nombre;
    this.textoInformativo = textoInformativo;
    this.urlArchivo = url;
  }

}
