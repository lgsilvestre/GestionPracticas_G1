import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

/**
 * Firebase
 */
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireModule } from '@angular/fire'
import { environment } from '../environments/environment';

/**
 * Fin importaciones firebase
 */

import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MenuAdminGeneralComponent } from './components/menu-admin-general/menu-admin-general.component';
import { MenuEstudianteComponent } from './components/menu-estudiante/menu-estudiante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './components/menu-estudiante/inicio/inicio.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    MenuAdminGeneralComponent,
    MenuEstudianteComponent,
    InicioComponent,
    BarChartComponent,
    PieChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
