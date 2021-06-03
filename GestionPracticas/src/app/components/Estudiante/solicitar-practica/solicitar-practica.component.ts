import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
	selector: 'app-solicitar-practica',
	templateUrl: './solicitar-practica.component.html',
	styleUrls: ['./solicitar-practica.component.css', '../../../app.component.css']
})
export class SolicitarPracticaComponent implements OnInit {

	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;

	constructor(private _formBuilder: FormBuilder) {
		this.firstFormGroup = this._formBuilder.group({
			firstCtrl: ['', Validators.required]
		});
		this.secondFormGroup = this._formBuilder.group({
			secondCtrl: ['', Validators.required]
		});
	}

	ngOnInit(): void {
	}

}
