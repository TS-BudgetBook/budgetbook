import { CommonModule, NgFor } from '@angular/common';

import { Component } from '@angular/core';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { ExpenseService } from '../../expense-service.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [NgFor, ExpenseFormComponent, CommonModule, FormsModule],
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent {
  expensesData: any;
  editingExpense: any;

  constructor(
    private expenseService: ExpenseService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    /* this.getExpensesList(); */
    this.http.get('http://localhost:3000/payment').subscribe((data: any) => {
      this.expensesData = data;
    });
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
