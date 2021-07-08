import { Injectable, OnInit } from '@angular/core';
import { Carrera } from 'src/app/model/carreras.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PlanEstudios } from 'src/app/model/planEstudios.model';

@Injectable({
  providedIn: 'root'
})

export class GestionCarreraService implements OnInit
{

  carreras: Carrera[]= [];
  planesEstudios: any[] = [];

  constructor(private afStore: AngularFirestore)
  { }

  ngOnInit(): void {
    console.log("holiii");
  }

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

      this.eliminarMasivamentePlanEstudio(id);
  }

  addPlanEstudio(planEstudio:any){
    const planEstudioNuevo = {
      ...planEstudio,
    }
    const itemDoc = this.afStore.collection<PlanEstudios>(`PlanesCarreras`);
    itemDoc.add(planEstudioNuevo);
  }

  getPlanesEstudios()
  {
    return this.afStore.collection<PlanEstudios>('PlanesCarreras').valueChanges({idField:'id'});
  }

  getPlanEstudio(idCarrera:string)
  {
      return this.afStore.collection<PlanEstudios>('PlanesCarreras', datos=> datos
      .where("id", "==", idCarrera));
  }

  eliminarMasivamentePlanEstudio(idCarrera:string){
    const itemDoc = this.afStore.doc<PlanEstudios>(`PlanesCarreras/${idCarrera}`);
    itemDoc.delete();
  }

  eliminarPlanEstudio(nombre:string){
    const itemDoc = this.afStore.collection<PlanEstudios>(`PlanesCarreras`).doc(nombre);
    if(itemDoc != null){
      itemDoc.delete();
    }

  }

}
