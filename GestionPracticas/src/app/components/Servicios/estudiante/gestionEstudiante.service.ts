import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Estudiante} from '../../../model/estudiante.model';
@Injectable({
  providedIn: 'root'
})
export class GestionEstudianteService {

  constructor(private afAutenticacion: AngularFireAuth, private afStore: AngularFirestore)
  {
    afAutenticacion.useDeviceLanguage();
  }
  private registrarUsuario(nuevoEstudiante: Estudiante, password: string): Promise<any>
  {
    return new Promise((resolve, reject ) =>
    {
      this.afAutenticacion.createUserWithEmailAndPassword(nuevoEstudiante.correoInstitucional , password)
        .then(userData => {
            userData.user?.sendEmailVerification();
          resolve(userData),
            this.addEstuadiante(userData.user?.uid , nuevoEstudiante );
        }).catch(err => console.log(reject(err)));
    });
  }
  private addEstuadiante(uID: string | undefined, nuevoEstudiante: Estudiante): void
  {
    console.log(uID + ' addEn \n');
    if (typeof(uID) === undefined)
    {
      console.log('error uid is undefined');
    }
    else
    {
      const  reff = this.afStore.doc('/Usuarios/estudiante/estudiantes/' + uID);
      console.log( 'reff: ', reff.ref);
      reff.set(nuevoEstudiante, {merge: true});
    }
  }
  public crearNuevoEstudiante(nuevoEstudiante: Estudiante, password: string): void
  {
    this.registrarUsuario(nuevoEstudiante, password).then((res) =>
    {}).catch( err => console.log('err', err.message));
  }
}
