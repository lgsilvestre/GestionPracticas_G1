import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class EncargadoCarreraService {

  constructor(private db: AngularFirestore) { }

  public load_data_visualizar_practica()
  {
    return this.db.firestore.collection("Solicitudes").get();
  }

}
