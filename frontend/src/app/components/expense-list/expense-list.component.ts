import { CommonModule, NgFor } from '@angular/common';

import { Component } from '@angular/core';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { ExpenseService } from '../../expense-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [NgFor, ExpenseFormComponent, CommonModule],
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent {
  /* expensesList: any[] = []; */
  expensesData: any;

  constructor(
    private expenseService: ExpenseService,
    private http: HttpClient
  ) {
    /* this.expensesList = this.expenseService.getExpensesList(); */
  }

  ngOnInit(): void {
    /* this.getExpensesList(); */
    this.http.get('http://localhost:3000/payment').subscribe((data: any) => {
      this.expensesData = data;
    });
  }

  /*   getExpensesList(): void {
    this.expenseService.getExpensesList();
  } */

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id);
    /*  this.expensesList = this.expenseService.getExpensesList(); */
  }
}
