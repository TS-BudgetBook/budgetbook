import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenstorageService {
  constructor(private route: ActivatedRoute) {}

  getTokenFromUrl() {
    const token: string | null = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.set('jwt', token);
    }
  }

  private set(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  get(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  remove(key: string) {
    sessionStorage.removeItem(key);
  }
}
