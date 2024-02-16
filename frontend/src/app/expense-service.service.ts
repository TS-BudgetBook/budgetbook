import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expensesList: any[] = [];

  constructor() {}

  getExpensesList(): any[] {
    return this.expensesList;
  }

  addExpense(expense: any): void {
    this.expensesList.push(expense);
  }

  deleteExpense(id: number): void {
    this.expensesList = this.expensesList.filter(
      (expense) => expense.id !== id
    );
  }
}
