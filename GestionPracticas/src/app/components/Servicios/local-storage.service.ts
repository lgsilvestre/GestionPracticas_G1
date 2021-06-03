/* tslint:disable:no-inferrable-types */
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService
{
  private userSubject$ = new Subject<any>();
  private etapaActualSubject$ = new Subject<string>();
  private documentosSubject$ = new Subject<string[]>();
  private estadoEtapaActualSubject$ = new Subject<string>();
  private uid: string | undefined = '';
  private user: any = '';
  private etapaActual: string = '';
  private estadoEtapaActual: string = '';
  constructor()
  {

  }
  public setUID(uid: string | undefined): void
  {
    this.uid = uid;
    localStorage.setItem('userUID', JSON.stringify(uid));
  }
  public setUser(user: any): void
  {
    this.user = user;
    this.etapaActual = this.user.etapaActual;
    this.estadoEtapaActual = this.user.estadoEtapaActual;
    this.userSubject$.next(this.user);
    this.documentosSubject$.next(this.user.documentos);
    this.etapaActualSubject$.next(this.etapaActual);
    this.estadoEtapaActualSubject$.next(this.estadoEtapaActual);
    localStorage.setItem('user', JSON.stringify(this.user));
  }
  public getEtapaActual$(): Observable<string>
  {
    return this.etapaActualSubject$.asObservable();
  }
  public getEstadoEtapaActual$(): Observable<string>
  {
    return this.estadoEtapaActualSubject$.asObservable();
  }
  public getUid(): string | undefined
  {
    return this.uid;
  }
  public getNombres(): string
  {
    return this.user.nombres;
  }
  public getApellidos(): string
  {
    return this.user.apellidos;
  }
  public getRol(): string
  {
    return this.user.rol;
  }
  public setEtapaActual(etapa: string): void
  {
    this.user.etapaActual = etapa;
    this.etapaActualSubject$.next(this.user.etapaActual);
    localStorage.setItem('user', JSON.stringify(this.user));
  }
  public setEstadoEtapaActual(estado: string): void
  {
    this.user.estadoEtapaActual = estado;
    this.estadoEtapaActualSubject$.next(this.user.estadoEtapaActual);
    localStorage.setItem('user', JSON.stringify(this.user));
  }
  public getObservableDocuments(): Observable<string[]>
  {
    return this.documentosSubject$.asObservable();
  }
  public getDocumentos(): string[]
  {
    return this.user.documentos;
  }
  public setDocumentos(documentos: string[]): void
  {
    this.user.documentos = documentos;
    this.userSubject$.next(this.user);
    this.documentosSubject$.next(this.user.documentos);
    localStorage.setItem('user', JSON.stringify(this.user));
  }
  public getUser(): any
  {
    return this.user;
  }
  public getRun(): string
  {
    return this.user.run;
  }
  public getNumeroMatricula(): number
  {
    return this.user.numeroMatricula;
  }
  public getCorreoElectronicoInstitucional(): string
  {
    return this.user.correoInstitucional;
  }
  public getNumeroTelefono(): string
  {
    return this.user.telefono;
  }

}
