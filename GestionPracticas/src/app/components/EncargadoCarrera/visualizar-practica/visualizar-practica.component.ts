import { Component, OnInit } from "@angular/core";

export interface ITablaVisualizarPractica {
    rut: string;
    position: number;
    nombre: string;
    empresa: string;
    ver: string;
}


@Component({
    selector: 'app-visualizar-practicas',
    templateUrl: './visualizar-practica.component.html',
    styleUrls: ['./visualizar-practica.component.css']
})


export class VisualizarComponent implements OnInit
{
    filtroSemestreSeleccionado: boolean = false;
    filtroEmpresaSeleccionado : boolean = false;

    displayedColumns: string[] = ['position', 'rut', 'nombre', 'empresa', 'ver'];
    dataSource: ITablaVisualizarPractica[] = 
    [
        {position: 1, rut: '1111111', nombre: 'Juan Gonzalez R.', empresa: 'Empresa 1', ver: ''},
        {position: 2, rut: '2222222', nombre: 'Maria Ramirez G.', empresa: 'Empresa 2', ver: ''},
        {position: 3, rut: '3333333', nombre: 'Roberto Donoso J.', empresa: 'Empresa 3', ver: ''},
        {position: 4, rut: '4444444', nombre: 'Martina Gonzalez R.', empresa: 'Empresa 4', ver: ''},
        {position: 5, rut: '5555555', nombre: 'Clodotea Marambio E.', empresa: 'Empresa 5', ver: ''},
        {position: 6, rut: '6666666', nombre: 'Ricardo Paredes G.', empresa: 'Empresa 6', ver: ''},
        {position: 7, rut: '7777777', nombre: 'Lucia Marszz T.', empresa: 'Empresa 7', ver: ''},
        {position: 8, rut: '8888888', nombre: 'Miguel Sanhueza K.', empresa: 'Empresa 8', ver: ''},
        {position: 9, rut: '9999999', nombre: 'Ignacia Marambio B.', empresa: 'Empresa 9', ver: ''},
        {position: 10, rut: '0000000', nombre: 'Francisco Duque Q.', empresa: 'Empresa 10', ver: ''},
    ];

    ngOnInit(): void 
    {

    }


    filtroSelectChange(filtroElegido: any) //se ejecuta cuando el usuario selecciona un filtro del <mat-select>
    {
        if ( filtroElegido == 'semestre' )
        {
            this.filtroSemestreSeleccionado = true ;
            this.filtroEmpresaSeleccionado  = false;
        }

        if ( filtroElegido == 'aprobadas' )
        {
            this.filtroSemestreSeleccionado = false;
            this.filtroEmpresaSeleccionado  = false;
        }
        if ( filtroElegido == 'reprobadas' )
        {
            this.filtroSemestreSeleccionado = false;
            this.filtroEmpresaSeleccionado  = false;
        }
        if ( filtroElegido == 'empresa' )
        {
            this.filtroSemestreSeleccionado = false;
            this.filtroEmpresaSeleccionado  = true ;
        }
        if ( filtroElegido == 'sin_filtros' )
        {
            this.filtroSemestreSeleccionado = false;
            this.filtroEmpresaSeleccionado  = false;
        }
    }

    semestreSelectChange(semestreElegido: any)
    {
        
    }

}