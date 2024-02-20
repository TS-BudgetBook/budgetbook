import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expensesList: any[] = [];

  constructor(private http: HttpClient) {}

  getExpensesList(): any[] {
    return this.expensesList;
  }

  addExpense(expense: any): void {
    this.http.post('http://localhost:3000/payment', expense).subscribe(
      (response) => {
        console.log('POST request successful:', response);
        // Handle the response data as needed
      },
      (error) => {
        console.error('Error making POST request:', error);
        // Handle errors
      }
    );
  }

  deleteExpense(id: number): void {
    this.expensesList = this.expensesList.filter(
      (expense) => expense.id !== id
    );
  }
}
