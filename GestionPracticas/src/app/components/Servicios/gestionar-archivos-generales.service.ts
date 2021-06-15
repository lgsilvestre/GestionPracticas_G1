import { Injectable } from '@angular/core';
import {ArchivoInformativoModel} from '../../model/archivoInformativo.model';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatDialog} from '@angular/material/dialog';
import {ErrorComponent} from '../dialogs/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class GestionarArchivosGeneralesService
{
  private archivos$ = new BehaviorSubject<ArchivoInformativoModel[]>([]);
  archivos: ArchivoInformativoModel[] = [];

  constructor(private storage: AngularFireStorage,
              private angularFireStore: AngularFirestore,
              public dialog: MatDialog)
  { }
  private addInformativeFile(archivo: ArchivoInformativoModel): void
  {
    this.archivos.push(archivo);
    this.archivos$.next(this.archivos);
  }
  updateGeneralFiles(): void
  {
    this.archivos = [];
    const docc = this.angularFireStore.collection<ArchivoInformativoModel>('DocumentosGenerales').get();
    docc.forEach( docc => {
      docc.forEach(dov => {
        const documentoAux: ArchivoInformativoModel = {
          id: dov.data().id,
          nombre: dov.data().nombre,
          textoInformativo: dov.data().textoInformativo,
          urlArchivo: dov.data().urlArchivo,
          visible: dov.data().visible,
          filename: dov.data().filename
        };
        this.archivos.push(documentoAux);
      });
    }).then( () => this.archivos$.next(this.archivos));
  }
  getGeneralFiles(): BehaviorSubject<ArchivoInformativoModel[]>
  {
    return this.archivos$;
  }
  public upLoadArchivoInformativo(file: File, archivoInformativo: ArchivoInformativoModel ): void
  {
    const filePath = 'ArchivosGenerales/' + archivoInformativo.nombre + '-' + file.lastModified;
    console.log(filePath + ' ' + file.type);
    archivoInformativo.filename = archivoInformativo.nombre + '-' + file.lastModified;
    const fileRef = this.storage.ref(filePath);
    const tarea = this.storage.upload(filePath, file);
    tarea.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( urlFile => {
          console.log('esxiss ' + urlFile.toString());
          if ( urlFile.toString() !== '')
          {
            archivoInformativo.urlArchivo = urlFile.toString();
            console.log('hola aaaa');
            this.addArchivoInformativo(archivoInformativo);
          }
          else
          {
            this.dialog.open(ErrorComponent, {
              data:
                {
                  titulo: 'Error al cargar archivo',
                  contenido: 'por un error inesperado nos e pudo guardar el archivo intente nuevamente'
                }
            });
          }
          });
      })
    ).subscribe();
  }
  private addArchivoInformativo(archivo: ArchivoInformativoModel): void
  {
    this.angularFireStore.collection('DocumentosGenerales')
      .add(archivo).then( reff => {
        archivo.id = reff.id;
        reff.set(archivo);
        this.addInformativeFile(archivo);
      });
  }
  private getFdocumentos(): void
  {
    const docc = this.angularFireStore.collection<ArchivoInformativoModel>('DocumentosGenerales').get();
    docc.forEach( docc => {
      docc.forEach(dov => {
        const reff = this.angularFireStore.doc('DocumentosGenerales/' + dov.id);
        console.log(dov.id);
        reff.delete();
      });
    });
  }
  public deleteFile(id: string, url: string): void
  {
    const filePath = 'ArchivosGenerales/';
    console.log(filePath);
    console.log(url);
    const fileRef = this.storage.ref(filePath).child(url);
    console.log('file reff' + fileRef.toString());
    const tarea = fileRef.delete();
    const reff = this.angularFireStore.doc('DocumentosGenerales/' + id);
    console.log(id);
    reff.delete();
    this.updateGeneralFiles();
    console.log(' salio bien ');
      // tslint:disable-next-line:only-arrow-functions
  }
}
