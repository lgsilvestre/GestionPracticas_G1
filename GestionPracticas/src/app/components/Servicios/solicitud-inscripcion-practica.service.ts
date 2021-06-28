import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {LocalStorageService} from './local-storage.service';
import {PlantillaGeneral} from '../../model/plantillaGeneral.model';
import {MatDialog} from '@angular/material/dialog';
import {SuccessComponent} from '../dialogs/success/success.component';
import {ArchivoFormularioModel} from '../../model/archivoFormulario.model';
import {GestionarArchivosGeneralesService} from './gestionar-archivos-generales.service';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {ErrorComponent} from '../dialogs/error/error.component';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class SolicitudInscripcionPracticaService
{
  private refFormEstudiantes: ArchivoFormularioModel[] = [];
  private archivosFormulariosEstudiante$ = new BehaviorSubject<ArchivoFormularioModel[]>([]);
  private plantillageneral: PlantillaGeneral;

  constructor(private angularFireStore: AngularFirestore,
              private storage: AngularFireStorage,
              private locaSTF: LocalStorageService,
              private generalDoc: GestionarArchivosGeneralesService,
              public dialog: MatDialog) {
    const documentos = this.locaSTF.getDocumentos();
    if (documentos.length < 2)
    {
      this.plantillageneral = this.createunfinishedForm();
    }
    else
    {
      this.plantillageneral = this.createunfinishedForm();
      this.cargarPlantillaGeneral(documentos[1]);
    }
  }
  private cargarModificacionesIncripcion(nuevaPlantilla: PlantillaGeneral): void
  {
    if (this.plantillageneral.id !== ' ')
    {
      const ref = this.angularFireStore.collection<PlantillaGeneral>('/Solicitudes').doc(this.plantillageneral.id);
      ref.set(nuevaPlantilla).then(succses => {
        console.log('plantilla actualizada correctamente');
      }).catch(( error: any) => {
        console.log('la pantilla existe pero no se cargo actualizo y F');
        console.log(error);
      });
    }
    else{
      console.log('no se creo nada porque la pantilla aun no se carga o no existe');
    }
  }
  private cargarPlantillaGeneral(referencia: string): void
  {
    let nuevaplantilla: PlantillaGeneral;
    const ref = this.angularFireStore.collection<PlantillaGeneral>('/Solicitudes').doc(referencia);
    ref.ref.get().then((doc) => {
      if (doc.exists) {
        const plantilla = doc.data();
        if (plantilla) {
            nuevaplantilla = {
            apellidoTutor: plantilla.apellidoTutor,
            apellidos: plantilla.apellidos,
            archivos: plantilla.archivos,
            areaTutor: plantilla.areaTutor,
            carrera: plantilla.carrera,
            contactoEmergencia: plantilla.contactoEmergencia,
            contactoTutor: plantilla.contactoTutor,
            correoEmpresa: plantilla.correoEmpresa,
            correoInstitucional: plantilla.correoInstitucional,
            correoTutor: plantilla.correoTutor,
            direccionEmpresa: plantilla.direccionEmpresa,
            duracionJorada: plantilla.duracionJorada,
            estado: plantilla.estado,
            fechaInicio: plantilla.fechaInicio,
            fechaTermino: plantilla.fechaTermino,
            horaInicio: plantilla.horaInicio,
            horaTermino: plantilla.horaTermino,
            id: plantilla.id,
            nombreEmpresa: plantilla.nombreEmpresa,
            nombreTutor: plantilla.nombreTutor,
            nombres: plantilla.nombres,
            numeroMatricula: plantilla.numeroMatricula,
            numeroPractica: plantilla.numeroPractica,
            puestoTutor: plantilla.puestoTutor,
            run: plantilla.run,
            runTutor: plantilla.runTutor,
            rutEmpresa: plantilla.rutEmpresa,
            telefono: plantilla.telefono,
            telefonoEmergencia: plantilla.telefonoEmergencia,
            telefonoEmpresa: plantilla.telefonoEmpresa
          };
            this.plantillageneral = nuevaplantilla;
            console.log('la pantilla existe y la carge');
        }
        else {
          nuevaplantilla = this.createunfinishedForm();
          this.plantillageneral = nuevaplantilla;
        }
      }
    });
  }
  getArchivosFormulariosEstudiante$(): BehaviorSubject<ArchivoFormularioModel[]>
  {
    return this.archivosFormulariosEstudiante$;
  }
  upDocumentoFormularioEstudiante(nuevoFormulario: ArchivoFormularioModel): void {
    const documentos = this.locaSTF.getDocumentos();
    if (documentos.length < 2) {
      // creamoa la referencia
      const nuevaplantilla = this.createunfinishedForm();
      this.createSolicitudPractica(nuevaplantilla);
    } else {
      if (typeof documentos[1] === 'string') {
        console.log(documentos[1]);

        this.cargarModificacionesIncripcion(this.plantillageneral);
      } else {
        console.log('este si es un error');
      }
    }
  }
  buscarYsiencuentraReemplazarFormulario(nuevoFormulario: ArchivoFormularioModel,
                                         file: File): void
  {
    // creamos el filename que no servira para crear el path del archivo
    nuevoFormulario.filename = nuevoFormulario.nombre + '-' + this.locaSTF.getNombres() +
      this.locaSTF.getApellidos() + '-' + file.lastModified;
    const filePath = '/ArchivosSolicitudes/' +  nuevoFormulario.filename;
    console.log(filePath + ' ' + file.type);
    const fileRef = this.storage.ref(filePath); // creamos al referencia al archivo
    const tarea = this.storage.upload(filePath, file);
    tarea.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( urlFile => {
          console.log('esxiss ' + urlFile.toString());
          if ( urlFile.toString() !== '') // uhna vez ya se subio ela rchivo y tenemos la url
          {
            nuevoFormulario.urlOriginal = urlFile.toString(); // asignamos la url y tenemos completo el formulario nuevo
            /* bueno en esta parte ya tenemos el nuevo formulario completo
            pudiendo pasar a agregar el formulario a la solicitud.
             */
            const archivos = this.plantillageneral.archivos;
            if (archivos)
            {
              const refFormEstudiantes = this.angularFireStore.collection<ArchivoFormularioModel>('/DocumentosFormulariosEstudiantes/');
              let encontrado = false;
              archivos.forEach( a => {
                refFormEstudiantes.doc(a).ref.get().then( succses => {
                  if (succses.data()?.nombre === nuevoFormulario.nombre)
                  {
                    // si lo encontramos lo reemplazamos.
                    succses.ref.set(nuevoFormulario).then(r => console.log('ok'));
                    encontrado = true;
                        // falta eliminar el archivo antiguo
                  }
                });
              });
              //amigo revisa lo de las prommesas y usalo aquie
              if (!encontrado)
              {
                this.angularFireStore.collection('/DocumentosFormulariosEstudiantes/')
                  .add(nuevoFormulario).then( reff => {
                    nuevoFormulario.id = reff.id;
                    archivos.push(nuevoFormulario.id);
                    reff.set(nuevoFormulario);
                  });
                ok.ref.get().then(plantilla => {
                      // aqui la agregamos
                    });
              }
            }
          else
          {
            this.dialog.open(ErrorComponent, {
              data:
                {
                  titulo: 'Error al cargar archivo',
                  contenido: 'por un error inesperado nos e pudo guardar el archivo intente nuevamente'
                }
            });
          }
        });
      })
    ).subscribe();
  }
  private createunfinishedForm(): PlantillaGeneral {
    const plantilla: PlantillaGeneral = {
      apellidoTutor: '',
      apellidos: '',
      archivos: [],
      areaTutor: '',
      carrera: '',
      contactoEmergencia: '',
      contactoTutor: '',
      correoEmpresa: '',
      correoInstitucional: '',
      correoTutor: '',
      direccionEmpresa: '',
      duracionJorada: 0,
      estado: 'incompleta',
      fechaInicio: new Date(),
      fechaTermino: new Date(),
      horaInicio: '',
      horaTermino: '',
      id: '',
      nombreEmpresa: '',
      nombreTutor: '',
      nombres: '',
      numeroMatricula: 0,
      numeroPractica: '',
      puestoTutor: '',
      run: '',
      runTutor: '',
      rutEmpresa: '',
      telefono: '',
      telefonoEmergencia: '',
      telefonoEmpresa: ''
    };
    return plantilla;
  }

  private createSolicitudPractica(plantilla: PlantillaGeneral): void {
    console.log('llegamos');
    console.log(plantilla);
    this.angularFireStore.collection('Solicitudes').add(plantilla).then(ref => {
      const referenciaSolicitud: string = ref.id;
      plantilla.id = referenciaSolicitud;
      ref.set(plantilla).then(ok => {
        this.locaSTF.setEtapaActual('inscripcionPractica');
        this.locaSTF.setEstadoEtapaActual('incompleta');
        this.dialog.open(SuccessComponent, {
          data:
            {
              titulo: 'Solicitud de inscripcion Creada',
              contenido: 'la solicitud fue creada exitosamente, recuerde llenar todos los campos, su estado es: ' + plantilla.estado
            }
        });
        const documentos = this.locaSTF.getDocumentos();
        documentos[1] = referenciaSolicitud;
        this.locaSTF.setDocumentos(documentos);
        this.plantillageneral = plantilla;
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  mapingFomFiles(): void {
    const mapFiles: Map<string, ArchivoFormularioModel> = new Map<string, ArchivoFormularioModel>();
    this.generalDoc.getFomulariolFiles().subscribe(files => {
      files.forEach(file => {
        mapFiles.set(file.nombre, file);
      });
      this.contrasmapp(mapFiles);
    });
  }
  private contrasmapp(mapFiles: Map<string, ArchivoFormularioModel>): void
  {
    console.log('mapFiles');
    console.log(mapFiles);
    const referenciaIdSolicitud: string = this.locaSTF.getDocumentos()[1];
    const plantillaref = this.angularFireStore.collection<PlantillaGeneral>('/Solicitudes/').doc(referenciaIdSolicitud);
    plantillaref.ref.get().then(datos => {
      if (datos.exists)
      {
        const files = datos.data()?.archivos || [];
        const fireref = this.angularFireStore.collection<ArchivoFormularioModel>('/DocumentosFormulariosEstudiantes');
        files.forEach(id => {
          fireref.doc(id).ref.get().then(
            data => {
              if (data.exists) {
                const documentoAux: ArchivoFormularioModel = {
                  id: data.data()?.id || '',
                  nombre: data.data()?.nombre || '',
                  textoInformativo: data.data()?.textoInformativo || '',
                  urlOriginal: data.data()?.urlOriginal || '',
                  visible: data.data()?.visible || false,
                  filename: data.data()?.filename || '',
                  urlArchivoEstuduante: data.data()?.urlArchivoEstuduante || ''
                };
                mapFiles.set(documentoAux.nombre, documentoAux);
              }
            });
        });
      }
    }).finally(() => {
      this.refFormEstudiantes = [];
      mapFiles.forEach((valor, clave) => {
        this.refFormEstudiantes.push(valor);
      });
      this.refFormEstudiantes.forEach(fille => {
        console.log(fille);
      });
      this.archivosFormulariosEstudiante$.next(this.refFormEstudiantes);
    });

  }
}
