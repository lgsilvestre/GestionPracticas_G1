import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { GraficosService } from '../../Servicios/graficos.service';

@Component({
  selector: 'app-grafico-solicitud-enc-carrera',
  templateUrl: './grafico-solicitud-enc-carrera.component.html',
  styleUrls: ['./grafico-solicitud-enc-carrera.component.css']
})
export class GraficoSolicitudEncCarreraComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Aprobadas'], ['Reprobadas'], ['Pendientes']];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  carreras:string[] = [];
  activarDropdown:boolean = false;
  opcionCarrera: string = 'Desplegar carreras';
  datosPracticasAprobadas: number = 0;
  datosPracticasReprobadas: number = 0;
  datosPracticasPendientes: number = 0;

  constructor(private _gestionGraficos: GraficosService) {
    const aprobadas = _gestionGraficos.obtenerInformacionSolicitudPracticasAprobadasCarrera(this.user.carrera).valueChanges().subscribe(datos => {
      this.datosPracticasAprobadas = datos.length;

      const reprobadas = _gestionGraficos.obtenerInformacionSolicitudPracticasReprobadasCarrera(this.user.carrera).valueChanges().subscribe(datos => {
        this.datosPracticasReprobadas = datos.length;

        const pendientes = _gestionGraficos.obtenerInformacionSolicitudPracticasPendientes().valueChanges(this.user.carrera).subscribe(datos => {
          this.datosPracticasPendientes = datos.length;

          this.pieChartData = [this.datosPracticasAprobadas,this.datosPracticasReprobadas,this.datosPracticasPendientes];
        })

      })

    })

  }

  cambiarGraficoFiltro(){

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

  changeLabels(): void {
    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartLabels = Array.apply(null).map(_ => randomWord());
  }

  addSlice(): void {
    this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
    this.pieChartData.push(400);
    this.pieChartColors[0].backgroundColor.push('rgba(195,79,244,0.3)');
  }

  removeSlice(): void {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

}
