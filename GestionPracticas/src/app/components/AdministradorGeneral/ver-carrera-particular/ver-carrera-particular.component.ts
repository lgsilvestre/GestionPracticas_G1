import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, ɵangular_packages_forms_forms_g, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Carrera } from 'src/app/model/carreras.model';
import { GestionCarreraService } from '../../Servicios/adminGenerla/gestion-carrera.service';
import { ActivatedRoute, Router } from '@angular/router';
import { zipAll } from 'rxjs/operators';
import { PlanEstudios } from '../../../model/planEstudios.model';
import { identifierModuleUrl } from '@angular/compiler';



@Component({
  selector: 'app-ver-carrera-particular',
  templateUrl: './ver-carrera-particular.component.html',
  styleUrls: ['./ver-carrera-particular.component.css', '../../../app.component.css']
})

export class VerCarreraParticularComponent implements OnInit {

  formularioCarrera: FormGroup;
  formularioPlan: FormGroup;
  plan: PlanEstudios[] = [];
  carreraCreada: Carrera = {};
  opcionSelecionada:string = '';

  constructor(public dialog: MatDialog, private _gestionCarrera: GestionCarreraService, private _route: ActivatedRoute, private _formBuilder: FormBuilder,
    private route: Router) {
    this.formularioCarrera = new FormGroup({
      nombreCarrera: new FormControl('', [Validators.required, Validators.pattern(('[a-zA-ZÀ-ÿ]*'))]),
      nombreEncargado: new FormControl('', [Validators.required, Validators.pattern(('[a-zA-ZÀ-ÿ]*'))]),
      correoEncargado: new FormControl('', [Validators.required, Validators.email]),
      telefonoEncargado: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(12), Validators.pattern('[+0-9]*')]),
    });

    this.formularioPlan = new FormGroup({
      nombrePlan: new FormControl('', [Validators.required]),
      cantidadPracticas: new FormControl('', [Validators.required]),
      requisitos: new FormControl('', [Validators.required]),
    });

  }

  ngOnInit() {
    this._route.params.subscribe(parametro => {
      this._gestionCarrera.getCarrera(parametro['id']).subscribe(carrera => {
        this.carreraCreada = carrera!;
        console.log(this.carreraCreada);
        this.formularioCarrera.patchValue({
          nombreCarrera: this.carreraCreada.nombreCarrera,
          nombreEncargado: this.carreraCreada.nombreEncargadoCarrera,
          CorreoEncargado: this.carreraCreada.correoEncargadoCarrera,
          telefonoEncargado: this.carreraCreada.telefonoEncargadoCarrera,
        })
      })
    });

    this._gestionCarrera.getPlanEstudio(this.carreraCreada.id!).valueChanges().subscribe(datos => {
      datos.forEach(planes => {
        this.plan.push(planes);
      })
    })
  }

  updateFormulario() {
    const actualizacion = {
      ...this.carreraCreada,
      nombreCarrera: this.formularioPlan.value.nombreCarrera,
      nombreEncargadoCarrera: this.formularioCarrera.value.nombreEncargado,
      correoEncargadoCarrera: this.formularioCarrera.value.CorreoEncargado,
      telefonoEncargado: this.formularioCarrera.value.telefonoEncargado,
    }

    this._gestionCarrera.guardarCarrera(actualizacion, this.carreraCreada.id!);
  }

  openDialog() {
    const dialogoEliminar = this.dialog.open(editarPlanes)

    dialogoEliminar.afterClosed().subscribe(resultado => {
      console.log("Esta cosa funcionó")
    })
  }

  openDialogAgregar() {
    const dialogoEliminar = this.dialog.open(AgregarPlan)

    dialogoEliminar.afterClosed().subscribe(resultado => {
      console.log("Esta cosa funcionó")
    })
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

  volver() {
    this.route.navigate(['/gestionar-carreras']);
  }

  eliminarPlan(item:any){
    this.plan = this.plan.filter(planes => planes.nombre != item.nombre)
    this._gestionCarrera.eliminarPlanEstudio(item.nombre);
  }

}

@Component({
  selector: 'editar-planes',
  templateUrl: './editarPlanes.component.html',
  styleUrls: ['../../../app.component.css']
})
export class editarPlanes { }

@Component({
  selector: 'agregaar-plan',
  templateUrl: './AgregarPlan.component.html',
  styleUrls: ['../../../app.component.css']
})
export class AgregarPlan { }
