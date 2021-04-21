import { Component } from '@angular/core';
declare let alertify: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  tipoUsuario : string;

  constructor()
  {
    sessionStorage.setItem('mostrarLogin', 'true'); //por default lo primero que debo mostrar es el login (evitará problemas con el sideNav)
    this.tipoUsuario  = "estudiante";
  }

  mostrarLogin(): boolean
  {
    return sessionStorage.getItem('mostrarLogin') == 'true';
  }


}
