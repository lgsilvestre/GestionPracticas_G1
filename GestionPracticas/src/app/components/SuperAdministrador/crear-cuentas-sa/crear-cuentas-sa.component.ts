/* tslint:disable:no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncargadoCarrera } from '../../../model/encargadoCarrera.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogElementsExampleDialogComponent } from '../dialog/dialog-elements-example-dialog/dialog-elements-example-dialog.component';
import { GestionEncargadosService } from '../../Servicios/encargado/gestion-encargados.service';

@Component({
	selector: 'app-crear-cuentas-sa',
	templateUrl: './crear-cuentas-sa.component.html',
	styleUrls: ['./crear-cuentas-sa.component.css', '../../../app.component.css']
})
export class CrearCuentasSaComponent implements OnInit {
  nuevaCuenta: FormGroup;
  carreras: string[] = ['Ingeniería Civil en Computación', 'Ingeniería Civil Eléctrica', 'Ingeniería Civil Mecatrónica'];
  roles: string[] = ['Encargado de Carrera', 'Estudiante', 'Administrador General'];
  carreraActual: string = 'None';
  rolActual: string = 'None';
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private gestionEncargados: GestionEncargadosService)
  {
    this.nuevaCuenta = this.formBuilder.
    group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Run: ['', Validators.required],
      Carrera: ['', Validators.required],
      CorreInstitucional: ['', Validators.required],
      CorreoPersonal: ['', Validators.required],
      Contrasenna1: ['', Validators.required],
      Contrasenna2: ['', Validators.required],
      Rol: ['', Validators.required],
    });
  }
  ngOnInit(): void
  {}
  onChangeCarrera(event: any): void
  {
    this.carreraActual = event;
  }
  onChangeRol(event: any): void
  {
    this.rolActual = event;
  }
  private openDialog(): void
  {
    this.dialog.open(DialogElementsExampleDialogComponent);
  }
  crear(): void
  {
    console.log(this.rolActual + ' ' + this.carreraActual);
    let rolFinal: string = 'None';
    switch (this.rolActual)
    {
      case 'Estudiante':
        rolFinal = 'estudiante';
        break;
      case 'Administrador General':
        rolFinal = 'administradorGeneral';
        break;
      case 'Encargado de Carrera':
        rolFinal = 'encargadoCarrera';
        break;
      default:
        rolFinal = 'error';
    }
    if (this.nuevaCuenta.value.Contrasenna1 === this.nuevaCuenta.value.Contrasenna2)
    {
      const nuevoUsuario: EncargadoCarrera =
        {
          nombres: this.nuevaCuenta.value.Nombres,
          apellidos: this.nuevaCuenta.value.Apellidos,
          run: this.nuevaCuenta.value.Run,
          carrera: this.nuevaCuenta.value.Carrera,
          correoInstitucional: this.nuevaCuenta.value.CorreInstitucional,
          correoPersonal: this.nuevaCuenta.value.CorreoPersonal,
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
