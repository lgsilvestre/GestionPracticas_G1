import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-solicitud-practica',
  templateUrl: './dialogo-solicitud-practica.component.html',
  styleUrls: ['./dialogo-solicitud-practica.component.css']
})
export class DialogoSolicitudPracticaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
