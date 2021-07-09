import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, ɵangular_packages_forms_forms_g, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Carrera } from 'src/app/model/carreras.model';
import { GestionCarreraService } from '../../../Servicios/adminGenerla/gestion-carrera.service';
import { ActivatedRoute, Router } from '@angular/router';
import { zipAll } from 'rxjs/operators';
import { PlanEstudios } from '../../../../model/planEstudios.model';
import { identifierModuleUrl } from '@angular/compiler';



@Component({
  selector: 'app-ver-carrera-particular',
  templateUrl: './ver-carrera-particular.component.html',
  styleUrls: ['./ver-carrera-particular.component.css', '../gestionar-carreras.component.css', '../../../../app.component.css']
})

export class VerCarreraParticularComponent implements OnInit
{

  formulario1: FormGroup;
  formularioPlanCarrera: FormGroup;
  carrera: Carrera = {};

  constructor(public dialog: MatDialog, private _gestionCarrera: GestionCarreraService, private _route: ActivatedRoute,private _formBuilder: FormBuilder,
    private route: Router)
  {
      this.formulario1= new FormGroup({
          nombreEncargado: new FormControl('', [Validators.required, Validators.pattern(('[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*'))]),
          CorreoEncargado: new FormControl('', [Validators.required, Validators.pattern((/^[a-z][a-z0-9]*@utalca.cl$/))]),
      });

      this.formularioPlanCarrera = new FormGroup({
        nombrePlan: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]+/)]),
        cantidadPracticas: new FormControl('',[Validators.required, Validators.pattern(/^[1-9]{1,1}$/)]),
        requisitos: new FormControl('',[Validators.required, Validators.pattern(/^([A-ZÁÉÍÓÚ\u00d1 ]|\- [A-ZÁÉÍÓÚ\u00d1])[a-zA-ZáÁéÉíÍóÓúÚü0-9\u00f1\u00d1\n\,\.\- ]+\.$/)]),
      });

  }

  ngOnInit()
  {
      this._route.params.subscribe(parametro =>{
          this._gestionCarrera.getCarrera(parametro['id']).subscribe(carrera =>{
              this.carrera= carrera!;
              console.log(this.carrera);
              this.formulario1.patchValue({
                  nombreEncargado: this.carrera.nombreEncargadoCarrera,
                  CorreoEncargado: this.carrera.correoEncargadoCarrera,
              })
          })
      });

      this._gestionCarrera.getPlanEstudio(this.carrera.id!);
  }

  updateFormulario()
  {
      const actualizacion= {
          ...this.carrera,
          nombreEncargadoCarrera: this.formulario1.value.nombreEncargado,
          correoEncargadoCarrera: this.formulario1.value.CorreoEncargado,
      }

      this._gestionCarrera.guardarCarrera(actualizacion,this.carrera.id!);
  }

  openDialog()
  {
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


  agregarPlanEstudio(){
    const planEnCreacion: PlanEstudios =
    {
      id: this.carrera.id ,
      nombre: this.formularioPlanCarrera.value.nombrePlan,
      numeroPracticas: this.formularioPlanCarrera.value.cantidadPracticas,
      requisitos: this.formularioPlanCarrera.value.requisitos,
    }

    this._gestionCarrera.addPlanEstudio(planEnCreacion);

    this._gestionCarrera.getPlanEstudio(this.carrera.id!).valueChanges().subscribe( datos=>
        {
            console.log(datos);
        });

  }

  volver()
  {
      this.route.navigate(['/gestionar-carreras']);
  }

}

@Component({
  selector: 'editar-planes',
  templateUrl: './editarPlanes.component.html',
  styleUrls: ['../gestionar-carreras.component.css', '../../../../app.component.css']
})
export class editarPlanes { }

@Component({
  selector: 'agregaar-plan',
  templateUrl: './AgregarPlan.component.html',
  styleUrls: ['../gestionar-carreras.component.css', '../../../../app.component.css']
})
export class AgregarPlan { }
