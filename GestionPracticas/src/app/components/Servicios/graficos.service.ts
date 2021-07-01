import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GraficosService {

  constructor(private afStore: AngularFirestore) { }

  //Solicitudes de practica

  //Metodo que obtiene el total de solicitud de practicas aprobadas en general
  obtenerInformacionSolicitudPracticasAprobadas(){
    return this.afStore.collection('SolicitudesPracticas', referencia => referencia
    .where('estado','==','Aprobado'));
  }

  //Metodo que obtiene el total de solicitud de practicas reprobadas en general
  obtenerInformacionSolicitudPracticasReprobadas(){
    return this.afStore.collection('SolicitudesPracticas', referencia => referencia
    .where('estado','==','Reprobado'));

  }

  //Metodo que obtiene el total de solicitudes de practicas pendientes en general
  obtenerInformacionSolicitudPracticasPendientes(){
    return this.afStore.collection('SolicitudesPracticas', referencia => referencia
    .where('estado','==','Pendiente'));
  }

  //Metodo que obtiene el total de solicitudes de practicas aprobadas de una carrera en especifico
  obtenerInformacionSolicitudPracticasAprobadasCarrera(carrera:string){
    return this.afStore.collection('SolicitudesPracticas', referencia => referencia
    .where('carrera','==',carrera)
    .where('estado','==','Aprobado')
    );
  }

  //Metodo que obtiene el total de solicitudes de practicas reprobadas de una carrera en especifico
  obtenerInformacionSolicitudPracticasReprobadasCarrera(carrera:string){
    return this.afStore.collection('SolicitudesPracticas', referencia => referencia
    .where('carrera','==',carrera)
    .where('estado','==','Reprobado')
    );
  }

  //Metodo que obtiene el total de solicitudes de practicas pendientes de una carrera en especifico
  obtenerInformacionSolicitudPracticasPendientesCarrera(carrera:string){
    return this.afStore.collection('SolicitudesPracticas', referencia => referencia
    .where('carrera','==',carrera)
    .where('estado','==','Pendiente')
    );
  }

  // Practicas.


  //Metodo que obtiene el total de practicas aprobadas en general
  obtenerInformacionPracticasAprobadas(){
    return this.afStore.collection('Solicitudes', referencia => referencia
    .where('estado','==','Aprobado'));
  }

  //Metodo que obtiene el total de practicas reprobadas en general
  obtenerInformacionPracticasReprobadas(){
    return this.afStore.collection('Solicitudes', referencia => referencia
    .where('estado','==','Reprobado'));

  }

  //Metodo que obtiene el total de practicas pendientes en general
  obtenerInformacionPracticasPendientes(){
    return this.afStore.collection('Solicitudes', referencia => referencia
    .where('estado','==','Pendiente'));
  }

  //Metodo que obtiene el total de practicas aprobadas de una carrera en especifico
  obtenerInformacionPracticasAprobadasCarrera(carrera:string){
    return this.afStore.collection('Solicitudes', referencia => referencia
    .where('carrera','==',carrera)
    .where('estado','==','Aprobado')
    );
  }

  //Metodo que obtiene el total de practicas reprobadas de una carrera en especifico
  obtenerInformacionPracticasReprobadasCarrera(carrera:string){
    return this.afStore.collection('Solicitudes', referencia => referencia
    .where('carrera','==',carrera)
    .where('estado','==','Reprobado')
    );
  }

  //Metodo que obtiene el total de practicas pendientes de una carrera en especifico
  obtenerInformacionPracticasPendientesCarrera(carrera:string){
    return this.afStore.collection('Solicitudes', referencia => referencia
    .where('carrera','==',carrera)
    .where('estado','==','Pendiente')
    );
  }


}
