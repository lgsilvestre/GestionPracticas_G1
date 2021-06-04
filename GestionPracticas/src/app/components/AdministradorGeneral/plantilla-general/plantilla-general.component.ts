/* tslint:disable:no-inferrable-types */
import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlantillaGeneral} from '../../../model/plantillaGeneral.model';
import {FirebaseEstudianteService} from '../../Servicios/firebase-estudiante.service';
import {DynamicHostDirective} from '../directivas/dynamic-host.directive';
import {DinamicFileContainerComponent} from '../dinamic/dinamic-file-container/dinamic-file-container.component';

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
  @ViewChild(DynamicHostDirective) public dynamicHost: DynamicHostDirective | undefined;
  carreraActual: string = 'None';
  private documentos: Documento[] =
    [{titulo: 'hola', descripcion: 'soy un coponente dinamico', url: 'https://www.google.com/'}];
  datosSolicitudPractica: FormGroup;
  documentosGenerales: FormGroup;
  datosEstudianteEtapa: FormGroup;
  segundaEtapa: FormGroup;
  terseraEtapa: FormGroup;
  cuartaEtapa: FormGroup;
  private files: File [] = [];
  constructor(private _formBuilder: FormBuilder,
              private afStudent: FirebaseEstudianteService, private comFacResol: ComponentFactoryResolver)
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
      Archivo: [],
    });
    // tslint:disable-next-line:new-parens
  }

  ngOnInit(): void
  {
    /* asi se puedne setear valores this.primeraEtapa.patchValue({Nombres: 'juan' , Apellidos: 'rodiguez' });*/
  }
  public createComponent(): void
  {
    this.dynamicHost?.viewContainerRef.clear();
    console.log('holoa');
    /* extraido de
    https://stackoverflow.com/questions/39280057/how-do-you-use-input-with-components-created-with-a-componentfactoryresolver*/
    let reff: ComponentRef<DinamicFileContainerComponent>[] | undefined = [];
    this.documentos.forEach((documento: Documento) => {
      const component = this.comFacResol.resolveComponentFactory(DinamicFileContainerComponent);
      const contt = this.dynamicHost?.viewContainerRef.createComponent(component);
      contt?.instance.setValues(documento.titulo, documento.descripcion, documento.url);
      // @ts-ignore
      reff.push(contt);
    });
  }
  enviar(): void
  {
    const plantilla: PlantillaGeneral =
       { nombreEstudiante: this.datosEstudianteEtapa.value.Nombres,
         apellidoEstudiante: this.datosEstudianteEtapa.value.Apellidos,
         carreraEstudiante: this.datosEstudianteEtapa.value.Carrera,
         numeroMatricula : this.datosEstudianteEtapa.value.NumeroMatricula,
         runEstudiante: this.datosEstudianteEtapa.value.Run,
         numeroContactoEstudiante: this.datosEstudianteEtapa.value.NumeroContacto,
         correoEstudiante: this.datosEstudianteEtapa.value.CorreoElectronico,
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
         archivoConsentimiento: ' ', // revisar bien.
         // fin ( por el momento)
         estado: 'Pendiente', // aprobado,rechazado,en revision
     };
    console.log(plantilla);
    this.afStudent.upSolicitud(this.files[0], plantilla);
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
