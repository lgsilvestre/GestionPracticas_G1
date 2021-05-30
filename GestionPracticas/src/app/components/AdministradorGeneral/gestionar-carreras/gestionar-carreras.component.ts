import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionar-carreras',
  templateUrl: './gestionar-carreras.component.html',
  styleUrls: ['./gestionar-carreras.component.css', '../../../app.component.css']
})
export class GestionarCarrerasComponent {

  constructor(public dialog: MatDialog, private route: Router) { }

  openDialog()
  {
    const dialogoEliminar= this.dialog.open(preguntaEliminar)

    dialogoEliminar.afterClosed().subscribe(resultado =>
      {
        console.log("Esta cosa funcionó")
      })
  }

  goToCarrera(): void {
    this.route.navigate(['/gestionar-carreras/ver-carrera-particular']);
  }

}

@Component({
  selector: 'pregunta-eliminar',
  templateUrl: './preguntaEliminar.component.html',
  styleUrls: ['./gestionar-carreras.component.css', '../../../app.component.css']
})
export class preguntaEliminar { }