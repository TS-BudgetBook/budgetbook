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

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getAllExpenses().subscribe(
      (expensesList: any[]) => {
        this.expensesList = expensesList;
        console.log('this.expensesList', this.expensesList);
        console.log('this.expensesList', typeof this.expensesList);
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
    this.calcTotalAmount(this.expensesList);
  }

  toggleForm() {
    this.isVisible = !this.isVisible;
    this.isShow = false;
  }

  openMenu() {
    this.isShow = !this.isShow;
  }

  getTotalExpense(): number {
    return this.calcTotalExpense(this.expensesList);
  }

  calcTotalAmount(expensesList: any[]): number {
    let totalIncome = 0;
    let totalExpense = 0;
    let totalAmount = 0;

    for (const expense of expensesList) {
      if (expense.type === 'income') {
        totalIncome += Number(expense.amount);
      }

      if (expense.type === 'expense') {
        totalExpense += Number(expense.amount);
      }
      totalAmount = totalIncome - totalExpense;
    }
    console.log('totalAmount', totalAmount);
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

    if (Array.isArray(expensesList)) {
      for (let expense of expensesList) {
        if (expense.type === 'expense') {
          expense.amount = Number(expense.amount);
          totalExpense += expense.amount;
        }
      }
    } else {
      console.error('expensesList is not an array');
    }

    return totalExpense;
  }

  expenseId: number = 0;
  expenseName: string = '';
  expenseAmount: number = 0;
  expenseType: string = '';
  expenseCategory: string = '';
  expenseDate: Date = new Date();

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
