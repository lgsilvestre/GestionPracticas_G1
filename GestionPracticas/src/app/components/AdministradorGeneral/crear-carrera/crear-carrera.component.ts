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
  formularioPlan:FormGroup;
  plan:PlanEstudios[] = [];
  carreraCreada:Carrera = {};
  opcionSelecionada:string = '';
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private _gestionCarrera: GestionCarreraService, private route: Router)
  {
    this.formularioCarrera= new FormGroup({
      nombreCarrera: new FormControl('', [Validators.required, Validators.pattern((/^(Ingeniería civil )[a-zA-ZÀ-ÿ\u00f1\u00d1]+/))]),
      nombreEncargado: new FormControl('', [Validators.required, Validators.pattern(/^[A-ZÀ-Ý\u00d1][a-zA-ZÀ-ÿ\u00f1\u00d1]+/)]),
      correoEncargado: new FormControl('', [Validators.required, Validators.pattern((/^[a-z][a-z0-9]*@utalca.cl$/))]),
      telefonoEncargado: new FormControl('', [Validators.required, Validators.pattern(/^\+569(([0-9]){8,8}$)/)]),
    });

    this.formularioPlan = new FormGroup({
      nombrePlan: new FormControl('',[Validators.required]),
      cantidadPracticas: new FormControl('',[Validators.required]),
      requisitos: new FormControl('',[Validators.required]),
    });

  }

  ngOnInit() {

  }

  extraerIDCarrera(){
    this._gestionCarrera.getCarreras().forEach(datos => {
      datos.forEach(carrerasObtenidas => {
        if(carrerasObtenidas.nombreCarrera == this.carreraCreada.nombreCarrera){
          this.carreraCreada.id = carrerasObtenidas.id;
        }
      })
    })
  }

  crearCarrera()
  {
    this.plan.forEach(elemento => {
      elemento.id = this.carreraCreada.id;
      this._gestionCarrera.addPlanEstudio(elemento);
    })
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
  }

  guardarDatosCarrera(){
    const carreraEnCreacion: Carrera=
    {
      nombreCarrera: this.formularioCarrera.value.nombreCarrera,
      nombreEncargadoCarrera: this.formularioCarrera.value.nombreEncargado,
      correoEncargadoCarrera: this.formularioCarrera.value.correoEncargado,
      telefonoEncargadoCarrera: this.formularioCarrera.value.telefonoEncargado,
    }

    this.carreraCreada = carreraEnCreacion;
    this._gestionCarrera.addCarreras(carreraEnCreacion);
    this.extraerIDCarrera();
  }

}
