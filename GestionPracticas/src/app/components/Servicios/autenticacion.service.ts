import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Usuario} from '../../model/usuario.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {EncargadoCarrera} from '../../model/encargadoCarrera.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService
{

  constructor( private afAutenticacion: AngularFireAuth, private afStore: AngularFirestore)
  {
  }
  /*
  el metodo crear nuevo usuario es el metodo disponible para crear nuevos usuarios usando el servicio.
   */
  public crearNuevoUsuario(nuevoUsuario: EncargadoCarrera, password: string): void
  {
    this.registrarUsuario(nuevoUsuario, password).then((res) =>
    {
      this.addUsuario(nuevoUsuario);
    }).catch( err => console.log('err', err.message));
  }
  /*
  el metodo registrarUsuario añade la convinacion de mail y password al sistema de autenticacion de firebase
   */
  private registrarUsuario(nuevoUsuario: EncargadoCarrera, password: string): Promise<any>
  {
    return new Promise((resolve, reject ) =>
    {
      this.afAutenticacion.createUserWithEmailAndPassword(nuevoUsuario.correInstitucional, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }
  /*
  addUsuario agrega a la colleccion de Usuarios el nuevo usuario.
   */
  public addUsuario(nuevoEncargado: EncargadoCarrera): void
  {
    this.afStore.collection('/Usuarios/encargadoCarrera/encargadoCarrera').add(nuevoEncargado);
  }
}
