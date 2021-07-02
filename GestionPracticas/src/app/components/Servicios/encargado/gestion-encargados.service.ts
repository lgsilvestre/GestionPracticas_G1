import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {EncargadoCarrera} from '../../../model/encargadoCarrera.model';

@Injectable({
  providedIn: 'root'
})
export class GestionEncargadosService {

  constructor(private afAutenticacion: AngularFireAuth, private afStore: AngularFirestore)
  {}
  private registrarUsuario(nuevoEncargado: EncargadoCarrera, password: string): Promise<any>
  {
    return new Promise((resolve, reject ) =>
    {
      this.afAutenticacion.createUserWithEmailAndPassword(nuevoEncargado.correoInstitucional , password)
        .then(userData => {
          resolve(userData),
          this.addEncargado(userData.user?.uid , nuevoEncargado );
          }).catch(err => console.log(reject(err)));
    });
  }
  private addEncargado(uID: string | undefined, nuevoEncargado: EncargadoCarrera): void
  {
    console.log(uID + ' addEn \n');
    if (typeof(uID) === undefined)
    {
      console.log('error uid is undefined');
    }
    else
    {
      const  reff = this.afStore.doc('/Usuarios/encargadoCarrera/encargadoCarrera/' + uID);
      console.log( 'reff' + reff.ref);
      reff.set(nuevoEncargado, {merge: true});
      // this.afStore.collection('/Usuarios/encargadoCarrera/encargadoCarrera/').add(nuevoEncargado);
    }
  }
  public crearNuevoEncargado(nuevoEncargado: EncargadoCarrera, password: string): void
  {
    this.registrarUsuario(nuevoEncargado, password).then((res) =>
    {}).catch( err => console.log('err', err.message));
  }
}
