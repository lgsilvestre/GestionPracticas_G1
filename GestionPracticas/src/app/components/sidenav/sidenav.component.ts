import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit
{
  user:any = JSON.parse(localStorage.getItem('user') || '{}');
  soyEstudiante:boolean = false;
  soyAdminGeneral:boolean = false;
  constructor(){
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    if(this.user.rol == "estudiante"){
      this.soyEstudiante = true;
      this.soyAdminGeneral = false;
    }
    if(this.user.rol == "administradorGeneral"){
      this.soyAdminGeneral = true;
      this.soyEstudiante = false;
    }

  }

  cambiarAdmin(){
    this.soyAdminGeneral = true;
    this.soyEstudiante = false;
  }

  cambiarEstudiante(){
    this.soyEstudiante = true;
    this.soyAdminGeneral = false;
  }

  deslogear(){
    this.user = '';
    localStorage.setItem('user',JSON.stringify(this.user));
  }

}
