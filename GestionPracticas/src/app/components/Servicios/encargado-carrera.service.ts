import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Practica } from 'src/app/model/practica.model';


@Injectable({
  providedIn: 'root'
})
export class EncargadoCarreraService {


  constructor(private db: AngularFirestore) {
    
  }

  public load_data_visualizar_practica() {
    return this.db.firestore.collection("Solicitudes").get();
  }

  public editar_estado_solicitud(idSolicitud: string) {
    var solicitudRef = this.db.firestore.collection("Solicitudes").doc(idSolicitud);


  }

}
