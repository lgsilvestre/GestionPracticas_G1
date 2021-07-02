import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { VerCuentasComponent } from './ver-cuentas/ver-cuentas.component';
import { CrearCuentasSaComponent } from './crear-cuentas-sa/crear-cuentas-sa.component';
import {ReactiveFormsModule} from '@angular/forms';
import { DialogElementsExampleDialogComponent } from './dialog/dialog-elements-example-dialog/dialog-elements-example-dialog.component';
import {AutenticacionService} from '../Servicios/autenticacion.service';


@NgModule({
    declarations: [
        // Aca van los modulos que se crean
      VerCuentasComponent,
      CrearCuentasSaComponent,
      DialogElementsExampleDialogComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    exports: [
        // Aca van los modulos que se crean
    ],
  providers: [
    AutenticacionService,
  ]
})
export class SuperAdminModule { }
