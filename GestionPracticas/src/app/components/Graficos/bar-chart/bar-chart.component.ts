import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { GraficosService } from '../../Servicios/graficos.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];


  public barChartData: ChartDataSets[] = [];

  datosPracticasAprobadas: number = 0;
  datosPracticasReprobadas: number = 0;
  datosPracticasPendientes: number = 0;

  constructor(private _gestionGraficos:GraficosService) {
    const aprobadas = _gestionGraficos.obtenerInformacionSolicitudPracticasAprobadas().valueChanges().subscribe(datos => {
      this.datosPracticasAprobadas = datos.length;

      const reprobadas = _gestionGraficos.obtenerInformacionSolicitudPracticasReprobadas().valueChanges().subscribe(datos => {
        this.datosPracticasReprobadas = datos.length;

        const pendientes = _gestionGraficos.obtenerInformacionSolicitudPracticasPendientes().valueChanges().subscribe(datos => {
          this.datosPracticasPendientes = datos.length;

          this.barChartData = [
            { data: [this.datosPracticasAprobadas], label: 'Aprobadas', backgroundColor: 'rgba(0,255,0,0.3)', borderColor: 'rgba(0,255,0,0.9)' },
            { data: [this.datosPracticasReprobadas], label: 'Reprobadas', backgroundColor: 'rgba(255,0,0,0.3)', borderColor: 'rgba(255,0,0,0.9)' },
            { data: [this.datosPracticasPendientes], label: 'Pendientes', backgroundColor: 'rgba(0,0,255,0.3)', borderColor: 'rgba(0,0,255,0.9)' }
          ];
        })

      })

    })
   }

  ngOnInit(): void {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40 ];
  }
}
