import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor( private afAutenticacion : AngularFireAuth)
  {
  }
  private registrarUsuario(): void
  {}
}
