import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SolicitudPracticaService {
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  constructor(private angularFireStore: AngularFirestore)
  { }
}
