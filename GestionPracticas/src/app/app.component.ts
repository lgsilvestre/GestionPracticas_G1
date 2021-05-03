import { Component } from '@angular/core';
declare let alertify: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	public title: String = "Sistema de Gestión de Prácticas de la Universidad de Talca";
	constructor() {
	}
}
