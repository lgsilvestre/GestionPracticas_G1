import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../Servicios/autenticacion.service';

@Component({
	selector: 'app-menu-admin-general',
	templateUrl: './menu-admin-general.component.html',
	styleUrls: ['./menu-admin-general.component.css', '../../../app.component.css']
})
export class MenuAdminGeneralComponent implements OnInit 
{
    adminGeneral: JSON;

	constructor(private autenticacionService: AutenticacionService) 
    {
        this.adminGeneral = JSON.parse(localStorage.getItem('user')+'');
	}

	ngOnInit(): void 
    {

	}

}
