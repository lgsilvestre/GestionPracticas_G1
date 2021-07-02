import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {PlantillaGeneral} from '../../model/plantillaGeneral.model';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseEstudianteService
{
  private filePath: any;
  private URLFile: Observable<string> | undefined;
  constructor(private angularFireStore: AngularFirestore, private storage: AngularFireStorage) { }
  public upSolicitud(pantilla: PlantillaGeneral): void
  {
    this.upLoadFile( pantilla );
  }
  private addSolicitudPractica(plantilla: PlantillaGeneral): void
  {
    console.log('llegamos');
    console.log(plantilla);
    this.angularFireStore.collection('Solicitudes').add(plantilla);
  }
  private upLoadFile( plantilla: PlantillaGeneral): void
  {
    this.addSolicitudPractica(plantilla);
  }
}
