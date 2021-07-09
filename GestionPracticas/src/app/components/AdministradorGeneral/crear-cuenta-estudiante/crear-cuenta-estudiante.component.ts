/* tslint:disable:no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import {DialogElementsExampleDialogComponent} from '../../SuperAdministrador/dialog/dialog-elements-example-dialog/dialog-elements-example-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {GestionEstudianteService} from '../../Servicios/estudiante/gestionEstudiante.service';
import {Estudiante} from '../../../model/estudiante.model';
import { GestionCarreraService } from '../../Servicios/adminGenerla/gestion-carrera.service';
import { Carrera } from 'src/app/model/carreras.model';
import { Router } from '@angular/router';
declare let alertify: any;

@Component({
  selector: 'app-crear-cuenta-estudiante',
  templateUrl: './crear-cuenta-estudiante.component.html',
  styleUrls: ['./crear-cuenta-estudiante.component.css', '../../../app.component.css']
})

export class CrearCuentaEstudianteComponent implements OnInit
{
  estudiante: FormGroup;
  carreraActual: string = 'None';
  carreras: string[] = [];
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, public gestionEstudiante: GestionEstudianteService,
              private _gestionCarrera:GestionCarreraService,private route: Router) {
    this.estudiante = this._formBuilder.group({
      Nombres: new FormControl('', [Validators.required, Validators.pattern(('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*'))]),
      Apellidos: new FormControl('', [Validators.required, Validators.pattern(('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*'))]),
      Run: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern(/^[0-9]+\-(([0-9kK]{1,1}))$/)]),
      Carrera: new FormControl(''),
      NumeroMatricula: new FormControl('', [Validators.required, Validators.pattern('^20[0-9]{8,8}$')]),
      CorreoInstitucional: new FormControl('', [Validators.required, Validators.pattern(/^[a-z]+[a-z0-9]*@alumnos\.utalca\.cl$/)]),
      SituacionActual: new FormControl('', [Validators.required, Validators.pattern(('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*'))]),
      CorreoElectronico: new FormControl('', [Validators.required, Validators.email]),
      Telefono: new FormControl('', [Validators.required, Validators.pattern(/^(\+569[0-9]{8,8}|\+569 [0-9]{8,8}|[0-9]{8,8}|569[0-9]{8,8})$/)]),
      Contrasenna1: ['', Validators.required],
      Contrasenna2: ['', Validators.required],
    });
  }
  ngOnInit(): void
  {
    this._gestionCarrera.getCarreras().subscribe(carrerasDatos => {
      console.log(carrerasDatos);
      carrerasDatos.forEach( carreraObtenida => {
        console.log(carreraObtenida);
        this.verificarCarreraRepetida(carreraObtenida);
      })
    })
  }
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
    if ( this.estudiante.status == "INVALID" )
    {
        console.log(this.estudiante.controls.Nombres.invalid);
        console.log(this.estudiante.controls.Apellidos.invalid);
        console.log(this.estudiante.controls.Run.invalid);
        console.error(this.estudiante.controls.Carrera.invalid);
        console.error(this.estudiante.controls.Carrera.hasError('required'));
        console.log(this.estudiante.controls.CorreoInstitucional.invalid);
        console.log(this.estudiante.controls.SituacionActual.invalid);
        console.log(this.estudiante.controls.CorreoElectronico.invalid);
        console.log(this.estudiante.controls.Telefono.invalid);
        console.log(this.estudiante.controls.Contrasenna1.invalid);
        console.log(this.estudiante.controls.Contrasenna2.invalid);

        alertify.error("Error, existen campos con valores no válidos!");
        return;
    }


    if (this.estudiante.value.Contrasenna1 === this.estudiante.value.Contrasenna2)
    {
      const nuevoUsuario: Estudiante =
        {
          apellidos: this.estudiante.value.Apellidos,
          carrera: this.estudiante.value.Carrera,
          correoInstitucional: this.estudiante.value.CorreoInstitucional,
          nombres: this.estudiante.value.Nombres,
          numeroMatricula: this.estudiante.value.NumeroMatricula,
          rol: 'estudiante',
          run: this.estudiante.value.Run,
          situacionActual: this.estudiante.value.SituacionActual,
          telefono: this.estudiante.value.Telefono,
          practicaAbilitada: true,
          practicaActual: 1,
          etapaActual: 'ninguna',
          estadoEtapaActual: 'ninguno',
          documentos: [],
        };
      console.log(nuevoUsuario);
      this.gestionEstudiante.crearNuevoEstudiante(nuevoUsuario, this.estudiante.value.Contrasenna1);
      this.route.navigate(['/crear-cuenta']);
    }
    else
    {
      this.openDialog();
    }
  }

  verificarCarreraRepetida(carreraObtenida:Carrera){
    if(!this.carreras.includes(carreraObtenida.nombreCarrera!)){
      this.carreras.push(carreraObtenida.nombreCarrera!);
      console.log('carrera agregada:',carreraObtenida.nombreCarrera);
    }else{
      console.log('carrera repetida');
    }
  }
}

