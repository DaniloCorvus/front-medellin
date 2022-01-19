import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from './apex.model';
import { StatiticsService } from './statitics.service';


@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent implements OnInit {
  constructor(private statitics: StatiticsService) { }
  data: {}
  names: Array<any> = []
  quantities: Array<any> = []

  ngOnInit(): void {
    this.MontarGrafico();
    this.getData();
  }


  getData() {
    this.statitics.getStatitics().subscribe((res: any) => {
      this.names = res.data.conteo['name']
      this.quantities = res.data.conteo['quantity']
      this.MontarGrafico();
    });
  }

  MontarGrafico() {
    const barChart: ChartType = {
      chart: {
        height: 220,
        type: 'bar',
        toolbar: {
          show: false
        }
      },

      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false
      },
      legend: {
      },
      series: [{
        data: this.quantities,
      }],
      colors: ['#1cbb8c', '#5664d2', '#fcb92c', '#4aa3ff', '#ff3d60'],
      xaxis: {
        categories: this.names,
      },
      grid: {
        borderColor: '#f1f1f1',
        padding: {
          bottom: 5
        },
      }
    };


    this.data = barChart;
  }

}