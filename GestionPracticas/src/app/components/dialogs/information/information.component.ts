import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataModel } from '../../../model/dialogData.model';

@Component({
	selector: 'app-information',
	templateUrl: './information.component.html',
	styleUrls: ['./information.component.css', '../../../app.component.css']
})
export class InformationComponent implements OnInit {

	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataModel) { }

	ngOnInit(): void {
	}

}
