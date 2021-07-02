import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';
import * as firebase from 'firebase';
import { filter } from 'rxjs/operators';
declare let alertify: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	fullscreenRoute: boolean = false;
	public title: String = "Sistema de Gestión de Prácticas de la Universidad de Talca";

	constructor(private router: Router,private afAuth: AngularFireAuth,private ngZone: NgZone) {
	}

	ngOnInit() {

		this.router.events.pipe(
			filter((event: any) => event instanceof NavigationEnd)).subscribe(event => {
			if (
				event.url === "/login" || event.url === "/"
			) {
				this.fullscreenRoute = true;
			} else {
				this.fullscreenRoute = false;
			}
		});
	}
}

