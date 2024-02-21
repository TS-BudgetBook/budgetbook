import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expensesList: any[] = [];
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getExpenses() {
    return this.http.get(`${this.apiUrl}`).subscribe((expensesList: any) => {
      console.log('expensesList', expensesList);
    });
  }

  addExpense(expense: any): void {
    this.http.post(`${this.apiUrl}`, expense).subscribe(
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

  editExpense(id: number, updatedExpense: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedExpense);
  }
}
