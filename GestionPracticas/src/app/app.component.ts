import { Component } from '@angular/core';
declare let alertify: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){}

  mostrar_alerta_success()
  {
    alertify.success("Todo bien, todo correcto");
  }

  mostrar_alerta_error()
  {
    alertify.error("Lo siento man, error");
  }

}
