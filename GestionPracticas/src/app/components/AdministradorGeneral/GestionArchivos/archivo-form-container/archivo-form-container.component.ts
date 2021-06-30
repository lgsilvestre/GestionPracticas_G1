/* tslint:disable:no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../../../Servicios/local-storage.service';
import {SolicitudInscripcionPracticaService} from '../../../Servicios/solicitud-inscripcion-practica.service';
import {ArchivoFormularioModel} from '../../../../model/archivoFormulario.model';

@Component({
  selector: 'app-dinamic-file-form-container',
  templateUrl: './archivo-form-container.component.html',
  styleUrls: ['./archivo-form-container.component.css' , '../../../../app.component.css']
})
export class ArchivoFormContainerComponent implements OnInit {

  id: string = '';
  filename: string = '';
  archivo: FormGroup;
  titulo: string = '';
  descripcion: string = '';
  urlOriginal: string = '';
  urlArchivoEstudiante: string = '';
  files: File[] = [];
  rol: string = ' ';
  constructor(private _formBuilder: FormBuilder,
              private localStore: LocalStorageService,
              private solicitudInscripcion: SolicitudInscripcionPracticaService)
  {
    this.rol = localStore.getRol();
    this.archivo = this._formBuilder.group({
      Titulo: ['', Validators.required],
      Texto: ['', Validators.required],
      Archivo: ['', Validators.required],
    });
  }

  ngOnInit(): void { }
  setValues(id: string, titulo: string, textoInformativo: string, urlOriginal: string, urlEStudiante: string, filename: string): void
  {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = textoInformativo;
    this.urlOriginal = urlOriginal;
    this.filename = filename;
  }
  onFileChange(event: any): void
  {
    console.log(event.target.files[0]);
    this.files.push(event.target.files[0]);
  }
  subirArchivo(): void
  {
    const nuevoFormularioAlumno: ArchivoFormularioModel = {
      id : ' ',
      nombre: this.titulo,
      textoInformativo: this.descripcion,
      urlOriginal: this.urlOriginal,
      urlArchivoEstuduante: ' ',
      filename: ' ',
      visible: true
    };
    this.solicitudInscripcion.upDocumentoFormularioEstudiante(nuevoFormularioAlumno);
  }

}
