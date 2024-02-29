import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ExpenseListComponent } from '../expense-list/expense-list.component';

@Component({
  standalone: true,
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
  
})
export class PieChartComponent implements OnInit {
  @Input() statisticsData: any[] = [];
  @Input() chartData: any = {};
  @Input() expenses: ExpenseListComponent[] = [];

  constructor() { }

  ngOnInit(): void {
    this.createPieChart();
  }

  createPieChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Groceries', 'Transport', 'Insurance'],
        datasets: [{
          label: 'Example Dataset',
          data: [50, 20, 30],
          backgroundColor: ['black', 'gray', 'darkgray']
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            display: false,
            labels: {
              color: 'white'
            }
          }
        }
      }
    });
  }
}  

