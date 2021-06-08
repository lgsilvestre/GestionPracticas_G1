import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, ɵangular_packages_forms_forms_g, FormGroup, Validators } from '@angular/forms';
import { Carrera } from 'src/app/model/carreras.model';
import { GestionCarreraService } from '../../../Servicios/adminGenerla/gestion-carrera.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ver-carrera-particular',
  templateUrl: './ver-carrera-particular.component.html',
  styleUrls: ['./ver-carrera-particular.component.css', '../gestionar-carreras.component.css', '../../../../app.component.css']
})

export class VerCarreraParticularComponent implements OnInit
{

  numeroPracticas = new FormControl('1');
  formulario1: FormGroup;
  carrera: Carrera= {};

  planesVigentes: number[]= [11,16]

  Encargadodeshabilitado:boolean= true;
  CorreoEncargadoDeshabilitado: boolean = true;
  cantidadPracticasdeshabilitado:boolean= true;

  constructor(public dialog: MatDialog, private _gestionCarrera: GestionCarreraService, private _route: ActivatedRoute) 
  {
      this.formulario1= new FormGroup({
          nombreEncargado: new FormControl('', Validators.required),
          CorreoEncargado: new FormControl('', Validators.required),
      });
  }

  ngOnInit()
  {
      this._route.params.subscribe(parametro =>{
          this._gestionCarrera.getCarrera(parametro['id']).subscribe(carrera =>{
              this.carrera= carrera!;
              this.formulario1.patchValue({
                  nombreEncargado: this.carrera.nombreEncargadoCarrera,
                  CorreoEncargado: this.carrera.correoEncargadoCarrera
              })
          })
      })
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

  habilitarDatosEncargado() 
  {
    this.CorreoEncargadoDeshabilitado = false;
    this.Encargadodeshabilitado = false;
  }
  deshabilitarDatosEncargado() 
  {
    this.CorreoEncargadoDeshabilitado = true;
    this.Encargadodeshabilitado = true;
  }

  habilitarSelectPracticas()
  {
    this.cantidadPracticasdeshabilitado=false;
  }

  deshabilitarSelectPracticas() 
  {
    this.cantidadPracticasdeshabilitado = true;
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