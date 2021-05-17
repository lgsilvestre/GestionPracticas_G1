import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {EncargadoCarrera} from '../../model/encargadoCarrera.model';
import {Estudiante} from '../../model/estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService
{

  constructor( private afAutenticacion: AngularFireAuth, private afStore: AngularFirestore)
  {
  }
}
