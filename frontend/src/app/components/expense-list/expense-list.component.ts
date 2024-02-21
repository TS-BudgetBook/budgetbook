import { CommonModule, NgFor } from '@angular/common';

import { Component } from '@angular/core';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { ExpenseService } from '../../expense-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [NgFor, ExpenseFormComponent, CommonModule, FormsModule],
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent {
  expensesList: any = [];
  editingExpense: any;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.getExpensesList();
  }

  getExpensesList(): void {
    /* this.expensesList.concat(this.expenseService.getExpenses()); */
    this.expensesList = this.expenseService.getExpenses();
    this.expensesList = JSON.parse(this.expensesList);
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id);
  }

  openEditForm(expense: any): void {
    this.editingExpense = { ...expense };
  }

  submitEditForm(): void {
    this.expenseService
      .editExpense(this.editingExpense.id, this.editingExpense)
      .subscribe(
        (response) => {
          console.log('PUT request successful:', response);
          window.location.reload();
        },
        (error) => {
          console.error('Error making PUT request:', error);
        }
      );
  }
}
