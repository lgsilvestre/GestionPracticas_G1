import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GraficosService {

  constructor(private afStore: AngularFirestore) { }

  //Metodo que obtiene el total de practicas aprobadas en general
  obtenerInformacionPracticasAprobadas(){
    return this.afStore.collection('SolicitudesPracticas', referencia => referencia
    .where('estado','==','Aprobado'));
  }

  //Metodo que obtiene el total de practicas reprobadas en general
  obtenerInformacionPracticasReprobadas(){
    return this.afStore.collection('SolicitudesPracticas', referencia => referencia
    .where('estado','==','Reprobado'));

  }

  //Metodo que obtiene el total de practicas pendientes en general
  obtenerInformacionPracticasPendientes(){
    return this.afStore.collection('SolicitudesPracticas', referencia => referencia
    .where('estado','==','Pendiente'));
  }

  //Metodo que obtiene el total de practicas aprobadas de una carrera en especifico
  obtenerInformacionPracticasAprobadasCarrera(carrera:string){
    return this.afStore.collection('SolicitudesPracticas', referencia => referencia
    .where('carrera','==',carrera)
    .where('estado','==','Aprobado')
    );
  }

  //Metodo que obtiene el total de practicas reprobadas de una carrera en especifico
  obtenerInformacionPracticasReprobadasCarrera(carrera:string){
    return this.afStore.collection('SolicitudesPracticas', referencia => referencia
    .where('carrera','==',carrera)
    .where('estado','==','Reprobado')
    );
  }

  //Metodo que obtiene el total de practicas pendientes de una carrera en especifico
  obtenerInformacionPracticasPendientesCarrera(carrera:string){
    return this.afStore.collection('SolicitudesPracticas', referencia => referencia
    .where('carrera','==',carrera)
    .where('estado','==','Pendiente')
    );
  }


}
