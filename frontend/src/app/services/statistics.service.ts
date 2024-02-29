import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { TokenstorageService } from './tokenstorage.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  apiUrl = environment.apiUrl;
  jwtToken: string | null = '';

  constructor(
    private http: HttpClient,
    private tokenstorageService: TokenstorageService
  ) {
    this.jwtToken = this.tokenstorageService.get('jwt');
  }

  getStatistics() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(this.apiUrl, { headers, responseType: 'json' });
  }
}
