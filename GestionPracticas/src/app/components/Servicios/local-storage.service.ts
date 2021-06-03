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
  private uidSubject$ = new Subject<string>();
  private uid: string = '';
  private user: any = '';
  constructor()
  {

  }
  public setUID(uid: string): void
  {
    this.uid = uid;
    this.uidSubject$.next(this.uid);
  }
  public setUser(user: any): void
  {
    this.user = user;
    this.userSubject$.next(this.user);
  }

  public getUser$(): Observable<any>
  {
      return this.userSubject$.asObservable();
  }
  public getUid(): Observable<string>
  {
    return this.uidSubject$.asObservable();
  }
}
