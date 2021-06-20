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

  data: any;
  cuentasCreadas: number;
  totalCuentas: number;


  constructor(private adminGeneralService: GestionAdminGeneralService) 
  { 
    this.data = [];
    this.cuentasCreadas = 0;
    this.totalCuentas   = 0;
  }

  ngOnInit(): void {
  }

  onFileChange(evt: any) 
  {
    this.data = [];

    const target: DataTransfer = <DataTransfer>(evt.target);
    if ( target.files.length !== 1 ) throw new Error('Cannot use mutiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
        const bstr: string = e.target.result;

        const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
        
        const wsname: string = wb.SheetNames[0];

        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        console.log(ws);

        this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
        
        this.crearCuentas();
        console.log(this.data);
    }

    reader.readAsBinaryString(target.files[0]);
  }

  crearCuentas()
  {
    this.cuentasCreadas = 0; //reset contador
    this.totalCuentas   = this.data.length - 4; //4 debido a que es la linea donde comienzan a aparecer los alumnos en el formato del excel

    for ( var i = 4 ; i < this.data.length ; i++ )
    {
        var correo: string = this.data[i][5];
        this.adminGeneralService.crearCuentaEstudiante(correo, "123456")
        .then((userCredential) => {
            this.cuentasCreadas++;
            console.log("Cuentaaaaaas creadsa: "+this.cuentasCreadas);
          })
          .catch((error) => {
            alertify.error("Ocurrió un error al crear una cuenta");
            console.log("Error:"+error);
        });
    }
  }
  
}
