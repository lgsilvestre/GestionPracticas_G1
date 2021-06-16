import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogoPracticaComponent } from '../dialogo-practica/dialogo-practica.component';
import { MatPaginator } from "@angular/material/paginator";
import { EncargadoCarreraService } from "../../Servicios/encargado-carrera.service";
import { Practica } from "src/app/model/practica.model";
import { LocalStorageService } from "../../Servicios/local-storage.service";
declare let alertify: any;

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
    styleUrls: ['./visualizar-practica.component.css', '../../../app.component.css']
})


export class VisualizarComponent implements OnInit, AfterViewInit {
    filtroEmpresaSeleccionado: boolean         = false;
    filtroSituacionSeleccionado: boolean       = false;
    filtroNumeroMatriculaSeleccionado: boolean = false;

    filtroNombre          = new FormControl('');
    filtroEmpresa         = new FormControl('');
    filtroNumeroMatricula = new FormControl('');
    filtroSituacion       = new FormControl('');

    tablaSolicitudSeleccionada: boolean;
    tablaIncripcionSeleccionada: boolean;
    tablaEnCursoSeleccionada: boolean;

    selectFilterValue: string = "sin_filtros";

    displayedColumns: string[];
    displayedColumnsSolicitud: string[];
    displayedColumnsInscripcion: string[];
    displayedColumnsEnCurso: string[];
    //Solicitud: matrícula, nombre, apellidos, rut, situación, accion
    //Inscripcion: 'matricula', 'nombre', 'apellido', 'rut', 'empresa', 'situacion', 'accion'
    //En curso: 'matricula', 'nombre', 'apellido', 'rut', 'empresa', 'situacion', 'accion'


    solicitudes: Practica[];

    dataSource = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    filterValues = {
        numeroMatricula: '',
        nombres: '',
        nombreEmpresa: '',
        estado: '',
    }


