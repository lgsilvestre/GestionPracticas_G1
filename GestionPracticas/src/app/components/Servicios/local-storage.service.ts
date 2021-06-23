/* tslint:disable:no-inferrable-types */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
	private userSubject$ = new BehaviorSubject<any>('');
	private etapaActualSubject$ = new BehaviorSubject<string>('ninguna');
	private documentosSubject$ = new BehaviorSubject<string[]>([]);
	private estadoEtapaActualSubject$ = new BehaviorSubject<string>('ninguno');
	private uid: string | undefined = '';
	private user: any = '';
	private etapaActual: string = '';
	private estadoEtapaActual: string = '';
	constructor(private angularFireStore: AngularFirestore) {

	}
	public reloadUser(): void {
		this.user = JSON.parse(localStorage.getItem('user') || '{}');
		this.userSubject$.next(this.user);
		this.etapaActual = this.user.etapaActual;
		this.estadoEtapaActual = this.user.estadoEtapaActual;
		this.documentosSubject$.next(this.user.documentos);
		this.etapaActualSubject$.next(this.etapaActual);
		this.estadoEtapaActualSubject$.next(this.estadoEtapaActual);
	}
	public setUID(uid: string | undefined): void {
		this.uid = uid;
		localStorage.setItem('userUID', JSON.stringify(uid));
	}
	public setUser(user: any): void {
		this.user = user;
		this.etapaActual = this.user.etapaActual;
		this.estadoEtapaActual = this.user.estadoEtapaActual;
		this.userSubject$.next(this.user);
		this.documentosSubject$.next(this.user.documentos);
		this.etapaActualSubject$.next(this.etapaActual);
		this.estadoEtapaActualSubject$.next(this.estadoEtapaActual);
		localStorage.setItem('user', JSON.stringify(this.user));
		/* comente la siguente linea porque no es nesesario por ahor, dependera del contexto */
		// this.actualizarFirebaseStore();
	}
	public getEtapaActual$(): BehaviorSubject<string> {
		return this.etapaActualSubject$;
	}
	public getEstadoEtapaActual$(): BehaviorSubject<string> {
		return this.estadoEtapaActualSubject$;
	}
	public getUid(): string | undefined {
		return this.uid;
	}
	public getNombres(): string {
		console.log('user');
		console.log(this.user);
		return this.user.nombres;
	}
	public getApellidos(): string {
		return this.user.apellidos;
	}
	public getRol(): string {
		return this.user.rol;
	}
	public setEtapaActual(etapa: string): void {
		this.user.etapaActual = etapa;
		this.etapaActualSubject$.next(this.user.etapaActual);
		localStorage.setItem('user', JSON.stringify(this.user));
		this.actualizarFirebaseStore();
	}
	public setEstadoEtapaActual(estado: string): void {
		this.user.estadoEtapaActual = estado;
		this.estadoEtapaActualSubject$.next(this.user.estadoEtapaActual);
		localStorage.setItem('user', JSON.stringify(this.user));
		this.actualizarFirebaseStore();
	}
	public getObservableDocuments(): Observable<string[]> {
		return this.documentosSubject$.asObservable();
	}
	public getDocumentos(): string[] {
		return this.user.documentos;
	}
	public setDocumentos(documentos: string[]): void {
		this.user.documentos = documentos;
		this.userSubject$.next(this.user);
		this.documentosSubject$.next(this.user.documentos);
		localStorage.setItem('user', JSON.stringify(this.user));
		this.actualizarFirebaseStore();
	}
	public getCarrera(): string {
		return this.user.carrera;
	}
	public getRun(): string {
		return this.user.run;
	}
	public getNumeroMatricula(): number {
		return this.user.numeroMatricula;
	}
	public getCorreoElectronicoInstitucional(): string {
		return this.user.correoInstitucional;
	}
	public getNumeroTelefono(): string {
		return this.user.telefono;
	}
	private actualizarFirebaseStore(): void {
		const reff = this.angularFireStore.doc('/Usuarios/estudiante/estudiantes/' + this.uid);
		reff.set(this.user, { merge: true });
	}

}
