import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenstorageService } from './tokenstorage.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expensesList: any[] = [];
  apiUrl = environment.apiUrl;
  jwtToken: string | null = '';

  constructor(
    private http: HttpClient,
    private tokenstorageService: TokenstorageService
  ) {
    this.jwtToken = this.tokenstorageService.get('jwt');
  }

  getExpenses(page: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`,
      'Content-Type': 'application/json',
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<any>(`${this.apiUrl}expense`, {
      params,
      headers,
      responseType: 'json',
    });
  }

  getAllExpenses() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(this.apiUrl + 'expense/all', {
      headers,
      responseType: 'json',
    });
    // return this.http.get<any[]>(this.apiUrl, { responseType: 'json' });
  }

  addExpense(expense: any): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`,
      'Content-Type': 'application/json',
    });
    this.http.put(this.apiUrl + 'expense', expense, { headers }).subscribe(
      (response) => {
        console.log('PUT request successful:', response);
        console.log('headers', headers);
        window.location.reload();
      },
      (error) => {
        console.error('Error making PUT request:', error);
      }
    );
  }

  deleteExpense(id: string): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`,
      'Content-Type': 'application/json',
    });
    this.http.delete(this.apiUrl + 'expense/' + id, { headers }).subscribe(
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
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`,
      'Content-Type': 'application/json',
    });
    return this.http.put(this.apiUrl + 'expense', updatedExpense, { headers });
  }
}
