import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogoPracticaComponent } from '../dialogo-practica/dialogo-practica.component';
import { MatPaginator } from "@angular/material/paginator";
import { EncargadoCarreraService } from "../../Servicios/encargado-carrera.service";


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


export class VisualizarComponent implements OnInit, AfterViewInit {
    filtroSemestreSeleccionado: boolean = false;
    filtroEmpresaSeleccionado: boolean = false;
    filtroSituacionSeleccionado: boolean = false;

    nombreFilter = new FormControl('');
    empresaFilter = new FormControl('');
    semestreFilter = new FormControl('');
    situacionFilter = new FormControl('');


    displayedColumns: string[] = ['position', 'rut', 'nombre', 'empresa', 'situacion', 'semestre', 'ver'];


    solicitudes: any [];

    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;


    ngOnInit(): void { //cada vez que se agregue un nuevo filtro no olvidar de agregar aquí.

        this.cargarDatos();
        

    }

    constructor(public dialog: MatDialog, private EC_service: EncargadoCarreraService) {
        this.solicitudes = [];
        this.dataSource = new MatTableDataSource<any>(this.solicitudes);
        
        // var prueba: any = { numeroMatricula: '1', runEstudiante: '1111111', nombreEstudiante: 'Juan Gonzalez R.', nombreEmpresa: 'Cencosud', estadoDePractica: 'Pendiente', numeroPractica: '1', runEmpresa: '78.988.888-k'};
        // this.solicitudes.push(prueba);
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
        dialogConfig.data = { nombre: nombre };

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
        }
    }

    semestreSelectChange(semestreElegido: any) {
        //this.dataSource.filter = semestreElegido.trim().toLowerCase();
    }

    cargarDatos() {
        this.EC_service.load_data_visualizar_practica().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                console.log(doc.data().numeroMatricula);
                
                const nuevaPractica : any = doc.data();
                this.solicitudes.push(nuevaPractica);

            });

        }).finally((  ) => { 
            this.dataSource.data = this.solicitudes;
        });
    }

    mostrar_Cantidad(){
        console.log(this.solicitudes);
        console.log(this.dataSource.data.length);
        // this.solicitudes.pop();
    }

}