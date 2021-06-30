import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-menu-admin-general',
	templateUrl: './menu-admin-general.component.html',
	styleUrls: ['./menu-admin-general.component.css', '../../../app.component.css']
})
export class MenuAdminGeneralComponent implements OnInit 
{
    adminGeneral: any;

	constructor() 
    {
        this.adminGeneral = {nombres:'', apellidos:''};
        let admin = JSON.parse(localStorage.getItem('user')+'');
        this.adminGeneral.nombres = admin.nombres;
        this.adminGeneral.apellidos = admin.apellidos;
	}

	ngOnInit(): void 
    {
	}

}
