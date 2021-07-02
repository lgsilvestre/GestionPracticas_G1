import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css', '../../../app.component.css']
})
export class CrearCuentaComponent implements OnInit
{
  constructor( private route: Router) {}
  ngOnInit(): void{}
  goToEstudiante(): void
  {
    this.route.navigate(['/crear-cuenta/estudiante']);
  }
  goToEncargado(): void
  {
    this.route.navigate(['/crear-cuenta/encargado-carrera']);
  }
  goToAdminGeneral(): void
  {
    this.route.navigate(['/crear-cuenta/admin-general']);
  }
}
