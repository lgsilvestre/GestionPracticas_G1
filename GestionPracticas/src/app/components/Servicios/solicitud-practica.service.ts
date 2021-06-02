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
      const referencia: string = ref.id;
      nuevaSolicitud.id = referencia;
      ref.set(nuevaSolicitud).then( refff =>
        {
          console.log('hola');
        }
      );
    });
  }
}
