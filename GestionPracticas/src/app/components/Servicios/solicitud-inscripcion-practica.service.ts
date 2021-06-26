import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {LocalStorageService} from './local-storage.service';
import {PlantillaGeneral} from '../../model/plantillaGeneral.model';
import {MatDialog} from '@angular/material/dialog';
import {SuccessComponent} from '../dialogs/success/success.component';
import {ArchivoFormularioModel} from '../../model/archivoFormulario.model';
import {GestionarArchivosGeneralesService} from './gestionar-archivos-generales.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudInscripcionPracticaService {

  private refFormEstudiantes: ArchivoFormularioModel[] = [];
  private archivosFormulariosEstudiante$ = new BehaviorSubject<ArchivoFormularioModel[]>([]);

  constructor(private angularFireStore: AngularFirestore,
              private locaSTF: LocalStorageService,
              private generalDoc: GestionarArchivosGeneralesService,
              public dialog: MatDialog) {}
  getArchivosFormulariosEstudiante$(): BehaviorSubject<ArchivoFormularioModel[]>
  {
    return this.archivosFormulariosEstudiante$;
  }
  upDocumentoFormularioEstudiante(): void {
    const documentos = this.locaSTF.getDocumentos();
    if (documentos.length < 2) {
      // creamoa la referencia
      const nuevaplantilla = this.createunfinishedForm();
      this.createSolicitudPractica(nuevaplantilla);
    } else {
      if (typeof documentos[1] === 'string') {
        console.log(documentos[1]);
        const ref = this.angularFireStore.collection<PlantillaGeneral>('/Solicitudes').doc(documentos[1]);
        ref.ref.get().then((doc) => {
          if (doc.exists) {
            const plantilla = doc.data();
            if (plantilla) {
              ref.set(plantilla, {merge: true});
            }
          }
        });
      } else {
        console.log('este si es un error');
      }
    }
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
