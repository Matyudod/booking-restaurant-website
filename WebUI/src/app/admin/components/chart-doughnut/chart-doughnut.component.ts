import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType, ChartTypeRegistry } from 'chart.js';

@Component({
  selector: 'app-chart-doughnut',
  templateUrl: './chart-doughnut.component.html',
  styleUrls: ['./chart-doughnut.component.scss']
})
export class ChartDoughnutComponent {

  // Doughnut
  public doughnutChartLabels: string[] = [
    'Order to home',
    'Order in restaurent',
  ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [{ data: [350, 450] }];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Order This Month Chart',
        position: 'bottom',
        font: {
          size: 20,
        },
      }
    }
  };
  constructor() { }
}
