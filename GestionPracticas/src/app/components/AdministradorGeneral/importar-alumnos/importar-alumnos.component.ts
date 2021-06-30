import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { GestionAdminGeneralService } from '../../Servicios/adminGenerla/gestion-admin-general.service';
declare let alertify: any;

@Component({
  selector: 'app-importar-alumnos',
  templateUrl: './importar-alumnos.component.html',
  styleUrls: ['./importar-alumnos.component.css']
})

export class ImportarAlumnosComponent implements OnInit {

  data           : any;    //matriz con los datos del excel
  cuentasCreadas : number; //cantidad de cuentas que han sido creadas desde el excel
  totalCuentas   : number; //total de cuentas a crear desde el excel
  formatoHeader  : any;    //arreglo que contiene el encabezado que la tabla del excel importado debería contener

  constructor(private adminGeneralService: GestionAdminGeneralService) 
  { 
    this.data = [];
    this.cuentasCreadas  = 0;
    this.totalCuentas    = 1;//para evitar division por 0
    this.formatoHeader   = ["NBE_CARRERA", "COD_CARRERA", "MATRICULA", "RUT", "NBE_ALUMNO", "CORREO_INS", "CORREO_PER", "SEXO", "FECHA_NAC", "PLAN", "ANHO_INGRESO", "VIA_INGRESO", "SIT_ACTUAL", "SIT_ACTUAL_ANHO", "SIT_ACTUAL_PERIODO", "REGULAR", "COMUNA_ORIGEN", "REGION", "NIVEL", "PORC_AVANCE", "ULT_PUNT_PRIO", "AL_DIA", "NIVEL_99_APROBADO"];
}

  ngOnInit(): void 
  {

  }

  onFileChange(evt: any) 
  {
    this.data = [];

    const target: DataTransfer = <DataTransfer>(evt.target);
    if ( target.files.length !== 1 )
    {
        alertify.error("Error, solo se puede procesar 1 archivo a la vez!");
        return;
    }

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
        const bstr: string = e.target.result;

        const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
        
        const wsname: string = wb.SheetNames[0];

        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        //console.log(ws);

        this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
        
        if ( this.formatoContenidoExcelEsValido() )
        {
            this.crearCuentas();
        }
        
        console.log(this.data);
    };

    reader.readAsBinaryString(target.files[0]);
  }

  crearCuentas()
  {
    this.cuentasCreadas = 0; //reset contador
    this.totalCuentas   = 1; //reset en 1 para evitar division por 0
    this.totalCuentas   = this.data.length - 4; //4 debido a que es la linea donde comienzan a aparecer los alumnos en el formato del excel

    for ( let i = 4 ; i < this.data.length ; i++ )
    {
        var correo: string = this.data[i][5];

        this.adminGeneralService.crearCuentaEstudiante(correo, "123456")
        .then((userCredential) => {
            this.cuentasCreadas++;
            if ( this.cuentasCreadas == this.totalCuentas ) //ultima cuenta
            {
                alertify.success("Proceso de carga finalizado!");
            }

            let splitted_full_name = this.data[i][4].split(" ", 5);
            let lastNames = splitted_full_name[0] + ' ' + splitted_full_name[1];
            let names     = splitted_full_name[2] + ' ' + splitted_full_name[3];   

            //Intentar hacerlo async
            let estudiante = {
                carrera: this.data[i][0],
                cod_carrera: this.data[i][1],
                numeroMatricula: this.data[i][2],
                run: this.data[i][3],
                nombres: names,
                apellidos: lastNames,
                correoInstitucional: this.data[i][5],
                correoPersonal: this.data[i][6],
                sexo: this.data[i][7],
                fechaNacimiento: this.data[i][8],
                plan: this.data[i][8],
                añoIngreso: this.data[i][9],
                viaIngreso: this.data[i][10],
                situacionActual: this.data[i][11],
                situacionActualAño: this.data[i][12],
                situacionActualPeriodo: this.data[i][13],
                regular: this.data[i][14],
                nivel: this.data[i][15],
                porcentajeAvance: this.data[i][16],
                ult_punt_prio: this.data[i][17],
                alDia: this.data[i][18],
                nivel99Aprobado: this.data[i][19]
            }
            
            this.adminGeneralService.insertarEstudiante(estudiante)
            .then(()=> {
                console.log("Creadox");
            })
            .catch(()=> {
                console.log("No creadox");
            });
        })
        .catch((error) => {
            if ( error.code == "auth/email-already-in-use" )
            {
                alertify.error("Error, la cuenta ya se encontraba en el sistema!");
            }
        });
    }
  }

  /**
   * Valida el formato del contenido del excel
   *
   */
  formatoContenidoExcelEsValido(): boolean
  {
    if ( !this.headerTablaEsValido(this.data[3]) ) //3 representa la fila en donde está el encabezado de la tabla
    {
        return false;
    }
    return true;
  }

  private headerTablaEsValido(encabezadoTablaExcelImportado: any): boolean
  {
    if ( this.formatoHeader.length !== encabezadoTablaExcelImportado.length ) 
        return false;

    for ( var col = 0 ; col < this.formatoHeader.length ; col++ )
    {
        if ( this.formatoHeader[col] !== encabezadoTablaExcelImportado[col] )
        {
            alertify.error("El nombre de la columna "+encabezadoTablaExcelImportado[col]+" es incorrecta, se esperaba "+this.formatoHeader[col]);
            return false;
        }            
    }
    return true;
  }

}
