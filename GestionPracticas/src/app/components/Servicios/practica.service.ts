import { Injectable } from '@angular/core';
import {Practica} from '../../model/practica.model';
import {BehaviorSubject} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {finalize} from 'rxjs/operators';

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
                nombreArchivoEvaluacionEmpresa: practica.nombreArchivoEvaluacionEmpresa,
                nombreArchivoInformePractica: practica.nombreArchivoInformePractica,
                nombreArchivoseguro: practica.nombreArchivoseguro,
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
  {
    const filename = 'seguro' + this.practica.numeroMatricula + '-' + this.locaSTF.getNombres() +
      this.locaSTF.getApellidos() + '-' + this.practica.numeroPractica;
    const filePath = '/ArchivosPracticas/seguros/' + filename;
    console.log('filePath');
    console.log(filePath + ' ' + seguro.type);
    const fileRef = this.storage.ref(filePath); // creamos al referencia al archivo
    const tarea = this.storage.upload(filePath, seguro);
    tarea.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlFile => {
          console.log('esxiss ' + urlFile.toString());
          if (urlFile.toString() !== '') // uhna vez ya se subio ela rchivo y tenemos la url
          {
            const archivoAnterior = this.practica.nombreArchivoseguro;
            // con el nombre se puede eliminar
            this.practica.urlSeguroDePractica = urlFile;
            this.practica.nombreArchivoseguro = filename;
            this.actualizarPractica(this.practica);
          }
          else
          {
            console.log('error al subir seguro de:' + this.locaSTF.getNumeroMatricula());
          }
        });
      }));
  }
  public subirInformePractica(informe: File): void
  {
    const filename = 'informe' + this.practica.numeroMatricula + '-' + this.locaSTF.getNombres() +
      this.locaSTF.getApellidos() + '-' + this.practica.numeroPractica;
    const filePath = '/ArchivosPracticas/informes/' + filename;
    console.log('filePath');
    console.log(filePath + ' ' + informe.type);
    const fileRef = this.storage.ref(filePath); // creamos al referencia al archivo
    const tarea = this.storage.upload(filePath, informe);
    tarea.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlFile => {
          console.log('esxiss ' + urlFile.toString());
          if (urlFile.toString() !== '') // uhna vez ya se subio ela rchivo y tenemos la url
          {
            const archivoAnterior = this.practica.nombreArchivoInformePractica;
            // con el nombre se puede eliminar
            this.practica.urlInformePractica = urlFile;
            this.practica.nombreArchivoInformePractica = filename;
            this.actualizarPractica(this.practica);
          }
          else
          {
            console.log('error al subir informe practica');
          }
        });
      }));
  }
  public subirEvaluacionEmpresa(evaluacionEmpresa: File): void
  {
    const filename = 'evaluacionEmpresa' + this.practica.numeroMatricula + '-' + this.locaSTF.getNombres() +
      this.locaSTF.getApellidos() + '-' + this.practica.numeroPractica;
    const filePath = '/ArchivosPracticas/evaluaciones/' + filename;
    console.log('filePath');
    console.log(filePath + ' ' + evaluacionEmpresa.type);
    const fileRef = this.storage.ref(filePath); // creamos al referencia al archivo
    const tarea = this.storage.upload(filePath, evaluacionEmpresa);
    tarea.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlFile => {
          console.log('esxiss ' + urlFile.toString());
          if (urlFile.toString() !== '') // uhna vez ya se subio ela rchivo y tenemos la url
          {
            const archivoAnterior = this.practica.nombreArchivoEvaluacionEmpresa;
            // con el nombre se puede eliminar
            this.practica.urlEvaluacionEmpresa = urlFile;
            this.practica.nombreArchivoEvaluacionEmpresa = filename;
            this.actualizarPractica(this.practica);
          }
          else
          {
            console.log('error al subir evaluacion empresa');
          }
        });
      }));
  }
  private createEmptyPractica(): Practica
  {
    const practica: Practica = {
      nombreArchivoEvaluacionEmpresa: ' ',
      nombreArchivoInformePractica: ' ',
      nombreArchivoseguro: ' ',
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
