import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense-service.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor],
  providers: [ExpenseService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  expensesList: any[] = [];

  constructor(private expenseService: ExpenseService) {
    this.expenseService.getExpenses().subscribe(
      (expensesList: any[]) => {
        this.expensesList = expensesList;
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }

  calcTotalAmount(expensesList: any[]): number {
    let totalAmount = 0;
    for (const expense of expensesList) {
      expense.amount = Number(expense.amount);
      totalAmount += expense.amount;
    }

    return totalAmount;
  }

  calcTotalIncome(expensesList: any[]): number {
    let totalIncome = 0;

    for (const expense of expensesList) {
      if (expense.type === 'income') {
        expense.amount = Number(expense.amount);
        totalIncome += expense.amount;
      }
    }
    return totalIncome;
  }

  calcTotalExpense(expensesList: any[]): number {
    let totalExpense = 0;

    for (const expense of expensesList) {
      if (expense.type === 'expense') {
        expense.amount = Number(expense.amount);
        totalExpense += expense.amount;
      }
    }
    return totalExpense;
  }
}
