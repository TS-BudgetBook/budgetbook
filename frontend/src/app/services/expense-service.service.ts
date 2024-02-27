import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expensesList: any[] = [];
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getExpenses() {
    return this.http.get<any[]>(this.apiUrl, { responseType: 'json' });
  }

  addExpense(expense: any): void {
    this.http.put(`${this.apiUrl}`, expense).subscribe(
      (response) => {
        console.log('PUT request successful:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error making PUT request:', error);
      }
    );
  }

  deleteExpense(id: string): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
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

  updateExpense(updatedExpense: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, updatedExpense);
  }
}
