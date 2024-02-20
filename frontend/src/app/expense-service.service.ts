import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
        window.location.reload();
      },
      (error) => {
        console.error('Error making POST request:', error);
      }
    );
  }

  deleteExpense(id: number): void {
    this.http.delete(`http://localhost:3000/payment/${id}`).subscribe(
      (response) => {
        console.log('DELETE request successful:', response);

        this.expensesList = this.expensesList.filter(
          (expense) => expense.id !== id
        );
        window.location.reload();
      },
      (error) => {
        console.error('Error making DELETE request:', error);
      }
    );
  }

  editExpense(id: number, updatedExpense: any): Observable<any> {
    return this.http.put(`http://localhost:3000/payment/${id}`, updatedExpense);
  }
}
