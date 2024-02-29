import { Component, OnInit, Input } from '@angular/core';
import { ExpenseService } from '../../expense-service.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrls: ['./statistics-list.component.css'],
  imports: [CommonModule]
})
export class StatisticsListComponent implements OnInit {
  categoriesData: { name: string, percentage: number }[] = [    { name: 'Category 1', percentage: 25 },
  { name: 'Category 2', percentage: 50 },
  { name: 'Category 3', percentage: 25 }]
  @Input() statisticsData: any[] = [];
  expensesList: any[] = [];
  pieChartData: any = {};
  @Input() chartData: any = {};

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses(): void {
    this.expensesList = this.expenseService.getExpensesList();
    this.prepareChartData();
  }

  prepareChartData(): void {
    const labels = this.expensesList.map(expense => expense.category);
    const data = this.expensesList.map(expense => expense.amount);

    this.pieChartData.data.labels = labels;
    this.pieChartData.data.datasets[0].data = data;
  }
}

