import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlantillaGeneral} from '../../../model/plantillaGeneral.model';
import {FirebaseEstudianteService} from '../../Servicios/firebase-estudiante.service';

@Component({
  selector: 'app-plantilla-general',
  templateUrl: './plantilla-general.component.html',
  styleUrls: ['./plantilla-general.component.css']
})
export class PlantillaGeneralComponent implements OnInit {

   primeraEtapa: FormGroup;
   segundaEtapa: FormGroup;
   terseraEtapa: FormGroup;
   cuartaEtapa: FormGroup;
  private files: File [] = [];
  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder, private afStudent: FirebaseEstudianteService)
  {
    this.primeraEtapa = this._formBuilder.group({
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
      FechaInicio: ['', Validators.required],
      FechaFin: ['', Validators.required],
      HoraInicio: ['', Validators.required],
      HoraFin: ['', Validators.required],
      Jornada: ['', Validators.required],
      Archivo: ['', Validators.required],
    });
    // tslint:disable-next-line:new-parens
  }

  ngOnInit(): void
  {
    /* asi se puedne setear valores this.primeraEtapa.patchValue({Nombres: 'juan' , Apellidos: 'rodiguez' });*/
  }
  enviar(): void
  {
    const plantilla: PlantillaGeneral =
       { nombreEstudiante: this.primeraEtapa.value.Nombres,
         apellidoEstudiante: this.primeraEtapa.value.Apellidos,
         carreraEstudiante: this.primeraEtapa.value.Carrera,
         numeroMatricula : this.primeraEtapa.value.NumeroMatricula,
         runEstudiante: this.primeraEtapa.value.Run,
         numeroContactoEstudiante: this.primeraEtapa.value.NumeroContacto,
         correoEstudiante: this.primeraEtapa.value.CorreoElectronico,
         contactoEmergencia: this.primeraEtapa.value.ContactoEmergencia,
         telefonoEmergencia: this.primeraEtapa.value.TelefonoEmergencia,
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
         fechaInicio: this.cuartaEtapa.value.FechaInicio,
         fechaTermino: this.cuartaEtapa.value.FechaFin,
         horaInicio: this.cuartaEtapa.value.HoraInicio,
         horaTermino: this.cuartaEtapa.value.HoraFin,
         duracionJorada: this.cuartaEtapa.value.Jornada,
         archivoConsentimiento: ' ', // revisar bien.
         // fin ( por el momento)
         estado: 'Pendiente', // aprobado,rechazado,en revision
     };
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
     console.log(this.primeraEtapa.value.Archivo.name);
   }
   onFileChange(event: any): void
  {
      console.log(event.target.files[0]);
      this.files.push(event.target.files[0]);
  }

}
