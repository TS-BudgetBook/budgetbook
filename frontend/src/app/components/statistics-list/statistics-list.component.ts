import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense-service.service';

@Component({
  standalone: true,
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrls: ['./statistics-list.component.css'],
  imports: [CommonModule],
})
export class StatisticsListComponent implements OnInit {
  categoriesData: { name: string; percentage: number }[] = [
    { name: 'Category 1', percentage: 25 },
    { name: 'Category 2', percentage: 50 },
    { name: 'Category 3', percentage: 25 },
  ];
  @Input() statisticsData: any[] = [];
  expensesList: any[] = [];
  pieChartData: any = {};
  @Input() chartData: any = {};

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe((expenses) => {
      this.expensesList = expenses;
      this.prepareChartData();
      console.log('expensesList', this.expensesList);
    });
  }

  prepareChartData(): void {
    const labels = this.expensesList.map((expense) => expense.category);
    console.log('labels', labels);
    const data = this.expensesList.map((expense) => expense.amount);

    this.pieChartData.data.labels = labels;
    this.pieChartData.data.datasets[0].data = data;
  }
}
