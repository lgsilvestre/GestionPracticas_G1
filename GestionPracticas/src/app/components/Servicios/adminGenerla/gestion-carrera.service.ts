import { Injectable } from '@angular/core';
import { Carrera } from 'src/app/model/carreras.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PlanEstudios } from 'src/app/model/planEstudios.model';

@Injectable({
  providedIn: 'root'
})

export class GestionCarreraService
{

  carreras: Carrera[]= [];
  planesEstudios: PlanEstudios[] = [];

  constructor(private afStore: AngularFirestore)
  { }

  getCarreras():Observable<Carrera[]>
  {
      return this.afStore.collection<Carrera>('Carreras').valueChanges({idField:'id'});
  }

  getCarrera(id:string)
  {
      return this.afStore.doc<Carrera>(`Carreras/${id}`).valueChanges({idField: 'id'});
  }

  addCarreras(carrera: Carrera)
  {
    const carrera_nueva= {
      ...carrera,
    }

    const itemDoc= this.afStore.collection<Carrera>(`Carreras`);
    itemDoc.add(carrera_nueva);
  }

  guardarCarrera(carrera:Carrera, id:string)
  {
      const itemDoc = this.afStore.doc<Carrera>(`Carreras/${id}`);

      itemDoc.update(carrera);
  }

  eliminarCarrera(id:string)
  {
      const itemDoc = this.afStore.doc<Carrera>(`Carreras/${id}`);

      itemDoc.delete()
  }

  addPlanEstudio(planEstudio:PlanEstudios){
    const planEstudioNuevo = {
      ...planEstudio,
    }
    const itemDoc = this.afStore.collection<PlanEstudios>(`PlanEstudio`);
    itemDoc.add(planEstudioNuevo);
  }

  getPlanesEstudios()
  {
    return this.afStore.collection<PlanEstudios>('PlanEstudio').valueChanges({idField:'id'});
  }

  getPlanEstudio(idCarrera:string)
  {
      return this.afStore.collection<PlanEstudios>('PlanEstudio', datos=> datos
      .where("id", "==", idCarrera));
  }

}
