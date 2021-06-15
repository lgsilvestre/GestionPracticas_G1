/* tslint:disable:no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../../../Servicios/local-storage.service';

@Component({
  selector: 'app-dinamic-file-form-container',
  templateUrl: './archivo-form-container.component.html',
  styleUrls: ['./archivo-form-container.component.css' , '../../../../app.component.css']
})
export class ArchivoFormContainerComponent implements OnInit {

  archivo: FormGroup;
  titulo: string = '';
  descripcion: string = '';
  urlOriginal: string = '';
  urlArchivoEstudiante: string = '';
  files: File[] = [];
  rol: string = ' ';
  constructor(private _formBuilder: FormBuilder, private localStore: LocalStorageService)
  {
    this.rol = localStore.getRol();
    this.archivo = this._formBuilder.group({
      Titulo: ['', Validators.required],
      Texto: ['', Validators.required],
      Archivo: ['', Validators.required],
    });
  }

  ngOnInit(): void { }
  public setValues(titulo: string, descripcion: string, url: string, urlEStudiante: string = ''): void {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.urlOriginal = url;
    this.urlArchivoEstudiante = urlEStudiante;
  }
  onFileChange(event: any): void
  {
    console.log(event.target.files[0]);
    this.files.push(event.target.files[0]);
  }

}
