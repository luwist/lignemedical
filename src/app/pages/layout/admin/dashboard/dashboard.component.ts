import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  barChartData: ChartConfiguration<'bar'>['data'] = {
    datasets: [
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Atenciones medicas',
        backgroundColor: [
          'rgba(240, 252, 161, 1)',
          'rgba(240, 252, 161, 1)',
          'rgba(240, 252, 161, 1)',
          'rgba(240, 252, 161, 1)',
          'rgba(240, 252, 161, 1)',
          'rgba(240, 252, 161, 1)',
          'rgba(240, 252, 161, 1)',
        ],
        borderRadius: {
          topLeft: 12,
          topRight: 12,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderSkipped: false,
      },
    ],
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#808080',
          font: {
            family: "'Urbanist', sans-serif",
            size: 14
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#2b2b2b',
        },
        ticks: {
          color: '#808080',
          font: {
            family: "'Urbanist', sans-serif",
            size: 14
          },
        },
      },
      y: {
        grid: {
          color: '#353535',
        },
        ticks: {
          color: '#808080',
          font: {
            family: "'Urbanist', sans-serif",
            size: 14
          },
        }
      },
    },
  };
}
