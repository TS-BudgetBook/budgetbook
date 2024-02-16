import { Component } from '@angular/core';
import { ExpenseService } from '../expense-service.service';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgFor],
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent {
  expensesList: any[] = [];

  constructor(private expenseService: ExpenseService) {
    this.expensesList = this.expenseService.getExpensesList();
  }

  ngOnInit(): void {
    this.getExpensesList();
  }

  getExpensesList(): void {
    this.expenseService.getExpensesList();
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id);
    this.expensesList = this.expenseService.getExpensesList();
  }
}
