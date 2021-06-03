import { Component, OnInit, Inject } from '@angular/core';

import {
	MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
	selector: 'app-dialogo-practica',
	templateUrl: './dialogo-practica.component.html',
	styleUrls: ['./dialogo-practica.component.css', '../../../app.component.css']
})
export class DialogoPracticaComponent implements OnInit {

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
	}

	ngOnInit(): void {
	}

}
