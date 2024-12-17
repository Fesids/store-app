import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexLegend,
} from 'ng-apexcharts';

interface Task {
  title: string;
  completed: boolean;
}

@Component({
  standalone: true,
  selector: 'app-task-chart',
  templateUrl: './task-chart.component.html',
  styleUrls: ['./task-chart.component.scss'],
  imports: [NgApexchartsModule],
})
export class TaskChartComponent implements OnInit, OnChanges {
  @Input() tasks: any[]  = []; 

  
  @Input() chartType: ApexChart['type'] = 'donut';
  @Input() chartTitle: string = 'Titulo';
  @Input() colors: string[] = ['#00E396', '#FEB019']; 
  @Input() legendPosition: ApexLegend['position'] = 'bottom';

  public chartSeries: ApexNonAxisChartSeries = [];
  public chartLabels: string[] = ['Completa', 'Pendente'];
  public chartDetails: ApexChart = {
    type: this.chartType,
    width: '100%',
    height: '100%'
  };
  public chartTitleConfig: ApexTitleSubtitle = {
    text: this.chartTitle,
    align: 'center',
  };
  public chartResponsive: ApexResponsive[] = [
    {
      //breakpoint: 480,
      options: {
        chart: {
          width: '100%',
          height: '500%'
        },
        legend: {
          position: this.legendPosition,
        },
      },
    },
  ];

  ngOnInit() {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks'] || changes['chartType'] || changes['chartTitle']) {
      this.updateChart();
    }
  }
  

  private updateChart() {
    const completed = this.tasks.filter((task) => task.completed).length;
    const notCompleted = this.tasks.length - completed;

    this.chartSeries = [completed, notCompleted];
    this.chartDetails = {
      ...this.chartDetails,
      type: this.chartType,
    };

    this.chartTitleConfig = {
      ...this.chartTitleConfig,
      text: this.chartTitle,
    };
  }
}
