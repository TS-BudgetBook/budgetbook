import { Component } from '@angular/core';
import { Expense } from '../expense';
import { ExpenseService } from '../expense-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
  imports: [FormsModule],
})
export class ExpenseFormComponent {
  constructor(private expenseService: ExpenseService) {}

  onSubmit(expenseForm) {
    console.log(expenseForm.value);
  }

  /* addExpense(expenseName) {
    console.log('expense ', expenseName )

    const newExpense: Expense = {
      name: ,
      amount: this.expenseAmount,
      type: this.expenseType,
      category: this.expenseCategory,
      date: this.expenseDate,
    };

    console.log(newExpense);

    this.expenseService.addExpense(newExpense);

    this.expenseName = '';
    this.expenseAmount = 0;
    this.expenseType = '';
    this.expenseCategory = '';
    this.expenseDate = new Date();
  } */
}
