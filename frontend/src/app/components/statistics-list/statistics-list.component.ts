import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense-service.service';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  standalone: true,
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrls: ['./statistics-list.component.css'],
  imports: [CommonModule],
})
export class StatisticsListComponent implements OnInit {
  pieChartData: any = {};
  @Input() chartData: any = {};
  expensesList: any[] = [];

  constructor(private statisticsServce: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsServce.getStatistics().subscribe((expenses) => {
      this.expensesList = expenses;
      this.prepareChartData();
      console.log('expensesList', this.expensesList);
    });
  }

  prepareChartData(): void {
    const labels = this.expensesList.map((expense) => expense.category);
    const data = this.expensesList.map((expense) => expense.amount);
    this.pieChartData.data.labels = labels;
    this.pieChartData.data.datasets[0].data = data;
  }
}
