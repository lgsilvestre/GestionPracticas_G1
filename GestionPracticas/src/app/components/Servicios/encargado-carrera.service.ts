import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Practica } from 'src/app/model/practica.model';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class EncargadoCarreraService {


  constructor(private db: AngularFirestore) {

  }

  public load_data_visualizar_practica() {
    return this.db.firestore.collection("Solicitudes").get();
  }


  public update_solicitud(idSolicitud: string) {
    return this.db.firestore.collection("Solicitudes").doc(idSolicitud);
  }

  // solicitud de practica.

  public load_data_solicitud_practica() {
    return this.db.firestore.collection("SolicitudesPracticas").get();
  }


  public update_solicitud_practica(idSolicitud: string) {
    return this.db.firestore.collection("SolicitudesPracticas").doc(idSolicitud);
  }


}
