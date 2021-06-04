/* tslint:disable:no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SolicitudPracticaService} from '../../Servicios/solicitud-practica.service';
import {SolicitudPracticaModel} from '../../../model/solicitudPractica.model';
import {DialogElementsExampleDialogComponent} from '../../SuperAdministrador/dialog/dialog-elements-example-dialog/dialog-elements-example-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {LocalStorageService} from '../../Servicios/local-storage.service';

@Component({
  selector: 'app-solicitudud-practica',
  templateUrl: './solicitudud-practica.component.html',
  styleUrls: ['./solicitudud-practica.component.css', '../../../app.component.css']
})
export class SolicitududPracticaComponent implements OnInit {

  carreraActual = '';
  mostrar = false;
  carreras: string[] = ['Ingeniería Civil en Computación', 'Ingeniería Civil Eléctrica', 'Ingeniería Civil Mecatrónica'];
  datosSolicitudPractica: FormGroup;
  private etapaActual: string = '';
  private estadoEtapaActual: string = '';
  constructor(private _formBuilder: FormBuilder,
              private solicitudService: SolicitudPracticaService,
              public dialog: MatDialog,
              private locaSTF: LocalStorageService)
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
    this.datosSolicitudPractica.patchValue(
      {
        Nombres: this.locaSTF.getNombres(),
        Apellidos: this.locaSTF.getApellidos(),
        Run: this.locaSTF.getRun(),
        NumeroMatricula: this.locaSTF.getNumeroMatricula(),
        CorreoElectronicoInstitucional: this.locaSTF.getCorreoElectronicoInstitucional(),
        NumeroTelefono: this.locaSTF.getNumeroTelefono()
      });
  }

  ngOnInit(): void
  {
    this.locaSTF.getEtapaActual$().subscribe( etapa => {
      this.estadoEtapaActual = etapa;
    });
  }
  setEstado(sss: string): string
  {
    this.estadoEtapaActual = sss;
    return this.estadoEtapaActual;
  }
  onChangeCarrera(event: any): void
  {
    this.carreraActual = event;
  }
  sendSolicitud(): void
  {
    console.log('etapa: ' + this.etapaActual + ' estado: ' + this.estadoEtapaActual);
    if (this.etapaActual === 'ninguna' && this.estadoEtapaActual === 'ninguno')
    {
      const solicitud: SolicitudPracticaModel =
        {
          idUser: this.locaSTF.getUid() || '{error}',
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
    else
    {
      this.dialog.open(DialogElementsExampleDialogComponent);
    }
  }
}
