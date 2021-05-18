/* tslint:disable:no-inferrable-types */
import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../app.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  roles: string[] = ['Estudiante', 'Encargado de Carrera', 'Administrador General'];
  rolActual: string = 'None';
  datosUsuario: any;
  constructor(
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    ) {}
  loginForm = this.formBuilder.group({
    rol: ['', Validators.required],
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
  onChangeRol(event: any): void
  {
    this.rolActual = event;
  }
  login(): void {
    this.afAuth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
      let ruta: string = 'error';
      let goTo: string = 'error';
      switch (this.rolActual)
      {
        case 'Estudiante':
          ruta = '/Usuarios/estudiante/estudiantes';
          goTo = './menu-estudiante';
          break;
        case 'Encargado de Carrera':
          ruta = '/Usuarios/encargadoCarrera/encargadoCarrera';
          goTo = './menu-encargado-carrera';
          break;
        case 'Administrador General':
          ruta = '/Usuarios/administrador/administradores';
          goTo = './menu-admin-general';
          break;
        default:
          console.log(ruta);
      }
      this.afStore.collection(ruta).get().forEach(res => {
        res.forEach(res => {
          const usuario: any = res.data();
          if (usuario.correo == this.loginForm.value.email) {
            localStorage.setItem('user', JSON.stringify(usuario));
            this.router.navigate([goTo]);
            console.log('hola');
          } else {
            console.log('no existe!');
          }
        });
      });
    });
  }
}
