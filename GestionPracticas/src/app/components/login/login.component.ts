/* tslint:disable:no-inferrable-types */
import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Estudiante} from '../../model/estudiante.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  datosUsuario: any;
  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    ) {}
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.ngZone.run(() => {
          this.router.navigate(['./login']);
        });
      }
    });
  }
  login(): void {
    this.afAuth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(( userCredential ) => {
      const userUID = userCredential.user?.uid;
      const isStudent = this.afStore.collection<Estudiante>('/Usuarios/estudiante/estudiantes').doc(userUID);
      const isEncargado = this.afStore.collection('/Usuarios/encargadoCarrera/encargadoCarrera').doc(userUID);
      const isAdminGeneral = this.afStore.collection('/Usuarios/administrador/administradores').doc(userUID);
      let encontrado: boolean = false;
      isStudent.ref.get().then(
        (doc) =>
        {
          if (doc.exists)
          {
            /* usar ternarias y esto queda joya */
            const userData: any = doc.data();
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('userUID', JSON.stringify(userUID));
            this.router.navigate(['./menu-estudiante']);
            console.log(userData?.rol);
            encontrado = true;
          }
        }
      );
      isEncargado.ref.get().then(
        (doc) =>
        {
          if (doc.exists)
          {
            const userData: any = doc.data();
            localStorage.setItem('user', JSON.stringify(userData));
            this.router.navigate(['./menu-encargado-carrera']);
            console.log(userData?.rol);
            encontrado = true;
          }
        }
      );
      isAdminGeneral.ref.get().then(
        (doc) =>
        {
          if (doc.exists)
          {
            const userData: any = doc.data();
            localStorage.setItem('user', JSON.stringify(userData));
            this.router.navigate(['./menu-admin-general']);
          }
        }
      );
    });
  }
}
