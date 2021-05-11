import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/material/material.module";
import { VerCuentasComponent } from './ver-cuentas/ver-cuentas.component';
import { CrearCuentasSaComponent } from './crear-cuentas-sa/crear-cuentas-sa.component';


@NgModule({
    declarations: [
        // Aca van los modulos que se crean
    VerCuentasComponent,
        CrearCuentasSaComponent],
    imports: [
        CommonModule,
        MaterialModule,
    ],
    exports: [
        // Aca van los modulos que se crean
    ]
})
export class SuperAdminModule { }
