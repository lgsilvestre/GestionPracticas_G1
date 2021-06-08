import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GestionCarreraService } from '../../../Servicios/adminGenerla/gestion-carrera.service';
import { Carrera } from '../../../../model/carreras.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-carrera',
  templateUrl: './crear-carrera.component.html',
  styleUrls: ['./crear-carrera.component.css', '../gestionar-carreras.component.css', '../../../../app.component.css']
})
export class CrearCarreraComponent implements OnInit {

  formularioCarrera:FormGroup;

  constructor(private _formBuilder: FormBuilder, private _gestionCarrera: GestionCarreraService, private route: Router) 
  {
    this.formularioCarrera= new FormGroup({
      nombreCarrera: new FormControl('', Validators.required),
      planEstudio: new FormControl('', Validators.required),
      cantidadPracticas: new FormControl('', Validators.required),
      nombreEncargado: new FormControl('', Validators.required),
      correoEncargado: new FormControl('', Validators.required),
      telefonoEncargado: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  crearCarrera()
  {
    const carreraEnCreacion: Carrera=
    {
      nombreCarrera: this.formularioCarrera.value.nombreCarrera,
      nombreEncargadoCarrera: this.formularioCarrera.value.nombreEncargado,
      correoEncargadoCarrera: this.formularioCarrera.value.correoEncargado,
      telefonoEncargadoCarrera: this.formularioCarrera.value.telefonoEncargado,
      planEstudio: this.formularioCarrera.value.planEstudio,
    }

    this._gestionCarrera.addCarreras(carreraEnCreacion);


    this.route.navigate(['/gestionar-carreras']);
  }

  volver()
  {
      this.route.navigate(['/gestionar-carreras']);
  }
}
