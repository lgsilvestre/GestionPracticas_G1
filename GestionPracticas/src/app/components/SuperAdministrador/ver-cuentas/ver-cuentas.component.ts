import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";



export interface PeriodicElement {
  nombre_encargado: string;
  carrera: string;
  rol: string;
  estado_cuenta: string;
  editar_estado: string;
  cambiar_contrasena: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    nombre_encargado: 'Mariana', carrera: 'Ing. civil Electrica',
    rol: 'Alumno/a', estado_cuenta: 'Habilitada', editar_estado: 'Deshabilitar', cambiar_contrasena: 'cambiar contraseña'
  },
  {
    nombre_encargado: 'Luis', carrera: 'Ing. civil Industrial',
    rol: 'Alumno/a', estado_cuenta: 'Deshabilitada', editar_estado: 'Habilitar', cambiar_contrasena: 'cambiar contraseña'
  },
  {
    nombre_encargado: 'Rodrigo', carrera: 'Ing. civil Computación',
    rol: 'Encargado/a de carrera', estado_cuenta: 'Habilitada', editar_estado: 'Deshabilitar', cambiar_contrasena: 'cambiar contraseña'
  },
  {
    nombre_encargado: 'Mariana', carrera: '-',
    rol: 'Administrador/a general', estado_cuenta: 'Habilitada', editar_estado: 'Deshabilitar', cambiar_contrasena: 'cambiar contraseña'
  }
];


@Component({
  selector: 'app-ver-cuentas',
  templateUrl: './ver-cuentas.component.html',
  styleUrls: ['./ver-cuentas.component.css', '../../../app.component.css']
})


export class VerCuentasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  

  displayedColumns: string[] = ['nombre_encargado', 'carrera', 'rol', 'estado_cuenta', 'editar_estado', 'cambiar_contrasena'];
  dataSource = ELEMENT_DATA;
}
