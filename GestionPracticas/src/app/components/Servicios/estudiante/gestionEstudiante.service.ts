import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Estudiante} from '../../../model/estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class GestionEstudianteService {

  constructor(private afAutenticacion: AngularFireAuth, private afStore: AngularFirestore)
  {}
  private registrarUsuario(correoInstitucional: string, password: string): Promise<any>
  {
    return new Promise((resolve, reject ) =>
    {
      this.afAutenticacion.createUserWithEmailAndPassword(correoInstitucional , password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }
  private addEstudiante(nuevoEstudiante: Estudiante): void
  {
    this.afStore.collection('/Usuarios/estudiante/estudiantes').add(nuevoEstudiante);
  }
  public crearNuevoEstudiante(nuevoEstudiante: Estudiante, password: string): void
  {
    this.registrarUsuario(nuevoEstudiante.correoInstitucional, password).then((res) =>
    {
      this.addEstudiante(nuevoEstudiante);
    }).catch( err => console.log('err', err.message));
  }
}
