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
  private registrarUsuario(correoInstitucional: string, password: string): Promise<any>
  {
    return new Promise((resolve, reject ) =>
    {
      this.afAutenticacion.createUserWithEmailAndPassword(correoInstitucional , password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }
  public addEncargado(nuevoEncargado: EncargadoCarrera): void
  {
    this.afStore.collection('/Usuarios/encargadoCarrera/encargadoCarrera').add(nuevoEncargado);
  }
  public crearNuevoEncargado(nuevoEncargado: EncargadoCarrera, password: string): void
  {
    this.registrarUsuario(nuevoEncargado.correoInstitucional, password).then((res) =>
    {
      this.addEncargado(nuevoEncargado);
    }).catch( err => console.log('err', err.message));
  }
}
