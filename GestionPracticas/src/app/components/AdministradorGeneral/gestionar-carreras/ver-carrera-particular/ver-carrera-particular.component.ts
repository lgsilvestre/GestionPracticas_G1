import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-ver-carrera-particular',
  templateUrl: './ver-carrera-particular.component.html',
  styleUrls: ['./ver-carrera-particular.component.css', '../../../../app.component.css']
})

export class VerCarreraParticularComponent 
{

  numeroPracticas = new FormControl('1');

  planesVigentes: number[]= [11,16]

  Encargadodeshabilitado:boolean= true;
  CorreoEncargadoDeshabilitado: boolean = true;
  cantidadPracticasdeshabilitado:boolean= true;

  constructor(public dialog: MatDialog) 
  {}

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