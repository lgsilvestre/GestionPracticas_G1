import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {AdministradorGeneral} from '../../../model/administradorGeneral.model';
declare let alertify: any;


@Injectable({
  providedIn: 'root'
})
export class GestionAdminGeneralService 
{


  constructor(private afAutenticacion: AngularFireAuth, private afStore: AngularFirestore)
  {
  }

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
    if (typeof(uID) === undefined)
    {
      console.log('error uid is undefined');
    }
    else
    {
      const  reff = this.afStore.doc('/Usuarios/administrador/administradores/' + uID);
      reff.set(nuevoAdminGeneral, {merge: true});
    }
  }
  public gestionAdminGeneral(nuevoAdminGeneral: AdministradorGeneral, password: string): void
  {
    this.registrarUsuario(nuevoAdminGeneral, password).then((res) =>
    {}).catch( err => console.log('err', err.message));
  }

  
  public crearCuentaEstudiante(correoEstudiante: string, password: string)
  {
    return this.afAutenticacion.createUserWithEmailAndPassword(correoEstudiante, password);
  }

  public insertarEstudiante(estudiante: any)
  {
    return this.afStore.collection("Usuarios").doc("estudiante").collection("estudiantes").add(estudiante);
  }

}
