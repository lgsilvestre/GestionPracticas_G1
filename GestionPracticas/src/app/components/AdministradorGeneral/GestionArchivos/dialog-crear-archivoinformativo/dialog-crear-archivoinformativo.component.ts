import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GestionarArchivosGeneralesService} from '../../../Servicios/gestionar-archivos-generales.service';

@Component({
  selector: 'app-dialog-crear-archivoinformativo',
  templateUrl: './dialog-crear-archivoinformativo.component.html',
  styleUrls: ['./dialog-crear-archivoinformativo.component.css']
})
export class DialogCrearArchivoinformativoComponent implements OnInit {
  crearArchivo: FormGroup;
  constructor(private _formBuilder: FormBuilder, private gestionArchivosGenerales: GestionarArchivosGeneralesService)
  {
    this.crearArchivo = this._formBuilder.group({
      Titulo: ['', Validators.required],
      Texto: ['', Validators.required],
      Archivo: ['', Validators.required],
    });
  }

  ngOnInit(): void
  {}

}
