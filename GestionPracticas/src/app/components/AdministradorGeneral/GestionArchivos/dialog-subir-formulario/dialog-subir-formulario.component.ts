import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GestionarArchivosGeneralesService} from '../../../Servicios/gestionar-archivos-generales.service';
import {ArchivoFormularioModel} from '../../../../model/archivoFormulario.model';

@Component({
  selector: 'app-dialog-subir-formulario',
  templateUrl: './dialog-subir-formulario.component.html',
  styleUrls: ['./dialog-subir-formulario.component.css', '../../../../app.component.css']
})
export class DialogSubirFormularioComponent implements OnInit {
  crearArchivo: FormGroup;
  files: File [] = [];
  constructor(private _formBuilder: FormBuilder, private gestionArchivosGenerales: GestionarArchivosGeneralesService) {
    this.crearArchivo = this._formBuilder.group({
      Titulo: ['', Validators.required],
      Texto: ['', Validators.required],
      Archivo: ['', Validators.required],
    });
  }
  ngOnInit(): void { }
  onFileChange(event: any): void
  {
    console.log(event.target.files[0]);
    this.files.push(event.target.files[0]);
  }
  subirArchivo(): void
  {
    const formulario: ArchivoFormularioModel = {
      id: ' ',
      nombre: this.crearArchivo.value.Titulo,
      textoInformativo: this.crearArchivo.value.Texto,
      urlOriginal: ' ',
      urlArchivoEstuduante: ' ',
      filename: ' ',
      visible: true
    };
    this.gestionArchivosGenerales.upLoadArchivoFormulario(this.files[0], formulario);
  }

}
