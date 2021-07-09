/* tslint:disable:no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import {DialogElementsExampleDialogComponent} from '../../SuperAdministrador/dialog/dialog-elements-example-dialog/dialog-elements-example-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {GestionAdminGeneralService} from '../../Servicios/adminGenerla/gestion-admin-general.service';
import {AdministradorGeneral} from '../../../model/administradorGeneral.model';


declare let alertify: any;

@Component({
  selector: 'app-crear-cuenta-administrador-general',
  templateUrl: './crear-cuenta-administrador-general.component.html',
  styleUrls: ['./crear-cuenta-administrador-general.component.css', '../../../app.component.css']
})

export class CrearCuentaAdministradorGeneralComponent implements OnInit {
  nuevoAdminGenerl: FormGroup;
  constructor(private _formBuilder: FormBuilder, private gestionAdminGeneral: GestionAdminGeneralService, public dialog: MatDialog) {
    this.nuevoAdminGenerl = this._formBuilder.group({
      // \u00f1\u00d1 Permite indicar que la letra ñ/Ñ se permite como parámetro.
      Nombres: new FormControl('', [Validators.required, Validators.pattern(('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*'))]),
      Apellidos: new FormControl('', [Validators.required, Validators.pattern(('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*'))]),
      Run: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern(/^[0-9]+\-(([0-9kK]{1,1}))$/)]),
      CorreoInstitucional: new FormControl('', [Validators.required, Validators.pattern((/^[a-z][a-z0-9]*@utalca.cl$/))]),
      CorreoElectronico: new FormControl('', Validators.email),
      rol: [{ value: 'Administrador general', disabled: true }],
      Telefono: new FormControl('', [Validators.required, Validators.pattern(/^\+569(([0-9]){8,8}$)/)]),
      Contrasenna1: ['', Validators.required],
      Contrasenna2: ['', Validators.required],
    }, { validators: this.revisarPasswords }
    );
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

  revisarPasswords(group: FormGroup) 
  { // here we have the 'passwords' group
    const password = group.get('Contrasenna1')!.value;
    const confirmPassword = group.get('Contrasenna2')!.value;

    console.log(password);
    console.log(confirmPassword)
    

    return password === confirmPassword ? null : { notSame: true }     
  }
}
