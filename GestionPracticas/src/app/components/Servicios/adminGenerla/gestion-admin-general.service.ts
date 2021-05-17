import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {AdministradorGeneral} from '../../../model/administradorGeneral.model';


@Injectable({
  providedIn: 'root'
})
export class GestionAdminGeneralService {

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
  private addAdministradorGeneral(nuevoAdministradorGeneral: AdministradorGeneral): void
  {
    this.afStore.collection('/Usuarios/administrador/administradores').add(nuevoAdministradorGeneral);
  }
  public crearNuevoAdminGeneral(nuevoAdminGeneral: AdministradorGeneral, password: string): void
  {
    this.registrarUsuario(nuevoAdminGeneral.correoInstitucional, password).then((res) =>
    {
      this.addAdministradorGeneral(nuevoAdminGeneral);
    }).catch( err => console.log('err', err.message));
  }
}