    ngOnInit(): void { //cada vez que se agregue un nuevo filtro no olvidar de agregar aquí.

        this.cargarDatos('SolicitudesPracticas');
        this.alertify_default_setting();

        this.filtroNombre.valueChanges
            .subscribe(
                nombres => {
                    this.filterValues.nombres = nombres;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            )
        this.filtroEmpresa.valueChanges
            .subscribe(
                nombreEmpresa => {
                    this.filterValues.nombreEmpresa = nombreEmpresa;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            )
        this.filtroNumeroMatricula.valueChanges
            .subscribe(
                numeroMatricula => {
                    this.filterValues.numeroMatricula = numeroMatricula;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            )
        this.filtroSituacion.valueChanges
            .subscribe(
                estado => {
                    this.filterValues.estado = estado;
                    this.dataSource.filter = JSON.stringify(this.filterValues);
                }
            )

    }

    constructor(public dialog: MatDialog, private EC_service: EncargadoCarreraService, private locaSTF: LocalStorageService) {
        this.solicitudes     = [];
        this.dataSource.data = this.solicitudes;
        this.dataSource.filterPredicate = this.createFilter('SolicitudesPractica');

        this.tablaSolicitudSeleccionada = true; //Por default está seleccionada.
        this.tablaIncripcionSeleccionada = false;
        this.tablaEnCursoSeleccionada = false;

        this.displayedColumnsSolicitud = ['matricula', 'nombre', 'apellido', 'rut', 'situacion', 'accion'];
        this.displayedColumnsInscripcion = ['matricula', 'nombre', 'apellido', 'rut', 'empresa', 'situacion', 'accion'];
        this.displayedColumnsEnCurso = ['matricula', 'nombre', 'apellido', 'rut', 'empresa', 'situacion', 'accion'];
        this.displayedColumns = this.displayedColumnsSolicitud; // Por default será las columnas de solicitud.
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

    clearFilters() { //cada vez que se agregue un nuevo filtro no olvidar de agregar aquí.
        this.filtroNombre.setValue('');
        this.filtroEmpresa.setValue('');
        this.filtroNumeroMatricula.setValue('');
        this.filtroSituacion.setValue('');
    }

    openDialog(elemento: any) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = elemento;

        const dialogRef = this.dialog.open(DialogoPracticaComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`); // retorna lo que se seleccionó en cuadro diálogo.
        });
    }


    filtroSelectChange(filtroElegido: string) //se ejecuta cuando el usuario selecciona un filtro del <mat-select>
    {
        if (filtroElegido == 'matricula') {
            this.filtroNumeroMatriculaSeleccionado = true;
            this.filtroEmpresaSeleccionado = false;
            this.filtroSituacionSeleccionado = false;
        }

        if (filtroElegido == 'situacion') {
            this.filtroNumeroMatriculaSeleccionado = false;
            this.filtroEmpresaSeleccionado = false;
            this.filtroSituacionSeleccionado = true;
        }

        if (filtroElegido == 'empresa') {
            this.filtroNumeroMatriculaSeleccionado = false;
            this.filtroEmpresaSeleccionado = true;
            this.filtroSituacionSeleccionado = false;
        }

        if (filtroElegido == 'sin_filtros') {
            this.filtroNumeroMatriculaSeleccionado = false;
            this.filtroEmpresaSeleccionado = false;
            this.filtroSituacionSeleccionado = false;
            this.clearFilters();
        }
    }

    cargarDatos(coleccion: string) {
        var carrera = this.locaSTF.getCarrera(); //carrera del encargado
        this.EC_service.load_data_visualizar_practica(coleccion, "Ingeniería Civil en Computación").then((querySnapshot) => {
            this.solicitudes = [];
            querySnapshot.forEach(doc => {

                const nuevaPractica: any = doc.data();
                this.solicitudes.push(nuevaPractica);

            });

        }).finally(() => {
            this.dataSource.data = this.solicitudes;
        });
    }

    createFilter(tabla : string): (data: any, filter: string) => boolean { //crea el filtro de manera personalizada en la columna correspondiente.

        
        let filterFunction = function (data: any, filter: string): boolean {
            let searchTerms = JSON.parse(filter);

            let output = data.nombres.toString().toLowerCase().indexOf(searchTerms.nombres) !== -1
            && data.numeroMatricula.toString().toLowerCase().indexOf(searchTerms.numeroMatricula) !== -1
            && data.estado.toString().toLowerCase().indexOf(searchTerms.estado) !== -1;

            if ( tabla != "SolicitudesPractica" )
            {
                output = output && data.nombreEmpresa.toString().toLowerCase().indexOf(searchTerms.nombreEmpresa) !== -1;
            }

            return output;
        }
        return filterFunction;
    }

    cambiar_estado(solicitud: any, param_estado: string) {
        var msg_success = "La solicitud fue ";
        var msg_error = "Ocurrió un error y la solicitud no se pudo ";
        var coleccion = '';

        if (this.tablaSolicitudSeleccionada) {
            coleccion = 'SolicitudesPracticas'
        }

        if (this.tablaIncripcionSeleccionada) {
            coleccion = 'Solicitudes'
        }

        if (this.tablaEnCursoSeleccionada) {
            coleccion = 'Solicitudes'
        }

        var solicitudRef = this.EC_service.update_solicitud(solicitud.idSolicitud, coleccion);
        console.log("El id para actualizar es>>> " + solicitud.idSolicitud);

        if (param_estado == "Aceptado") {
            msg_success += "aceptada";
            msg_error += "aceptar";

            alertify.confirm(
                'Aceptar solicitud',
                '¿Está seguro que desea aceptar la solicitud?',
                () => {
                    return solicitudRef.update({
                        estado: param_estado
                    })
                        .then(() => {
                            this.solicitudes = [];
                            this.cargarDatos(coleccion);
                            alertify.success(msg_success);
                        })
                        .catch((error) => {
                            alertify.error(msg_error + error);
                        });
                },
                () => { alertify.error("La acción fue cancelada") }
            );
        }

        if (param_estado == "Rechazada") {
            msg_success += "rechazada";
            msg_error += "rechazar";

            alertify.prompt(
                'Feedback',
                '¿Por qué la solicitud será rechazada?',
                '',
                (evt: any, motivo: string) => {
                    return solicitudRef.update({
                        estado: param_estado,
                        feedback: motivo
                    })
                        .then(() => {
                            this.solicitudes = [];
                            this.cargarDatos(coleccion);
                            alertify.success(msg_success);
                        })
                        .catch((error) => {
                            alertify.error(msg_error);
                        });
                },
                () => { alertify.error('La acción fue cancelada') }
            );
        }
    }

    alertify_default_setting() {
        alertify.defaults.theme.ok = "btn btn-outline-primary";
        alertify.defaults.theme.cancel = "btn btn-secondary";
        alertify.defaults.theme.input = "form-control";
        alertify.defaults.glossary.ok = "Aceptar";
        alertify.defaults.glossary.cancel = "Cancelar";
    }

    seleccionarTabla(nombreTabla: string) {
        this.filtroNombre.setValue('');       
        this.selectFilterValue = "sin_filtros";
        this.filtroNumeroMatriculaSeleccionado = false;
        this.filtroSituacionSeleccionado       = false;
        this.filtroEmpresaSeleccionado         = false;

        if (nombreTabla == 'solicitudes') {
            this.tablaSolicitudSeleccionada = true;
            this.tablaIncripcionSeleccionada = false;
            this.tablaEnCursoSeleccionada = false;
            this.displayedColumns = this.displayedColumnsSolicitud;
            this.cargarDatos('SolicitudesPracticas');
            this.dataSource.filterPredicate = this.createFilter('SolicitudesPractica');
        }
        if (nombreTabla == 'inscripciones') {
            this.tablaSolicitudSeleccionada = false;
            this.tablaIncripcionSeleccionada = true;
            this.tablaEnCursoSeleccionada = false;
            this.displayedColumns = this.displayedColumnsInscripcion;
            this.cargarDatos('Solicitudes');
            this.dataSource.filterPredicate = this.createFilter('Solicitudes');
        }
        if (nombreTabla == 'enCurso') {
            this.tablaSolicitudSeleccionada = false;
            this.tablaIncripcionSeleccionada = false;
            this.tablaEnCursoSeleccionada = true;
            this.displayedColumns = this.displayedColumnsEnCurso;
            this.cargarDatos('Solicitudes');
            this.dataSource.filterPredicate = this.createFilter('Solicitudes');
        }

    }

}