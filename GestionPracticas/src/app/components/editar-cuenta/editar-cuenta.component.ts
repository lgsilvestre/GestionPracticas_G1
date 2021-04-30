import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";


@Component({
    selector: "app-editar-cuenta",
    templateUrl: "./editar-cuenta.component.html",
    styleUrls: ['./editar-cuenta.component.css']

})
export class EditarCuentaComponent
{
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
}