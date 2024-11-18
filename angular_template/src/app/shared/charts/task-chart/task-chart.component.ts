import { Component, Input, OnInit } from '@angular/core';
import { ApexNonAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexResponsive, NgApexchartsModule } from 'ng-apexcharts';

@Component({
    standalone: true,
  selector: 'app-task-chart',
  templateUrl: './task-chart.component.html',
  styleUrls: ['./task-chart.component.scss'],
  imports: [NgApexchartsModule]
})
export class TaskChartComponent implements OnInit {
  @Input() completedTasks: number = 0;
  @Input() notCompletedTasks: number = 0;

  public chartSeries: ApexNonAxisChartSeries = [];
  public chartDetails: ApexChart = {
    type: 'donut',
    width: 380
  };
  public chartLabels = ['Completed', 'Not Completed'];
  public chartResponsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ];
  public chartTitle: ApexTitleSubtitle = {
    text: 'Task Completion Status',
    align: 'center'
  };

  ngOnInit() {
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  private updateChart() {
    this.chartSeries = [this.completedTasks, this.notCompletedTasks];
  }
}
