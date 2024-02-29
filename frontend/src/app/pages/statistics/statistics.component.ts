import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ExpenseService } from '../../services/expense-service.service';
import { HeaderComponent } from '../../components/header/header.component';
import { Observable } from 'rxjs';
import { PieChartComponent } from '../../components/piechart/piechart.component';
import { StatisticsListComponent } from '../../components/statistics-list/statistics-list.component';
import { TokenstorageService } from '../../services/tokenstorage.service';

@Component({
  standalone: true,
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  imports: [HeaderComponent, PieChartComponent, StatisticsListComponent],
})
export class StatisticsComponent {
  jwtToken: string | null = '';
  /* expensesList: any[] = []; */
  pieChartData: any = {};

  constructor(
    private http: HttpClient,
    private tokenstorageService: TokenstorageService,
    private expenseService: ExpenseService
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

  /*   prepareChartData(): void {
    const labels = this.expensesList.map(expense => expense.category);
    const data = this.expensesList.map(expense => expense.amount);

    this.pieChartData.data.labels = labels;
    this.pieChartData.data.datasets[0].data = data;

    this.pieChartData.update();
  }  */
}
