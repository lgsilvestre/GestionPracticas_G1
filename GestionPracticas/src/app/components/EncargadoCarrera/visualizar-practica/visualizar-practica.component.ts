import { AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogoPracticaComponent } from '../dialogo-practica/dialogo-practica.component';
import { MatPaginator } from "@angular/material/paginator";

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
    { position: 1, rut: '1111111', nombre: 'Juan Gonzalez R.', empresa: 'Cencosud', situacion: 'Pendiente', semestre: '1', ver: '' },
    { position: 2, rut: '2222222', nombre: 'Maria Ramirez G.', empresa: 'Cencosud', situacion: 'Pendiente', semestre: '1', ver: '' },
    { position: 3, rut: '3333333', nombre: 'Roberto Donoso J.', empresa: 'Agrosuper', situacion: 'En proceso', semestre: '2', ver: '' },
    { position: 4, rut: '4444444', nombre: 'Martina Gonzalez R.', empresa: 'Haulmer Spa.', situacion: 'Pendiente', semestre: '2', ver: '' },
    { position: 5, rut: '5555555', nombre: 'Clodotea Marambio E.', empresa: 'Entel', situacion: 'Terminada', semestre: '2', ver: '' },
    { position: 6, rut: '6666666', nombre: 'Ricardo Paredes G.', empresa: 'Haulmer Spa.', situacion: 'Terminada', semestre: '1', ver: '' },
    { position: 7, rut: '7777777', nombre: 'Lucia Marszz T.', empresa: 'Solu4B', situacion: 'Pendiente', semestre: '1', ver: '' },
    { position: 8, rut: '8888888', nombre: 'Miguel Sanhueza K.', empresa: 'Cencosud', situacion: 'En proceso', semestre: '2', ver: '' },
    { position: 9, rut: '9999999', nombre: 'Ignacia Marambio B.', empresa: 'Haulmer Spa.', situacion: 'En proceso', semestre: '1', ver: '' },
    { position: 10, rut: '0000000', nombre: 'Francisco Duque Q.', empresa: 'Agrosuper', situacion: 'En proceso', semestre: '1', ver: '' },
];

//lo anterior debe ser cargado desde FireBase, hay que eliminar esto anterior.

const spanishRangeLabel = (page: number, pageSize: number, length: number) => { // esta constante sirve para la paginación.
    if (length == 0 || pageSize == 0) { return `0 de ${length}`; }
    
    length = Math.max(length, 0);
  
    const startIndex = page * pageSize;
  
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
  
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }


@Component({
    selector: 'app-visualizar-practicas',
    templateUrl: './visualizar-practica.component.html',
    styleUrls: ['./visualizar-practica.component.css']
})


export class VisualizarComponent implements OnInit, AfterViewInit{
    filtroSemestreSeleccionado: boolean = false;
    filtroEmpresaSeleccionado: boolean = false;
    filtroSituacionSeleccionado: boolean = false;

    nombreFilter = new FormControl('');
    empresaFilter = new FormControl('');
    semestreFilter = new FormControl('');
    situacionFilter = new FormControl('');

    displayedColumns: string[] = ['position', 'rut', 'nombre', 'empresa', 'situacion', 'semestre', 'ver'];

    dataSource = new MatTableDataSource(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;


    filterValues = {
        rut: '',
        position: '',
        nombre: '',
        empresa: '',
        situacion: '',
        semestre: '',
        ver: ''
    }

    clearFilters() { //cada vez que se agregue un nuevo filtro no olvidar de agregar aquí.
        this.nombreFilter.setValue('');
        this.empresaFilter.setValue('');
        this.semestreFilter.setValue('');
        this.situacionFilter.setValue('');
    }

    ngOnInit(): void { //cada vez que se agregue un nuevo filtro no olvidar de agregar aquí.
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
        this.semestreFilter.valueChanges
            .subscribe(
                semestre => {
                    this.filterValues.semestre = semestre;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            )
        this.situacionFilter.valueChanges
            .subscribe(
                situacion => {
                    this.filterValues.situacion = situacion;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            )

    }

    constructor(public dialog: MatDialog) {
        this.dataSource.filterPredicate = this.createFilter();
    }
    ngAfterViewInit(): void {
        this.paginator._intl.itemsPerPageLabel = "Resultados por página";
        this.paginator._intl.nextPageLabel = "Página siguiente";
        this.paginator._intl.firstPageLabel = "Primera página";
        this.paginator._intl.lastPageLabel = "Última página";
        this.paginator._intl.previousPageLabel = "Página anterior";
        this.paginator._intl.getRangeLabel = spanishRangeLabel;
        this.dataSource.paginator = this.paginator;
    }

    openDialog(nombre: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {nombre: nombre};

        const dialogRef = this.dialog.open(DialogoPracticaComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`); // retorna lo que se seleccionó en cuadro diálogo.
        });
    }


    filtroSelectChange(filtroElegido: String) //se ejecuta cuando el usuario selecciona un filtro del <mat-select>
    {

        if (filtroElegido == 'semestre') {
            this.filtroSemestreSeleccionado = true;
            this.filtroEmpresaSeleccionado = false;
            this.filtroSituacionSeleccionado = false;
        }

        if (filtroElegido == 'situacion') {
            this.filtroSemestreSeleccionado = false;
            this.filtroEmpresaSeleccionado = false;
            this.filtroSituacionSeleccionado = true;
        }

        if (filtroElegido == 'empresa') {
            this.filtroSemestreSeleccionado = false;
            this.filtroEmpresaSeleccionado = true;
            this.filtroSituacionSeleccionado = false;
        }
        if (filtroElegido == 'sin_filtros') {
            this.filtroSemestreSeleccionado = false;
            this.filtroEmpresaSeleccionado = false;
            this.filtroSituacionSeleccionado = false;
            this.clearFilters();
        }
    }

    semestreSelectChange(semestreElegido: any) {
        //this.dataSource.filter = semestreElegido.trim().toLowerCase();
    }

    createFilter(): (data: ITablaVisualizarPractica, filter: string) => boolean { //crea el filtro de manera personalizada en la columna correspondiente.
        let filterFunction = function (data: ITablaVisualizarPractica, filter: string): boolean {
            let searchTerms = JSON.parse(filter);
            return data.nombre.toLowerCase().indexOf(searchTerms.nombre) !== -1
                && data.empresa.toLowerCase().indexOf(searchTerms.empresa) !== -1
                && data.situacion.toLowerCase().indexOf(searchTerms.situacion) !== -1
                && data.semestre.toString().toLowerCase().indexOf(searchTerms.semestre) !== -1;
        }
        return filterFunction;
    }

}