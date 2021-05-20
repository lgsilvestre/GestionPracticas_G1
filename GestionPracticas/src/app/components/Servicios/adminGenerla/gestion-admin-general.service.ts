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
  private registrarUsuario(nuevoAdminGeneral: AdministradorGeneral, password: string): Promise<any>
  {
    return new Promise((resolve, reject ) =>
    {
      this.afAutenticacion.createUserWithEmailAndPassword(nuevoAdminGeneral.correoInstitucional , password)
        .then(userData => {
          resolve(userData),
            this.addAddAdminGeneral(userData.user?.uid , nuevoAdminGeneral );
        }).catch(err => console.log(reject(err)));
    });
  }
  private addAddAdminGeneral(uID: string | undefined, nuevoAdminGeneral: AdministradorGeneral): void
  {
    console.log(uID + ' addEn \n');
    if (typeof(uID) === undefined)
    {
      console.log('error uid is undefined');
    }
    else
    {
      const  reff = this.afStore.doc('/Usuarios/administrador/administradores/' + uID);
      console.log( 'reff' + reff.ref);
      reff.set(nuevoAdminGeneral, {merge: true});
    }
  }
  public gestionAdminGeneral(nuevoAdminGeneral: AdministradorGeneral, password: string): void
  {
    this.registrarUsuario(nuevoAdminGeneral, password).then((res) =>
    {}).catch( err => console.log('err', err.message));
  }
}
