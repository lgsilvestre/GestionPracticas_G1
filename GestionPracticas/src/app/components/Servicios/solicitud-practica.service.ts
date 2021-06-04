/* tslint:disable:no-inferrable-types */
import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {SolicitudPracticaModel} from '../../model/solicitudPractica.model';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudPracticaService {
  constructor(private angularFireStore: AngularFirestore, private locaSTF: LocalStorageService)
  {}
  public addSolicitudPractica(nuevaSolicitud: SolicitudPracticaModel): void
  {
    console.log(nuevaSolicitud);
    this.angularFireStore.collection('SolicitudesPracticas').add(nuevaSolicitud).then(ref => {
      const referenciaSolicitud: string = ref.id;
      nuevaSolicitud.id = referenciaSolicitud;
      let correcto: boolean = false;
      ref.set(nuevaSolicitud).then( refff =>
        {
          this.locaSTF.setEtapaActual('solicitudePractica');
          this.locaSTF.setEstadoEtapaActual('Pendiente');
          let documentos: string[] = this.locaSTF.getDocumentos();
          // si existiera otra referencia deberia eliminarse, por tiempo no lo programo ahora
          documentos[0] = referenciaSolicitud;
          this.locaSTF.setDocumentos(documentos);
          correcto = true;
        }
      );
    });
  }
}
