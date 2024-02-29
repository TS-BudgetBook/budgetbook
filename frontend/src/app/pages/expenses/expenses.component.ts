import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ExpenseFormComponent } from '../../components/expense-form/expense-form.component';
import { ExpenseListComponent } from '../../components/expense-list/expense-list.component';
import { ExpenseService } from '../../services/expense-service.service';
import { HeaderComponent } from '../../components/header/header.component';
import { Observable } from 'rxjs';
import { TokenstorageService } from '../../services/tokenstorage.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [HeaderComponent, ExpenseListComponent, ExpenseFormComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
})
export class ExpensesComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private tokenstorageService: TokenstorageService
  ) {}

  ngOnInit(): void {
    this.tokenstorageService.getTokenFromUrl();
    const token: string | null = this.tokenstorageService.get('jwt');
    console.log('hier token', token);

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      console.log('Headers', headers);

      this.getData(headers).subscribe(
        (response) => {
          console.log('Data:', response);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    } else {
      console.error('No token found in the URL parameters');
    }
  }

  getData(headers: HttpHeaders): Observable<any> {
    return this.http.get('http://localhost:3000/api/payment', {
      headers,
    });
  }
}
