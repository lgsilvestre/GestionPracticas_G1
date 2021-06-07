import { Injectable } from '@angular/core';
import { Carrera } from 'src/app/model/carreras.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class GestionCarreraService 
{

  carreras: Carrera[]= [];

  constructor(private afStore: AngularFirestore ) { }

  getCarreras()
  {}

  addCarreras(carrera: Carrera)
  {
    const carrera_nueva= {
      ...carrera,
    }

    const itemDoc= this.afStore.collection<Carrera>(`Carreras`);
    itemDoc.add(carrera_nueva);
  }
}
