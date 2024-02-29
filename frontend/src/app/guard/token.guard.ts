import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Injectable } from '@angular/core';
import { TokenstorageService } from '../services/tokenstorage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenGuard {
  constructor(
    private router: Router,
    private tokenstorageService: TokenstorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token: string | null = this.tokenstorageService.get('jwt');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
