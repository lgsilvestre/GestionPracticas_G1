/* tslint:disable:no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import {DialogElementsExampleDialogComponent} from '../../SuperAdministrador/dialog/dialog-elements-example-dialog/dialog-elements-example-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {GestionEstudianteService} from '../../Servicios/estudiante/gestionEstudiante.service';
import {Estudiante} from '../../../model/estudiante.model';

@Component({
  selector: 'app-crear-cuenta-estudiante',
  templateUrl: './crear-cuenta-estudiante.component.html',
  styleUrls: ['./crear-cuenta-estudiante.component.css', '../../../app.component.css']
})

export class CrearCuentaEstudianteComponent implements OnInit
{
  estudiante: FormGroup;
  carreraActual: string = 'None';
  carreras: string[] = ['Ingeniería Civil en Computación', 'Ingeniería Civil Eléctrica', 'Ingeniería Civil Mecatrónica'];
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, public gestionEstudiante: GestionEstudianteService) {
    this.estudiante = this._formBuilder.group({
      Nombres: new FormControl('', Validators.required),
      Apellidos: new FormControl('', Validators.required),
      Run: new FormControl('', Validators.required),
      Carrera: new FormControl('', Validators.required),
      NumeroMatricula: new FormControl('', Validators.required),
      CorreoInstitucional: new FormControl('', Validators.required),
      SituacionActual: new FormControl('', Validators.required),
      CorreoElectronico: new FormControl('', Validators.required),
      Telefono: new FormControl('', Validators.required),
      Contrasenna1: ['', Validators.required],
      Contrasenna2: ['', Validators.required],
      rol: [{ value: 'Estudiante', disabled: true }],
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
    const rolFinal: string = 'estudiante';
    if (this.estudiante.value.Contrasenna1 === this.estudiante.value.Contrasenna2)
    {
      const nuevoUsuario: Estudiante =
        {
          apellidos: this.estudiante.value.Apellidos,
          carrera: this.estudiante.value.Carrera,
          correoInstitucional: this.estudiante.value.CorreoInstitucional,
          nombres: this.estudiante.value.Nombres,
          numeroMatricula: this.estudiante.value.NumeroMatricula,
          rol: rolFinal,
          run: this.estudiante.value.Run,
          situacionActual: this.estudiante.value.SituacionActual,
          telefono: this.estudiante.value.Telefono
        };
      console.log(nuevoUsuario);
      this.gestionEstudiante.crearNuevoEstudiante(nuevoUsuario, this.estudiante.value.Contrasenna1);
    }
    else
    {
      this.openDialog();
    }
  }
}

