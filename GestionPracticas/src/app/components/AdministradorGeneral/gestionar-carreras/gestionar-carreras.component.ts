import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gestionar-carreras',
  templateUrl: './gestionar-carreras.component.html',
  styleUrls: ['./gestionar-carreras.component.css', '../../../app.component.css']
})
export class GestionarCarrerasComponent {

constructor(public dialog: MatDialog ) { }

  openDialog()
  {
    const dialogoEliminar= this.dialog.open(preguntaEliminar)

    dialogoEliminar.afterClosed().subscribe(resultado =>
      {
        console.log("Esta cosa funcionó")
      })
  }

}

@Component({
  selector: 'pregunta-eliminar',
  templateUrl: './preguntaEliminar.component.html',
  styleUrls: ['./gestionar-carreras.component.css', '../../../app.component.css']
})
export class preguntaEliminar { }