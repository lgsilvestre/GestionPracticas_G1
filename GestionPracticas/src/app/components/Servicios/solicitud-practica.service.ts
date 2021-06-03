/* tslint:disable:no-inferrable-types */
import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {SolicitudPracticaModel} from '../../model/solicitudPractica.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudPracticaService {
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  constructor(private angularFireStore: AngularFirestore)
  { }
  public addSolicitudPractica(nuevaSolicitud: SolicitudPracticaModel): void
  {
    console.log(nuevaSolicitud);
    this.angularFireStore.collection('SolicitudesPracticas').add(nuevaSolicitud).then(ref => {
      const referenciaSolicitud: string = ref.id;
      nuevaSolicitud.id = referenciaSolicitud;
      let correcto: boolean = false;
      ref.set(nuevaSolicitud).then( refff =>
        {
          this.user.etapaActual = 'solicitudePractica';
          this.user.estadoEtapaActual = 'Pendiente' ;
          let documentos: string[] = this.user.documentos;
          documentos.push( referenciaSolicitud);
          this.user.documentos = documentos;
          localStorage.setItem('user', JSON.stringify(this.user));
          correcto = true;
        }
      );
      const  reff = this.angularFireStore.doc('/Usuarios/estudiante/estudiantes/' + nuevaSolicitud.idUser);
      reff.set(this.user, {merge: true});
    });
  }
}
