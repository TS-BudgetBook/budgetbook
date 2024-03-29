import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
  imports: [FormsModule, CommonModule],
})
export class ExpenseFormComponent {
  constructor(private expenseService: ExpenseService) {
    this.expenseDate = new Date();
  }
  isVisible: boolean = false;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
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
