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
  public upSolicitud(file: File, pantilla: PlantillaGeneral): void
  {
    this.upLoadFile(file, pantilla);
  }
  private addSolicitudPractica(plantilla: PlantillaGeneral): void
  {
    console.log('llegamos');
    console.log(plantilla);
    this.angularFireStore.collection('Solicitudes').add(plantilla);
  }
  private upLoadFile(file: File, plantilla: PlantillaGeneral): void
  {
    this.filePath = 'ArchivosSolicitudes/' + plantilla.numeroMatricula + '-' + file.name;
    console.log(this.filePath + ' ' + file.type);
    const fileRef = this.storage.ref(this.filePath);
    const tarea = this.storage.upload(this.filePath, file);
    tarea.snapshotChanges().pipe(
      finalize(() => {
          fileRef.getDownloadURL().subscribe(urlFile => {
            this.URLFile = urlFile;
            plantilla.archivoConsentimiento = this.URLFile;
            this.addSolicitudPractica(plantilla);
          });
        })
    ).subscribe();
  }
}
