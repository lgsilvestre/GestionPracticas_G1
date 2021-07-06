import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { GestionCarreraService } from '../../Servicios/adminGenerla/gestion-carrera.service';
import { Carrera } from '../../../model/carreras.model';
import { Router } from '@angular/router';
import { PlanEstudios } from '../../../model/planEstudios.model';

@Component({
  selector: 'app-crear-carrera',
  templateUrl: './crear-carrera.component.html',
  styleUrls: ['./crear-carrera.component.css', '../../../app.component.css']
})
export class CrearCarreraComponent implements OnInit {

  formularioCarrera:FormGroup;
  isLinear = false;
  formularioPlan:FormGroup;
  plan:PlanEstudios[] = [];
  opcionSelecionada:string = '';

  constructor(private _formBuilder: FormBuilder, private _gestionCarrera: GestionCarreraService, private route: Router)
  {
    this.formularioCarrera= new FormGroup({
      nombreCarrera: new FormControl('', [Validators.required, Validators.pattern(('[a-zA-ZÀ-ÿ]*'))]),
      nombreEncargado: new FormControl('', [Validators.required, Validators.pattern(('[a-zA-ZÀ-ÿ]*'))]),
      correoEncargado: new FormControl('', [Validators.required, Validators.email]),
      telefonoEncargado: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(12), Validators.pattern('[+0-9]*')]),
    });

    this.formularioPlan = new FormGroup({
      nombrePlan: new FormControl('',[Validators.required]),
      cantidadPracticas: new FormControl('',[Validators.required]),
      requisitos: new FormControl('',[Validators.required]),
    });

  }

  ngOnInit() {

  }

  crearCarrera()
  {
    const carreraEnCreacion: Carrera=
    {
      nombreCarrera: this.formularioCarrera.value.nombreCarrera,
      nombreEncargadoCarrera: this.formularioCarrera.value.nombreEncargado,
      correoEncargadoCarrera: this.formularioCarrera.value.correoEncargado,
      telefonoEncargadoCarrera: this.formularioCarrera.value.telefonoEncargado,
    }

    this._gestionCarrera.addCarreras(carreraEnCreacion);


    this.route.navigate(['/gestionar-carreras']);
  }

  volver()
  {
      this.route.navigate(['/gestionar-carreras']);
  }

  agregarPlan(){
    const planEnCreacion:PlanEstudios = {
      nombre: this.formularioPlan.value.nombrePlan,
      numeroPracticas: this.opcionSelecionada,
      requisitos: this.formularioPlan.value.requisitos,
    }
    console.log('Plan creado exitosamente:' + planEnCreacion.numeroPracticas);
    this.plan.push(planEnCreacion);
    console.log(this.plan.length);
  }

}
