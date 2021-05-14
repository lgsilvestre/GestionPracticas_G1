import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-crear-cuenta-encargado',
    templateUrl: './crear-cuenta-encargado.component.html',
    styleUrls: ['./crear-cuenta-encargado.component.css', '../../../app.component.css']
})
export class crearCuentaEncargadoComponent implements OnInit
{

    primeraEtapa: FormGroup;


    constructor(private _formBuilder: FormBuilder)
    {
        this.primeraEtapa = this._formBuilder.group({
            Nombres: new FormControl('', Validators.required),
            Apellidos: new FormControl('', Validators.required),
            Carrera: new FormControl('', Validators.required),
            NumeroMatricula: new FormControl('', Validators.required),
            Run: new FormControl('', Validators.required),
            NumeroContacto: new FormControl('', Validators.required),
            CorreoElectronico: new FormControl('', Validators.required),
            rol: [{value:'Encargado de carrera', disabled: true}],
            ContactoEmergencia: new FormControl('', Validators.required),
            TelefonoEmergencia: new FormControl('', Validators.required)
        });

        

    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
    

}