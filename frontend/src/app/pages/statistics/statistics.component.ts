import { Component, OnInit, } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { PieChartComponent } from '../../components/piechart/piechart.component';
import { StatisticsListComponent } from '../../components/statistics-list/statistics-list.component';
import { ExpenseService } from '../../services/expense-service.service';


@Component({
  standalone: true,
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  imports: [HeaderComponent, PieChartComponent, StatisticsListComponent]
})
export class StatisticsComponent implements OnInit {
  expensesList: any = [];
  pieChartData: any = {};

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expensesList = this.expenseService.getExpenses();
    this.prepareChartData();
  }

  prepareChartData(): void {
    const labels = this.expensesList.map(expense => expense.category);
    const data = this.expensesList.map(expense => expense.amount);

    this.pieChartData.data.labels = labels;
    this.pieChartData.data.datasets[0].data = data;

    this.pieChartData.update();
  }
}
