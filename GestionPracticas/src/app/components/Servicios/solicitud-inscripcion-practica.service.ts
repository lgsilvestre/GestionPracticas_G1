import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {LocalStorageService} from './local-storage.service';
import {PlantillaGeneral} from '../../model/plantillaGeneral.model';
import {MatDialog} from '@angular/material/dialog';
import {SuccessComponent} from '../dialogs/success/success.component';

@Injectable({
  providedIn: 'root'
})
export class SolicitudInscripcionPracticaService {

  constructor(private angularFireStore: AngularFirestore,
              private locaSTF: LocalStorageService,
              public dialog: MatDialog)
  {}
  upDocumentoFormularioEstudiante(): void
  {
    const documentos = this.locaSTF.getDocumentos();
    if (documentos.length < 2)
    {
      // creamoa la referencia
      const nuevaplantilla = this.createunfinishedForm();
      this.createSolicitudPractica(nuevaplantilla);
    }
    else
    {
      if (typeof documentos[1] === 'string')
      {
        console.log(documentos[1]);
        const ref = this.angularFireStore.collection<PlantillaGeneral>('/Solicitudes').doc(documentos[1]);
        ref.ref.get().then( (doc) => {
          if (doc.exists)
          {
            const plantilla = doc.data();
            plantilla?.archivos.push('hola');
            if (plantilla) {
              ref.set(plantilla, {merge: true});
            }
          }
        });


      }
      else
      {
        console.log('este si es un error');
      }
    }
  }
  private createunfinishedForm(): PlantillaGeneral
  {
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

  private createSolicitudPractica(plantilla: PlantillaGeneral): void
  {
    console.log('llegamos');
    console.log(plantilla);
    this.angularFireStore.collection('Solicitudes').add(plantilla).then( ref => {
      const referenciaSolicitud: string = ref.id;
      plantilla.id = referenciaSolicitud;
      ref.set(plantilla).then( ok => {
        this.dialog.open(SuccessComponent, {
          data:
            {
              titulo: 'Solicitud creada exitosa mente',
              contenido: 'la solicitud fue creada exitosamente y su estado es: ' + plantilla.estado
            }
        });
        const documentos = this.locaSTF.getDocumentos();
        documentos[1] = referenciaSolicitud;
        this.locaSTF.setDocumentos(documentos);
      }).catch( erro => {
        console.log('algo paso');
      });
    });
  }
}
