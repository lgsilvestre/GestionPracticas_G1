import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { PieChartComponent } from "./pie-chart/pie-chart.component";
import { GraficoCircularEncCarreraComponent } from './grafico-circular-enc-carrera/grafico-circular-enc-carrera.component';
import { GraficoSolicitudEncCarreraComponent } from './grafico-solicitud-enc-carrera/grafico-solicitud-enc-carrera.component';


@NgModule({
  declarations: [
    BarChartComponent,
    PieChartComponent,
    GraficoCircularEncCarreraComponent,
    GraficoSolicitudEncCarreraComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
  ],
  exports: [
    BarChartComponent,
    PieChartComponent,
    GraficoCircularEncCarreraComponent,
    GraficoSolicitudEncCarreraComponent,
  ]
})
export class GraficosModule{}
