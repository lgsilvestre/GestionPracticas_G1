import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  tipoUsuario:string;

  constructor() {
    this.tipoUsuario = "";
  }

  adminGeneral(){
    this.tipoUsuario = "administradorGeneral";
  }

  estudiante(){
    this.tipoUsuario = "estudiante";
  }

}
