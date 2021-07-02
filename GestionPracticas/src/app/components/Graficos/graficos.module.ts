import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { PieChartComponent } from "./pie-chart/pie-chart.component";


@NgModule({
  declarations: [
    BarChartComponent,
    PieChartComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
  ],
  exports: [
    BarChartComponent,
    PieChartComponent,
  ]
})
export class GraficosModule{}
