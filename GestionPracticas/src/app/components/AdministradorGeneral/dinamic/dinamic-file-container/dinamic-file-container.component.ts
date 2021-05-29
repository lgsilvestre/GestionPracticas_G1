/* tslint:disable:no-inferrable-types */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dinamic-file-container',
  templateUrl: './dinamic-file-container.component.html',
  styleUrls: ['./dinamic-file-container.component.css']
})
export class DinamicFileContainerComponent implements OnInit {

  titulo: string = '';
  descripcion: string = '';
  url: string = '';
  constructor() { }

  ngOnInit(): void
  {}
  public setValues(titulo: string, descripcion: string, url: string): void
  {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.url = url;
  }

}
