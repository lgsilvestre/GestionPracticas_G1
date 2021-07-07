import { Injectable } from '@angular/core';
import {Practica} from '../../model/practica.model';
import {BehaviorSubject} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PracticaService {
  practica: Practica;
  private practica$: BehaviorSubject<Practica>;
  constructor(
    private locaSTF: LocalStorageService,
    private storage: AngularFireStorage,
    private angularFireStore: AngularFirestore,
  )
  {
    this.practica = this.createEmptyPractica();
    this.practica$ = new BehaviorSubject<Practica>(this.practica);
    this.cargarPractica();
  }
  private cargarPractica(): void
  {
    if (this.locaSTF.getEtapaActual$().getValue() === 'Practica')
    {
      if (this.locaSTF.getDocumentos()[2])
      {
        const refPractica: string = this.locaSTF.getDocumentos()[2];
        const ref = this.angularFireStore.collection<Practica>('/Practicas/').doc(refPractica);
        ref.ref.get().then( documento => {
          if (documento.exists)
          {
            const practica = documento.data();
            if (practica)
            {
              const nuevaPractica: Practica = {
                apellidoEstudiante: practica.apellidoEstudiante,
                apellidoTutor: practica.apellidoTutor,
                areaTutor: practica.areaTutor,
                calificacion: practica.calificacion,
                carreraEstudiante: practica.carreraEstudiante,
                contactoEmergencia: practica.contactoEmergencia,
                contactoTutor: practica.contactoTutor,
                correoEmpresa: practica.correoEmpresa,
                correoEstudiante: practica.correoEstudiante,
                correoTutor: practica.correoTutor,
                direccionEmpresa: practica.direccionEmpresa,
                duracionJorada: practica.duracionJorada,
                estadoDePractica: practica.estadoDePractica,
                fechaInicio: practica.fechaInicio,
                fechaTermino: practica.fechaTermino,
                horaInicio: practica.horaInicio,
                horaTermino: practica.horaTermino,
                id: practica.id,
                idUser: practica.idUser,
                nombreEmpresa: practica.nombreEmpresa,
                nombreEstudiante: practica.nombreEstudiante,
                nombreTutor: practica.nombreTutor,
                numeroContactoEstudiante: practica.numeroContactoEstudiante,
                numeroMatricula: practica.numeroMatricula,
                numeroPractica: practica.numeroPractica,
                puestoTutor: practica.puestoTutor,
                retroalimentacion: practica.retroalimentacion,
                runEstudiante: practica.runEstudiante,
                runTutor: practica.runTutor,
                rutEmpresa: practica.rutEmpresa,
                telefonoEmergencia: practica.telefonoEmergencia,
                telefonoEmpresa: practica.telefonoEmpresa,
                urlEvaluacionEmpresa: practica.urlEvaluacionEmpresa,
                urlInformePractica: practica.urlInformePractica,
                urlSeguroDePractica: practica.urlSeguroDePractica
              };
              this.practica = practica;
              this.practica$.next(this.practica);
            }
            else
            {
              console.log('paso algo al obtener los datos');
            }
          }
          else
          {
            console.log('el documento no existe');
          }
        }).catch( error => {
          console.log('error obtener el documento de firebase');
          console.log(error);
        });
      }
    }
  }
  public actualizarPractica( nuevaPractica: Practica): void
  {
    const ref = this.angularFireStore.collection<Practica>('/Practicas/').doc(nuevaPractica.id);
    ref.set( nuevaPractica, { merge: true }).then(succses => {
      if (this.locaSTF.getEstadoEtapaActual() !== nuevaPractica.estadoDePractica)
      {
        this.locaSTF.setEstadoEtapaActual(nuevaPractica.estadoDePractica);
      }
      this.practica = nuevaPractica;
      this.practica$.next(this.practica);
      console.log('practica actualizada correctamente');
    }).catch(( error: any) => {
      console.log('la pantilla existe pero no se cargo actualizo y F');
      console.log(error);
    });
  }
  public getPractica(): Practica
  {
    return this.practica;
  }
  public subirSeguroPractica(seguro: File): void
  {}
  public subirInformePractica(informe: File): void
  {}
  public subirEvaluacionEmpresa(evaluacionEmpresa: File): void
  {}
  private createEmptyPractica(): Practica
  {
    const practica: Practica = {
      urlEvaluacionEmpresa: ' ',
      urlInformePractica: ' ',
      urlSeguroDePractica: ' ',
      apellidoEstudiante: ' ',
      apellidoTutor: ' ',
      areaTutor: ' ',
      calificacion: ' ',
      carreraEstudiante: ' ',
      contactoEmergencia: ' ',
      contactoTutor: ' ',
      correoEmpresa: ' ',
      correoEstudiante: ' ',
      correoTutor: ' ',
      direccionEmpresa: ' ',
      duracionJorada: 0,
      estadoDePractica: ' ',
      fechaInicio: new Date(),
      fechaTermino: new Date(),
      horaInicio: ' ',
      horaTermino: ' ',
      id: ' ',
      idUser: ' ',
      nombreEmpresa: ' ',
      nombreEstudiante: ' ',
      nombreTutor: ' ',
      numeroContactoEstudiante: ' ',
      numeroMatricula: ' ',
      numeroPractica: ' ',
      puestoTutor: ' ',
      retroalimentacion: ' ',
      runEstudiante: ' ',
      runTutor: ' ',
      rutEmpresa: ' ',
      telefonoEmergencia: ' ',
      telefonoEmpresa: ' '
    };
    return practica;
  }
}
