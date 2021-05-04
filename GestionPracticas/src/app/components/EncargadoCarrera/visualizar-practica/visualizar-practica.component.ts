import { Component, OnInit } from "@angular/core";
import { FormControl} from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";

export interface ITablaVisualizarPractica {
    rut: string;
    position: number;
    nombre: string;
    empresa: string;
    situacion: string;
    semestre: string;
    ver: string;
}

const ELEMENT_DATA: ITablaVisualizarPractica[] = [
    {position: 1, rut: '1111111', nombre: 'Juan Gonzalez R.', empresa: 'Empresa 1', situacion: 'Aprobada', semestre: '1', ver: ''},
    {position: 2, rut: '2222222', nombre: 'Maria Ramirez G.', empresa: 'Empresa 1' , situacion: 'Aprobada', semestre: '1', ver: ''},
    {position: 3, rut: '3333333', nombre: 'Roberto Donoso J.', empresa: 'Empresa 1', situacion: 'Aprobada', semestre: '2', ver: ''},
    {position: 4, rut: '4444444', nombre: 'Martina Gonzalez R.', empresa: 'Empresa 4', situacion: 'Aprobada', semestre: '2', ver: ''},
    {position: 5, rut: '5555555', nombre: 'Clodotea Marambio E.', empresa: 'Empresa 5', situacion: 'Aprobada', semestre: '2', ver: ''},
    {position: 6, rut: '6666666', nombre: 'Ricardo Paredes G.', empresa: 'Empresa 6', situacion: 'Aprobada', semestre: '1', ver: ''},
    {position: 7, rut: '7777777', nombre: 'Lucia Marszz T.', empresa: 'Empresa 7', situacion: 'Reprobada', semestre: '1', ver: ''},
    {position: 8, rut: '8888888', nombre: 'Miguel Sanhueza K.', empresa: 'Empresa 8', situacion: 'Aprobada', semestre: '2', ver: ''},
    {position: 9, rut: '9999999', nombre: 'Ignacia Marambio B.', empresa: 'Empresa 9', situacion: 'Aprobada', semestre: '1', ver: ''},
    {position: 10, rut: '0000000', nombre: 'Francisco Duque Q.', empresa: 'Empresa 10', situacion: 'Reprobada', semestre: '1', ver: ''},
];


@Component({
    selector: 'app-visualizar-practicas',
    templateUrl: './visualizar-practica.component.html',
    styleUrls: ['./visualizar-practica.component.css']
})


export class VisualizarComponent implements OnInit
{
    filtroSemestreSeleccionado: boolean = false;
    filtroEmpresaSeleccionado : boolean = false;

    nombreFilter = new FormControl('');
    empresaFilter = new FormControl('');

    displayedColumns: string[] = ['position', 'rut', 'nombre', 'empresa', 'situacion', 'semestre', 'ver'];

    dataSource = new MatTableDataSource(ELEMENT_DATA);


    // applyFilter(event: Event) {
    // //     const filterValue = (event.target as HTMLInputElement).value;
    // //     // this.dataSource.filter = filterValue.trim().toLowerCase();
    // //     this.dataSource.filterPredicate = (data: ITablaVisualizarPractica) => {
    // //         return data.nombre == filterValue;
    // //     };
    // }

    filterValues = {
        rut: '',
        position: '',
        nombre: '',
        empresa: '',
        situacion: '',
        semestre: '',
        ver: ''
    }

    ngOnInit(): void 
    {
        this.nombreFilter.valueChanges
            .subscribe(
                nombre => {
                    this.filterValues.nombre = nombre;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            )
        this.empresaFilter.valueChanges
            .subscribe(
                empresa => {
                    this.filterValues.empresa = empresa;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            )
    }

    constructor(){
        this.dataSource.filterPredicate = this.createFilter();
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
        if ( semestreElegido == '1' ) {
            const filterValue = '1'
            this.dataSource.filter = filterValue.trim().toLowerCase();
        }

        if ( semestreElegido == '2' ) {
            const filterValue = '2'
            this.dataSource.filter = filterValue.trim().toLowerCase();
        }

    }

    createFilter(): (data: ITablaVisualizarPractica, filter: string) => boolean {
        let filterFunction = function(data: ITablaVisualizarPractica, filter: string): boolean {
          let searchTerms = JSON.parse(filter);
          return data.nombre.toLowerCase().indexOf(searchTerms.nombre) !== -1
            && data.empresa.toLowerCase().indexOf(searchTerms.empresa) !== -1
            && data.situacion.toLowerCase().indexOf(searchTerms.situacion) !== -1
            && data.semestre.toLowerCase().indexOf(searchTerms.semestre) !== -1;
        }
        return filterFunction;
      }

}