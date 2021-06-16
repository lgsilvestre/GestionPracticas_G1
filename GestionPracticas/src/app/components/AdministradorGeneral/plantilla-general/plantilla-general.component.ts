/* tslint:disable:no-inferrable-types */
import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlantillaGeneral} from '../../../model/plantillaGeneral.model';
import {FirebaseEstudianteService} from '../../Servicios/firebase-estudiante.service';
import {DynamicHostDirective} from '../directivas/dynamic-host.directive';
import {ArchivosInformativoComponent} from '../GestionArchivos/archivos-informativo/archivos-informativo.component';
import {GestionarArchivosGeneralesService} from '../../Servicios/gestionar-archivos-generales.service';
import {LocalStorageService} from '../../Servicios/local-storage.service';

export interface Documento
{
  titulo: string;
  descripcion: string;
  url: string;
}

@Component({
  selector: 'app-plantilla-general',
  templateUrl: './plantilla-general.component.html',
  styleUrls: ['./plantilla-general.component.css', '../../../app.component.css']
})
export class PlantillaGeneralComponent implements OnInit {
  @ViewChild(DynamicHostDirective,  { static: true }) public dynamicHost: DynamicHostDirective | undefined;
  carreraActual: string = 'None';
  private documentos: Documento[] =
    [{titulo: 'hola', descripcion: 'soy un coponente dinamico', url: 'https://www.google.com/'}];
  datosSolicitudPractica: FormGroup;
  documentosGenerales: FormGroup;
  datosEstudianteEtapa: FormGroup;
  segundaEtapa: FormGroup;
  terseraEtapa: FormGroup;
  cuartaEtapa: FormGroup;
  files: string[] = [' '];
  constructor(private _formBuilder: FormBuilder,
              private afStudent: FirebaseEstudianteService,
              private comFacResol: ComponentFactoryResolver,
              private gestionArchivosGenerales: GestionarArchivosGeneralesService,
              private locaSTF: LocalStorageService)
  {
    this.datosSolicitudPractica = this._formBuilder.group({});
    this.documentosGenerales = this._formBuilder.group({});
    this.datosEstudianteEtapa = this._formBuilder.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Carrera: ['', Validators.required],
      NumeroMatricula: ['', Validators.required],
      Run: ['', Validators.required],
      NumeroContacto: ['', Validators.required],
      CorreoElectronico: ['', Validators.required],
      ContactoEmergencia: ['', Validators.required],
      TelefonoEmergencia: ['', Validators.required],
    });
    this.segundaEtapa = this._formBuilder.group({
      Nombre: ['', Validators.required],
      Rut: ['', Validators.required],
      NumeroTelefono: ['', Validators.required],
      CorreoElectronico: ['', Validators.required],
      Direccion: ['', Validators.required],
    });
    this.terseraEtapa = this._formBuilder.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Run: ['', Validators.required],
      AreaDepto: ['', Validators.required],
      Puesto: ['', Validators.required],
      NumeroContacto: ['', Validators.required],
      CorreoElectronico: ['', Validators.required],
    });
    this.cuartaEtapa = this._formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      HoraInicio: ['', Validators.required],
      HoraFin: ['', Validators.required],
      Jornada: ['', Validators.required],
    });
    if (this.locaSTF.getRol() === 'estudiante')
    {
      this.locaSTF.reloadUser();
      this.datosEstudianteEtapa.patchValue(
        {
          Nombres: this.locaSTF.getNombres(),
          Apellidos: this.locaSTF.getApellidos(),
          Run: this.locaSTF.getRun(),
          Carrera: this.locaSTF.getCarrera(),
          NumeroMatricula: this.locaSTF.getNumeroMatricula(),
          CorreoElectronico: this.locaSTF.getCorreoElectronicoInstitucional(),
          NumeroContacto: this.locaSTF.getNumeroTelefono()
        });
    }
    // tslint:disable-next-line:new-parens
  }

  ngOnInit(): void
  {
    this.gestionArchivosGenerales.getInformativelFiles().subscribe(files => {
      this.dynamicHost?.viewContainerRef.clear();
      files.forEach(file => {
        console.log('file ' + file.id);
        const component = this.comFacResol.resolveComponentFactory(ArchivosInformativoComponent);
        const contt = this.dynamicHost?.viewContainerRef.createComponent<ArchivosInformativoComponent>(component)?.
        instance.setValues(file.id, file.nombre, file.textoInformativo, file.urlArchivo, file.filename);
      });
    });
    this.gestionArchivosGenerales.updateGeneralFiles();
    /* asi se puedne setear valores this.primeraEtapa.patchValue({Nombres: 'juan' , Apellidos: 'rodiguez' });*/
  }
  enviar(): void
  {
    const plantilla: PlantillaGeneral =
       { nombres: this.datosEstudianteEtapa.value.Nombres,
         apellidos: this.datosEstudianteEtapa.value.Apellidos,
         carrera: this.datosEstudianteEtapa.value.Carrera,
         numeroMatricula : this.datosEstudianteEtapa.value.NumeroMatricula,
         run: this.datosEstudianteEtapa.value.Run,
         telefono: this.datosEstudianteEtapa.value.NumeroContacto,
         correoInstitucional: this.datosEstudianteEtapa.value.CorreoElectronico,
         contactoEmergencia: this.datosEstudianteEtapa.value.ContactoEmergencia,
         telefonoEmergencia: this.datosEstudianteEtapa.value.TelefonoEmergencia,
         // Empresa
         nombreEmpresa: this.segundaEtapa.value.Nombre,
         rutEmpresa: this.segundaEtapa.value.Rut,
         telefonoEmpresa: this.segundaEtapa.value.NumeroTelefono,
         correoEmpresa: this.segundaEtapa.value.CorreoElectronico,
         direccionEmpresa: this.segundaEtapa.value.Direccion,
         // Tutor
         nombreTutor: this.terseraEtapa.value.Nombres,
         apellidoTutor: this.terseraEtapa.value.Apellidos,
         runTutor: this.terseraEtapa.value.Run,
         areaTutor: this.terseraEtapa.value.AreaDepto,
         puestoTutor: this.terseraEtapa.value.Puesto,
         contactoTutor: this.terseraEtapa.value.NumeroContacto,
         correoTutor: this.terseraEtapa.value.CorreoElectronico,
         // Practica
         numeroPractica: '1',
         fechaInicio: this.cuartaEtapa.value.startDate,
         fechaTermino: this.cuartaEtapa.value.endDate,
         horaInicio: this.cuartaEtapa.value.HoraInicio,
         horaTermino: this.cuartaEtapa.value.HoraFin,
         duracionJorada: this.cuartaEtapa.value.Jornada,
         archivos: this.files, // revisar bien.
         // fin ( por el momento)
         estado: 'Pendiente', // aprobado,rechazado,en revision
     };
    console.log(plantilla);
    this.afStudent.upSolicitud( plantilla);
  }
  /*
  upFile(): void
  {
      console.log(this.files);
      this.afStudent.upLoadFile(this.files[0]);
  }
   */
   public getAlumno(): void
   {
     console.log(this.datosEstudianteEtapa.value.Archivo.name);
   }
   onFileChange(event: any): void
  {
      console.log(event.target.files[0]);
      this.files.push(event.target.files[0]);
  }
  onDataChange(event: any, option: number): void
  {
    const ddate: string = event.value;
    if ( option === 0 )
    {
      this.cuartaEtapa.patchValue({ startDate: ddate});
    }else
    {
      this.cuartaEtapa.patchValue({endDate: ddate});
    }
  }

}
