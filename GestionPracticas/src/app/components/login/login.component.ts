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
	hide         = true;
	mostrarAlert = false;
	datosUsuario: any;

	constructor(
		private afStore: AngularFirestore,
		private afAuth: AngularFireAuth,
		private router: Router,
		private formBuilder: FormBuilder,
		private ngZone: NgZone,
	) {
	}

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
	login() {
		this.afAuth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
			this.afStore.collection('Usuarios').get().forEach(res => {
				res.forEach(res => {
					this.mostrarAlert = false;
					const usuario: any = res.data();
					if (usuario.correo == this.loginForm.value.email) {

						localStorage.setItem('user', JSON.stringify(usuario));

						if (usuario.rol == 'administradorGeneral') {
							this.router.navigate(['./menu-admin-general']);
							console.log('hola');
						}
						if (usuario.rol == 'estudiante') {
							this.router.navigate(['./menu-estudiante']);
						}
					} else {
						console.log('no existe!');
					}
				});
			});
		})
		.catch((err) => {
			this.mostrarAlert = true;
			setTimeout(() => {this.setMostrarAlertToFalse()}, 3000);

		});
	}

	private setMostrarAlertToFalse()
	{
		this.mostrarAlert = false;
	}
}
