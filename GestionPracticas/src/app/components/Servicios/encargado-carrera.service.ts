import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Practica } from 'src/app/model/practica.model';
declare let alertify: any;

@Injectable({
    providedIn: 'root'
})
export class EncargadoCarreraService {


    constructor(private db: AngularFirestore) {

    }

    /**
     * 
     * @param coleccion la coleccion de la solicitud correspondiente
     * @param carrera 
     * @returns trae todos los datos. Este método lo accede el admin general.
     */
    public load_data_visualizar_practica(coleccion : string, carrera: string) {
        //return this.db.firestore.collection(coleccion).where("carrera", "==", carrera).get();
        return this.db.firestore.collection(coleccion).get();
    }
    /**
     * 
     * @param coleccion 
     * @param carrera 
     * @returns trae sólo datos correspondiente a la carrera que pertenece el encargado de carrera.
     */
    public load_data_visualizar_practica_encargado(coleccion : string, carrera: string) {
        return this.db.firestore.collection(coleccion).where("carrera", "==", carrera).get();
    }

    /**
     * 
     * @param idSolicitud 
     * @param coleccion la colección de la solicitud correspondiente
     * @returns 
     */
    public update_solicitud(idSolicitud: string, coleccion: string) {
        return this.db.firestore.collection(coleccion).doc(idSolicitud);
    }



}
