import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SolicitudPracticaService} from '../../Servicios/solicitud-practica.service';
import {SolicitudPracticaModel} from '../../../model/solicitudPractica.model';

@Component({
  selector: 'app-solicitudud-practica',
  templateUrl: './solicitudud-practica.component.html',
  styleUrls: ['./solicitudud-practica.component.css', '../../../app.component.css']
})
export class SolicitududPracticaComponent implements OnInit {

  carreraActual = '';
  mostrar = false;
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  carreras: string[] = ['Ingeniería Civil en Computación', 'Ingeniería Civil Eléctrica', 'Ingeniería Civil Mecatrónica'];
  datosSolicitudPractica: FormGroup;
  constructor(private _formBuilder: FormBuilder , private solicitudService: SolicitudPracticaService)
  {
    this.datosSolicitudPractica = this._formBuilder.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Carrera: ['', Validators.required],
      NumeroMatricula: ['', Validators.required],
      Run: ['', Validators.required],
      CorreoElectronicoInstitucional: ['', Validators.required],
      NumeroTelefono: ['', Validators.required],
    });
  }

  ngOnInit(): void
  {
    this.datosSolicitudPractica.patchValue(
      {
        Nombres: this.user.nombres,
        Apellidos: this.user.apellidos,
        Run: this.user.run,
        NumeroMatricula: this.user.numeroMatricula,
        CorreoElectronicoInstitucional: this.user.correoInstitucional,
        NumeroTelefono: this.user.telefono
      });
  }
  onChangeCarrera(event: any): void
  {
    this.carreraActual = event;
  }
  sendSolicitud(): void
  {
    const solicitud: SolicitudPracticaModel =
      {
        id: '',
        nombres: this.datosSolicitudPractica.value.Nombres,
        apellidos: this.datosSolicitudPractica.value.Apellidos,
        run: this.datosSolicitudPractica.value.Run,
        carrera: this.carreraActual ,
        numeroMatricula: this.datosSolicitudPractica.value.NumeroMatricula,
        correoInstitucional: this.datosSolicitudPractica.value.CorreoElectronicoInstitucional,
        telefono: this.datosSolicitudPractica.value.NumeroTelefono,
        estado: 'Pendiente',
        feedBack: '',
    };
    this.solicitudService.addSolicitudPractica(solicitud);
  }
}
