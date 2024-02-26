import { CommonModule, NgFor } from '@angular/common';

import { Component } from '@angular/core';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { ExpenseService } from '../../services/expense-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, CommonModule, ExpenseFormComponent, FormsModule],
  providers: [ExpenseService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  expensesList: any[] = [];
  isVisible: boolean = false;
  isShow: boolean = false;

  editingExpense: any;

  constructor(private expenseService: ExpenseService) {
    this.expenseDate = new Date();
    this.expenseService.getExpenses().subscribe(
      (expensesList: any[]) => {
        this.expensesList = expensesList;
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }

  toggleForm() {
    this.isVisible = !this.isVisible;
  }

  openMenu() {
    this.isShow = !this.isShow;
  }

  calcTotalAmount(expensesList: any[]): number {
    let totalIncome = 0;
    let totalExpense = 0;
    let totalAmount = 0;

    for (const expense of expensesList) {
      if (expense.type === 'income') {
        expense.amount = Number(expense.amount);
        totalIncome += expense.amount;
      }

      if (expense.type === 'expense') {
        expense.amount = Number(expense.amount);
        totalExpense += expense.amount;
      }

      totalAmount = totalIncome - totalExpense;
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

  expenseId: number = 0;
  expenseName: string = '';
  expenseAmount: number = 0;
  expenseType: string = '';
  expenseCategory: string = '';
  expenseDate: Date;

  addExpense() {
    const date = new Date(this.expenseDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    console.log('formattedDate', formattedDate);

    const newExpense = {
      expenseId: this.expenseId,
      name: this.expenseName,
      amount: this.expenseAmount,
      type: this.expenseType,
      category: this.expenseCategory,
      date: formattedDate,
    };

    console.log(newExpense);

    this.expenseService.addExpense(newExpense);

    this.expenseId = 0;
    this.expenseName = '';
    this.expenseAmount = 0;
    this.expenseType = '';
    this.expenseCategory = '';
    this.expenseDate = new Date();
  }
}
