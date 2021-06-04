import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.css', '../../app.component.css']
})
export class PageNotFoundComponent implements OnInit {
	rutaActual: string;

	constructor(private _location: Location, private router: Router, @Inject(DOCUMENT) document: any) {
		this.rutaActual = "";
	}

	ngOnInit(): void {
		this.rutaActual = document.location.href;
	}

	back_page() {
		this._location.back();
	}

}
