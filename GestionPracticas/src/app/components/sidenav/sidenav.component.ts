import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit
{
  soyEstudiante:boolean = false;
  soyAdminGeneral:boolean = false;

  constructor(){}

  ngOnInit(): void {}

  cambiarAdmin(){
    this.soyAdminGeneral = true;
    this.soyEstudiante = false;
  }

  cambiarEstudiante(){
    this.soyEstudiante = true;
    this.soyAdminGeneral = false;
  }

}
