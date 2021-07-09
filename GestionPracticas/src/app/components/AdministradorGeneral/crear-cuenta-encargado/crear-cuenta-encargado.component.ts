/* tslint:disable:no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import {EncargadoCarrera} from '../../../model/encargadoCarrera.model';
import {GestionEncargadosService} from '../../Servicios/encargado/gestion-encargados.service';
import {DialogElementsExampleDialogComponent} from '../../SuperAdministrador/dialog/dialog-elements-example-dialog/dialog-elements-example-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { GestionCarreraService } from '../../Servicios/adminGenerla/gestion-carrera.service';
import { Carrera } from 'src/app/model/carreras.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta-encargado',
  templateUrl: './crear-cuenta-encargado.component.html',
  styleUrls: ['./crear-cuenta-encargado.component.css', '../../../app.component.css']
})

export class CrearCuentaEncargadoComponent implements OnInit {
  nuevaCuenta: FormGroup;
  carreraActual: string = 'None';
  carreras: string[] = ['Ingeniería Civil en Computación', 'Ingeniería Civil Eléctrica', 'Ingeniería Civil Mecatrónica'];
  constructor(private _formBuilder: FormBuilder, private gestionEncargados: GestionEncargadosService, public dialog: MatDialog,
    private _gestionCarrera:GestionCarreraService,private route: Router) {
    this.nuevaCuenta = this._formBuilder.group({
      Nombres: new FormControl('', [Validators.required]),
      Apellidos: new FormControl('', [Validators.required]),
      Run: new FormControl('', [Validators.required]),
      Carrera: new FormControl('', Validators.required),
      CorreoInstitucional: new FormControl('', [Validators.required]),
      CorreoElectronico: new FormControl('', Validators.email),
      Contrasenna1: ['', Validators.required],
      Contrasenna2: ['', Validators.required],
      rol: [{ value: 'Encargado de carrera', disabled: true }],
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
