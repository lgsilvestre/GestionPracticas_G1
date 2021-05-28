/* tslint:disable:no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import {DialogElementsExampleDialogComponent} from '../../SuperAdministrador/dialog/dialog-elements-example-dialog/dialog-elements-example-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {GestionAdminGeneralService} from '../../Servicios/adminGenerla/gestion-admin-general.service';
import {AdministradorGeneral} from '../../../model/administradorGeneral.model';


@Component({
  selector: 'app-crear-cuenta-administrador-general',
  templateUrl: './crear-cuenta-administrador-general.component.html',
  styleUrls: ['./crear-cuenta-administrador-general.component.css', '../../../app.component.css']
})

export class CrearCuentaAdministradorGeneralComponent implements OnInit {
  nuevoAdminGenerl: FormGroup;
  constructor(private _formBuilder: FormBuilder, private gestionAdminGeneral: GestionAdminGeneralService, public dialog: MatDialog) {
    this.nuevoAdminGenerl = this._formBuilder.group({
      Nombres: new FormControl('', Validators.required),
      Apellidos: new FormControl('', Validators.required),
      Run: new FormControl('', Validators.required),
      CorreoInstitucional: new FormControl('', Validators.required),
      CorreoElectronico: new FormControl(''),
      rol: [{ value: 'Administrador general', disabled: true }],
      Telefono: new FormControl('', Validators.required),
      Contrasenna1: ['', Validators.required],
      Contrasenna2: ['', Validators.required],
    });
  }
  ngOnInit(): void
  {

  }
  private openDialog(): void
  {
    this.dialog.open(DialogElementsExampleDialogComponent);
  }
  crear(): void
  {
    const rolFinal: string = 'administradorGeneral';
    if (this.nuevoAdminGenerl.value.Contrasenna1 === this.nuevoAdminGenerl.value.Contrasenna2)
    {
      const nuevoUsuario: AdministradorGeneral =
        {
          nombres: this.nuevoAdminGenerl.value.Nombres,
          apellidos: this.nuevoAdminGenerl.value.Apellidos,
          run: this.nuevoAdminGenerl.value.Run,
          telefono: this.nuevoAdminGenerl.value.Telefono,
          correoInstitucional: this.nuevoAdminGenerl.value.CorreoInstitucional,
          correoPersonal: this.nuevoAdminGenerl.value.CorreoElectronico,
          rol : rolFinal
        };
      console.log(nuevoUsuario);
      this.gestionAdminGeneral.gestionAdminGeneral(nuevoUsuario, this.nuevoAdminGenerl.value.Contrasenna1);
    }
    else
    {
      this.openDialog();
    }
  }
}
