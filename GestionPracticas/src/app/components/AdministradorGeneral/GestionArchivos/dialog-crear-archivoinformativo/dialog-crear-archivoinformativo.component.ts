import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionarArchivosGeneralesService } from '../../../Servicios/gestionar-archivos-generales.service';
import {ArchivoInformativoModel} from '../../../../model/archivoInformativo.model';

@Component({
  selector: 'app-dialog-crear-archivoinformativo',
  templateUrl: './dialog-crear-archivoinformativo.component.html',
  styleUrls: ['./dialog-crear-archivoinformativo.component.css', '../../../../app.component.css']
})
export class DialogCrearArchivoinformativoComponent implements OnInit {
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
    const archivo: ArchivoInformativoModel = {
      id: ' ',
      nombre: this.crearArchivo.value.Titulo,
      textoInformativo: this.crearArchivo.value.Texto,
      urlArchivo: ' ',
      visible: true
    };
    this.gestionArchivosGenerales.upLoadArchivoInformativo(this.files[0], archivo);
  }

}

