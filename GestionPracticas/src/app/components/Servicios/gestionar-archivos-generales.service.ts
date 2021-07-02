import { Injectable } from '@angular/core';
import {ArchivoInformativoModel} from '../../model/archivoInformativo.model';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatDialog} from '@angular/material/dialog';
import {ErrorComponent} from '../dialogs/error/error.component';
import {ArchivoFormularioModel} from '../../model/archivoFormulario.model';

@Injectable({
  providedIn: 'root'
})
export class GestionarArchivosGeneralesService
{
  private archivosInformativos$ = new BehaviorSubject<ArchivoInformativoModel[]>([]);
  private archivosFormularios$ = new BehaviorSubject<ArchivoFormularioModel[]>([]);
  archivosInformativos: ArchivoInformativoModel[] = [];
  archivosFormularios: ArchivoFormularioModel[] = [];

  constructor(private storage: AngularFireStorage,
              private angularFireStore: AngularFirestore,
              public dialog: MatDialog)
  { }
  private addInformativeFile(archivo: ArchivoInformativoModel): void
  {
    this.archivosInformativos.push(archivo);
    this.archivosInformativos$.next(this.archivosInformativos);
  }
  private addFormularioFile(formulario: ArchivoFormularioModel): void
  {
    this.archivosFormularios.push(formulario);
    this.archivosFormularios$.next(this.archivosFormularios);
  }
  updateGeneralFiles(): void
  {
    this.archivosInformativos = [];
    const docc = this.angularFireStore
      .collection<ArchivoInformativoModel>('/DocumentosGenerales/DocumentosInformativos/DocumentosInformativos').get();
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
        this.archivosInformativos.push(documentoAux);
      });
    }).then( () => this.archivosInformativos$.next(this.archivosInformativos));
    this.archivosFormularios = [];
    const doc2 = this.angularFireStore
      .collection<ArchivoFormularioModel>('/DocumentosGenerales/DocumentosFormularios/DocumentosFormularios').get();
    doc2.forEach( docc2 => {
      docc2.forEach(dovv => {
        const documentoAux: ArchivoFormularioModel = {
          id: dovv.data().id,
          nombre: dovv.data().nombre,
          textoInformativo: dovv.data().textoInformativo,
          urlOriginal: dovv.data().urlOriginal,
          visible: dovv.data().visible,
          filename: dovv.data().filename,
          urlArchivoEstuduante: dovv.data().urlArchivoEstuduante
        };
        this.archivosFormularios.push(documentoAux);
      });
    }).then( () => this.archivosFormularios$.next(this.archivosFormularios));
  }
  getInformativelFiles(): BehaviorSubject<ArchivoInformativoModel[]>
  {
    return this.archivosInformativos$;
  }
  getFomulariolFiles(): BehaviorSubject<ArchivoFormularioModel[]>
  {
    return this.archivosFormularios$;
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
  public upLoadArchivoFormulario(file: File, formulario: ArchivoFormularioModel ): void
  {
    const filePath = 'ArchivosGenerales/' + formulario.nombre + '-' + file.lastModified;
    console.log(filePath + ' ' + file.type);
    formulario.filename = formulario.nombre + '-' + file.lastModified;
    const fileRef = this.storage.ref(filePath);
    const tarea = this.storage.upload(filePath, file);
    tarea.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( urlFile => {
          console.log('esxiss ' + urlFile.toString());
          if ( urlFile.toString() !== '')
          {
            formulario.urlOriginal = urlFile.toString();
            console.log('hola aaaa');
            this.addArchivoFormulario(formulario);
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
    this.angularFireStore.collection('/DocumentosGenerales/DocumentosInformativos/DocumentosInformativos')
      .add(archivo).then( reff => {
        archivo.id = reff.id;
        reff.set(archivo);
        this.addInformativeFile(archivo);
      });
  }
  private addArchivoFormulario(formulario: ArchivoFormularioModel): void
  {
    this.angularFireStore.collection('/DocumentosGenerales/DocumentosFormularios/DocumentosFormularios')
      .add(formulario).then( reff => {
      formulario.id = reff.id;
      reff.set(formulario);
      this.addFormularioFile(formulario);
    });
  }
  // /DocumentosGenerales/DocumentosFormularios/DocumentosFormularios
  // este metodo borra los documentos que esten en la ruta
  private getFdocumentos(): void
  {
    const docc = this.angularFireStore
      .collection<ArchivoInformativoModel>('/DocumentosGenerales/DocumentosInformativos/DocumentosInformativos').get();
    docc.forEach( docc => {
      docc.forEach(dov => {
        const reff = this.angularFireStore
          .doc('/DocumentosGenerales/DocumentosInformativos/DocumentosInformativos/' + dov.id);
        console.log(dov.id);
        reff.delete();
      });
    });
  }
  public deleteFile(id: string, urlRealNombreArchivo: string): void
  {
    const filePath = 'ArchivosGenerales/';
    const fileRef = this.storage.ref(filePath).child(urlRealNombreArchivo);
    const tarea = fileRef.delete();
    const reff = this.angularFireStore
      .doc('/DocumentosGenerales/DocumentosInformativos/DocumentosInformativos/' + id);
    reff.delete();
    this.updateGeneralFiles();
    console.log(' salio bien ');
      // tslint:disable-next-line:only-arrow-functions
  }
}
