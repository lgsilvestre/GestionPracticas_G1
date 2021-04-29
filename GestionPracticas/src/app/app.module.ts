import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
/**
 * Firebase
 */
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from '@angular/fire'
import { environment } from '../environments/environment';

/**
 * Fin importaciones firebase
 */

import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavComponent } from './components/sidenav/sidenav.component';

// imports de modulos creados para modularizar.

import { EstudianteModule } from './components/Estudiante/estudiante.module';
import { AdminGeneralModule } from './components/AdministradorGeneral/adminGeneral.module';
import { EncargadoCarreraModule } from './components/EncargadoCarrera/encargadoCarrera.module';
import { SuperAdminModule } from './components/SuperAdministrador/superAdmin.module';
import { MaterialModule } from './material/material.module';
import { GraficosModule } from './components/Graficos/graficos.module';
import { LoginComponent } from './components/login/login.component';
import { EditarCuentaComponent } from './components/editar-cuenta/editar-cuenta.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoginComponent,
    EditarCuentaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,

    //Modulos de firebase
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,

    // Modulos de roles de universidad
    EstudianteModule,
    AdminGeneralModule,
    EncargadoCarreraModule,
    SuperAdminModule,

    // modulo de graficos
    GraficosModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
