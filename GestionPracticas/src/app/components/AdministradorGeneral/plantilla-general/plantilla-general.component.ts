import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-plantilla-general',
  templateUrl: './plantilla-general.component.html',
  styleUrls: ['./plantilla-general.component.css']
})
export class PlantillaGeneralComponent implements OnInit {

  primeraEtapa: FormGroup;
  segundaEtapa: FormGroup;
  terseraEtapa: FormGroup;
  cuartaEtapa: FormGroup;

  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder) {
    this.primeraEtapa = this._formBuilder.group({
      Nombres: ['', Validators.required],
      Apellidos : [ '', Validators.required],
      Carrera : [ '', Validators.required],
      NumeroMatricula : [ '', Validators.required],
      Run : [ '', Validators.required],
      NumeroContacto : [ '', Validators.required],
      CorreoElectronico : [ '', Validators.required],
      ContactoEmergencia : [ '', Validators.required],
      TelefonoEmergencia : [ '', Validators.required],
    });
    this.segundaEtapa = this._formBuilder.group({
      Nombre : ['', Validators.required],
      Rut : ['', Validators.required],
      NumeroTelefono : ['', Validators.required],
      CorreoElectronico : ['', Validators.required],
      Direccion : ['', Validators.required],
    });
    this.terseraEtapa = this._formBuilder.group({
      terserCtrl: ['', Validators.required]
    });
    this.cuartaEtapa = this._formBuilder.group({
      cuartoCtrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
   public getAlumno(): void
   {
     console.log(this.primeraEtapa.get('Apellidos')?.value);
   }

}
