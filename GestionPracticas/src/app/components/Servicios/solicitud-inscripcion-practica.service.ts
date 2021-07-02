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
  private plantillageneral$: BehaviorSubject<PlantillaGeneral>;
  private mapFiles: Map<string, ArchivoFormularioModel>;

  constructor(private angularFireStore: AngularFirestore,
              private storage: AngularFireStorage,
              private locaSTF: LocalStorageService,
              private generalDoc: GestionarArchivosGeneralesService,
              public dialog: MatDialog) {
    this.mapFiles = new Map<string, ArchivoFormularioModel>();
    if (this.locaSTF.getRol() === 'estudiante')
    {
      const documentos = this.locaSTF.getDocumentos();
      if (documentos.length < 2)
      {
        this.plantillageneral = this.createunfinishedForm();
        this.plantillageneral$ = new BehaviorSubject<PlantillaGeneral>(this.plantillageneral);
        this.mapingFomFiles();
        console.log(this.plantillageneral.archivos.toString() + 'archivos < 2');
      }
      else
      {
        this.plantillageneral = this.createunfinishedForm();
        this.plantillageneral$ = new BehaviorSubject<PlantillaGeneral>(this.plantillageneral);
        this.cargarPlantillaGeneral(documentos[1]);
        console.log(this.plantillageneral.archivos.toString() + 'archivos >= 2');
      }
    }
    else
    {
      this.plantillageneral = this.createunfinishedForm();
      this.plantillageneral$ = new BehaviorSubject<PlantillaGeneral>(this.plantillageneral);
    }
  }
  public getIdsolicitudActual(): string
  {
    return this.plantillageneral.id;
  }
  public getRefArchivosPlantilla(): string[]
  {
    return this.plantillageneral.archivos;
  }
  private cargarModificacionesIncripcion(nuevaPlantilla: PlantillaGeneral): void
  {
    if (this.plantillageneral.id !== ' ')
    {
      console.log(this.plantillageneral.id);
      console.log(nuevaPlantilla.id);
      const ref = this.angularFireStore.collection<PlantillaGeneral>('/Solicitudes').doc(this.plantillageneral.id);
      ref.set(nuevaPlantilla, { merge: true }).then(succses => {
        if (this.locaSTF.getEstadoEtapaActual() !== nuevaPlantilla.estado)
        {
          console.log(nuevaPlantilla.estado + ' oooooo ');
          this.locaSTF.setEstadoEtapaActual(nuevaPlantilla.estado);
        }
        this.plantillageneral = nuevaPlantilla;
        this.plantillageneral$.next(this.plantillageneral);
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
  public subirSolicitudInscripcionPractica(nuevaPlantilla: PlantillaGeneral): void
  {
    this.cargarModificacionesIncripcion(nuevaPlantilla);
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
            console.log( 'id: ' + nuevaplantilla.id);
            console.log( 'run: ' + nuevaplantilla.run);
            console.log('la pantilla existe y la carge');
        }
        else {
          nuevaplantilla = this.createunfinishedForm();
          this.plantillageneral = nuevaplantilla;
        }
      }
    }).finally( () =>
    {
      this.plantillageneral$.next(this.plantillageneral);
      this.mapingFomFiles();
    });
  }
  getArchivosFormulariosEstudiante$(): BehaviorSubject<ArchivoFormularioModel[]>
  {
    return this.archivosFormulariosEstudiante$;
  }
  getPlantillageneral$(): BehaviorSubject<PlantillaGeneral>
  {
    return this.plantillageneral$;
  }
  upDocumentoFormularioEstudiante(nuevoFormulario: ArchivoFormularioModel, file: File): void {
    const documentos = this.locaSTF.getDocumentos();
    if (documentos.length < 2) {
      // creamoa la referencia
      const nuevaplantilla = this.createunfinishedForm();
      this.createSolicitudPractica(nuevaplantilla);
      this.buscarYsiencuentraReemplazarFormulario(nuevoFormulario, file);
    } else {
      if (typeof documentos[1] === 'string') {
        console.log(documentos[1]);
        this.buscarYsiencuentraReemplazarFormulario(nuevoFormulario, file);
      } else {
        console.log('este si es un error');
        this.dialog.open(ErrorComponent, {
          data:
            {
              titulo: 'este si es un error',
              contenido: 'tengo una referencia a algo que no existe'
            }
        });
      }
    }
  }
  private buscarYsiencuentraReemplazarFormulario(nuevoFormulario: ArchivoFormularioModel,
                                                 file: File): void
  {
    // creamos el filename que no servira para crear el path del archivo
    nuevoFormulario.filename = nuevoFormulario.nombre + '-' + this.locaSTF.getNombres() +
      this.locaSTF.getApellidos() + '-' + file.lastModified;
    const filePath = '/ArchivosSolicitudes/' +  nuevoFormulario.filename;
    console.log('filePath');
    console.log(filePath + ' ' + file.type);
    const fileRef = this.storage.ref(filePath); // creamos al referencia al archivo
    const tarea = this.storage.upload(filePath, file);
    tarea.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlFile => {
          console.log('esxiss ' + urlFile.toString());
          if (urlFile.toString() !== '') // uhna vez ya se subio ela rchivo y tenemos la url
          {
            nuevoFormulario.urlArchivoEstuduante = urlFile.toString(); // asignamos la url y tenemos completo el formulario nuevo
            /* bueno en esta parte ya tenemos el nuevo formulario completo
            pudiendo pasar a agregar el formulario a la solicitud.
             */
            // en la siguente linea obtenemso los archivos para resisar si el nuevo ya existe
            this.angularFireStore.collection('/DocumentosFormulariosEstudiantes/').add(nuevoFormulario).then( ok => {
              const referenciaSolicitud: string = ok.id;
              nuevoFormulario.id = referenciaSolicitud;
              ok.set(nuevoFormulario).then( refff =>
                {
                  this.mapFiles.set(nuevoFormulario.nombre, nuevoFormulario);
                  this.refFormEstudiantes = [];
                  const archivosRef: string[] = [];
                  this.mapFiles.forEach((valor, llave) => {
                    archivosRef.push(valor.id);
                    this.refFormEstudiantes.push(valor);
                  });
                  this.archivosFormulariosEstudiante$.next(this.refFormEstudiantes);
                  this.plantillageneral.archivos = archivosRef;
                  this.cargarModificacionesIncripcion(this.plantillageneral);
                  this.dialog.open(SuccessComponent, {
                    data:
                      {
                        titulo: 'archivo cargado correctamente',
                        contenido: 'el archivo se cargo correctamente'
                      }
                  });
                }
              );
            });
          } else {
              this.dialog.open(ErrorComponent, {
                data:
                  {
                    titulo: 'Error al cargar archivo',
                    contenido: 'por un error inesperado nos e pudo guardar el archivo intente nuevamente'
                  }
              });
            }
        });
      })).subscribe();
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

  public mapingFomFiles(): void {
    this.generalDoc.getFomulariolFiles().subscribe(files => {
      files.forEach(file => {
        this.mapFiles.set(file.nombre, file);
      });
      this.contrasmapp(this.mapFiles);
    });
  }
  private contrasmapp(mapFiles: Map<string, ArchivoFormularioModel>): void
  {
    console.log('mapFiles');
    console.log(mapFiles);
    const files = this.plantillageneral.archivos;
    console.log('files');
    console.log(this.plantillageneral.archivos.toString());
    const fireref = this.angularFireStore.collection<ArchivoFormularioModel>('/DocumentosFormulariosEstudiantes/');
    files.forEach(id => {
      console.log(id + 'id ');
      fireref.doc(id).ref.get().then(
        data => {
          console.log(data.exists + 'existe');
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
        })
        .finally(() => {
          console.log('mapFilesdespues');
          console.log(mapFiles);
          this.refFormEstudiantes = [];
          mapFiles.forEach((valor, clave) => {
            this.refFormEstudiantes.push(valor);
        });
          console.log(this.refFormEstudiantes.toString());
          this.archivosFormulariosEstudiante$.next(this.refFormEstudiantes);
        });
    });
  }
}
