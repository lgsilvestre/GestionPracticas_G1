import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Carrera } from 'src/app/model/carreras.model';
import { GestionCarreraService } from '../../Servicios/adminGenerla/gestion-carrera.service';

@Component({
  selector: 'app-gestionar-carreras',
  templateUrl: './gestionar-carreras.component.html',
  styleUrls: ['./gestionar-carreras.component.css', '../../../app.component.css']
})
export class GestionarCarrerasComponent implements OnInit
{
    carreras: Carrera[]= [];

    constructor(public dialog: MatDialog, private route: Router, private _gestionCarrera: GestionCarreraService) 
    { }


  ngOnInit() 
  { this._gestionCarrera.getCarreras().subscribe( carreras =>
    {
        this.carreras= carreras;
    }
  )}

  openDialog()
  {
    const dialogoEliminar= this.dialog.open(preguntaEliminar)

    dialogoEliminar.afterClosed().subscribe(resultado =>
      {
        console.log("Esta cosa funcionó")
      })
  }

  goToCarrera(carrera: Carrera): void 
  {
    this.route.navigate([`/gestionar-carreras/ver-carrera-particular/${carrera.id}`]);
  }

  goToCrearCarrera(): void 
  {
    this.route.navigate(['/gestionar-carreras/crear-carrera']);
  }

  eliminarCarrera(id: string)
  {
      this._gestionCarrera.eliminarCarrera(id)
  }

}

@Component({
  selector: 'pregunta-eliminar',
  templateUrl: './preguntaEliminar.component.html',
  styleUrls: ['./gestionar-carreras.component.css', '../../../app.component.css']
})
export class preguntaEliminar { }