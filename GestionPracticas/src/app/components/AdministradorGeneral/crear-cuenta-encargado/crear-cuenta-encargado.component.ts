/* tslint:disable:no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import {EncargadoCarrera} from '../../../model/encargadoCarrera.model';
import {GestionEncargadosService} from '../../Servicios/encargado/gestion-encargados.service';
import {DialogElementsExampleDialogComponent} from '../../SuperAdministrador/dialog/dialog-elements-example-dialog/dialog-elements-example-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-crear-cuenta-encargado',
  templateUrl: './crear-cuenta-encargado.component.html',
  styleUrls: ['./crear-cuenta-encargado.component.css', '../../../app.component.css']
})

export class CrearCuentaEncargadoComponent implements OnInit {
  nuevaCuenta: FormGroup;
  carreraActual: string = 'None';
  carreras: string[] = ['Ingeniería Civil en Computación', 'Ingeniería Civil Eléctrica', 'Ingeniería Civil Mecatrónica'];
  constructor(private _formBuilder: FormBuilder, private gestionEncargados: GestionEncargadosService, public dialog: MatDialog) {
    this.nuevaCuenta = this._formBuilder.group({
      Nombres: new FormControl('', [Validators.required, Validators.pattern(('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*'))]),
      Apellidos: new FormControl('', [Validators.required, Validators.pattern(('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*'))]),
      Run: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
      Carrera: new FormControl('', Validators.required),
      CorreoInstitucional: new FormControl('', [Validators.required, Validators.email]),
      CorreoElectronico: new FormControl('', Validators.email),
      Contrasenna1: ['', Validators.required],
      Contrasenna2: ['', Validators.required],
      rol: [{ value: 'Encargado de carrera', disabled: true }],
    });
  }
  ngOnInit(): void
  {}
  onChangeCarrera(event: any): void
  {
    this.carreraActual = event;
  }
  private openDialog(): void
  {
    this.dialog.open(DialogElementsExampleDialogComponent);
  }
  crear(): void
  {
    const rolFinal: string = 'encargadoCarrera';
    if (this.nuevaCuenta.value.Contrasenna1 === this.nuevaCuenta.value.Contrasenna2)
    {
      const nuevoUsuario: EncargadoCarrera =
        {
          nombres: this.nuevaCuenta.value.Nombres,
          apellidos: this.nuevaCuenta.value.Apellidos,
          run: this.nuevaCuenta.value.Run,
          carrera: this.nuevaCuenta.value.Carrera,
          correoInstitucional: this.nuevaCuenta.value.CorreoInstitucional,
          correoPersonal: this.nuevaCuenta.value.CorreoElectronico,
          rol : rolFinal
        };
      console.log(nuevoUsuario);
      this.gestionEncargados.crearNuevoEncargado(nuevoUsuario, this.nuevaCuenta.value.Contrasenna1);
    }
    else
    {
      this.openDialog();
    }
  }
}
