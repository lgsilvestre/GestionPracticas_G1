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
import {ArchivoFormContainerComponent} from '../archivo-form-container/archivo-form-container.component';
import {DynamicHostFormDirective} from '../../directivas/dynamic-host-form.directive';
import {DialogSubirFormularioComponent} from '../dialog-subir-formulario/dialog-subir-formulario.component';

@Component({
  selector: 'app-gestion-archivos',
  templateUrl: './gestion-archivos.component.html',
  styleUrls: ['./gestion-archivos.component.css', '../../../../app.component.css']
})
export class GestionArchivosComponent implements OnInit
{
  @ViewChild(DynamicHostDirective, { static: true }) public dynamicHostInformativos: DynamicHostDirective | undefined;
  @ViewChild(DynamicHostFormDirective, { static: true }) public dynamicHostFromularios: DynamicHostFormDirective | undefined;
  archivos: ArchivoInformativoModel[] = [];
  constructor(private comFacResol: ComponentFactoryResolver,
              private gestionArchivosGenerales: GestionarArchivosGeneralesService,
              public dialog: MatDialog){ }
  ngOnInit(): void
  {
    this.gestionArchivosGenerales.getInformativelFiles().subscribe(files => {
      this.dynamicHostInformativos?.viewContainerRef.clear();
      files.forEach(file => {
        console.log('file ' + file.id);
        const component = this.comFacResol.resolveComponentFactory(ArchivosInformativoComponent);
        const contt = this.dynamicHostInformativos?.viewContainerRef.createComponent<ArchivosInformativoComponent>(component)?.
        instance.setValues(file.id, file.nombre, file.textoInformativo, file.urlArchivo, file.filename);
      });
    });
    this.gestionArchivosGenerales.getFomulariolFiles().subscribe( formuFiles => {
      this.dynamicHostFromularios?.viewContainerRef.clear();
      formuFiles.forEach( fileForm => {
        const  componnet = this.comFacResol.resolveComponentFactory(ArchivoFormContainerComponent);
        const contenido = this.dynamicHostFromularios?.viewContainerRef
          .createComponent<ArchivoFormContainerComponent>(componnet)?.
          instance
          .setValues(
            fileForm.id,
            fileForm.nombre,
            fileForm.textoInformativo,
            fileForm.urlOriginal,
            fileForm.urlArchivoEstuduante,
            fileForm.filename
          );
      });
    });
    this.gestionArchivosGenerales.updateGeneralFiles();
  }
  // tslint:disable-next-line:use-lifecycle-interface
  public createComponent(): void
  {
    this.dialog.open(DialogCrearArchivoinformativoComponent);
  }
  public upLoadForm(): void
  {
    this.dialog.open(DialogSubirFormularioComponent);
  }

}
