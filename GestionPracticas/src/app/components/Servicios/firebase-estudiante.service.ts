import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {PlantillaGeneral} from '../../model/plantillaGeneral.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseEstudianteService
{

  constructor(private angularFireStore: AngularFirestore) { }
  addSolicitudPractica(plantilla: PlantillaGeneral): void
  {
    console.log('llegamos');
    console.log(plantilla);
    this.angularFireStore.collection('Plantilla').add(plantilla);
  }
}
