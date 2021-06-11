import {
	Component,
	ComponentFactoryResolver,
	OnInit,
	ViewChild
} from '@angular/core';
import { ArchivoInformativoModel } from '../../../../model/archivoInformativo.model';
import { DynamicHostDirective } from '../../directivas/dynamic-host.directive';
import { ArchivosInformativoComponent } from '../archivos-informativo/archivos-informativo.component';
import { GestionarArchivosGeneralesService } from '../../../Servicios/gestionar-archivos-generales.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCrearArchivoinformativoComponent } from '../dialog-crear-archivoinformativo/dialog-crear-archivoinformativo.component';

@Component({
	selector: 'app-gestion-archivos',
	templateUrl: './gestion-archivos.component.html',
	styleUrls: ['./gestion-archivos.component.css', '../../../../app.component.css']
})
export class GestionArchivosComponent implements OnInit {

	@ViewChild(DynamicHostDirective, { static: true }) public dynamicHost: DynamicHostDirective | undefined;
	archivos: ArchivoInformativoModel[] = [];
	constructor(private comFacResol: ComponentFactoryResolver,
		private gestionArchivosGenerales: GestionarArchivosGeneralesService,
		public dialog: MatDialog) { }

	ngOnInit(): void {
		this.gestionArchivosGenerales.getGeneralFiles().subscribe(files => {
			files.forEach(file => {
				console.log('file ' + file.id);
				const component = this.comFacResol.resolveComponentFactory(ArchivosInformativoComponent);
				const contt = this.dynamicHost?.viewContainerRef.createComponent<ArchivosInformativoComponent>(component)?.
					instance.setValues(file.id, file.nombre, file.textoInformativo, file.urlArchivo);
			});
		});
		this.gestionArchivosGenerales.updateGeneralFiles();
	}
	// tslint:disable-next-line:use-lifecycle-interface

	public createComponent(): void {
		this.dialog.open(DialogCrearArchivoinformativoComponent);
	}

}
