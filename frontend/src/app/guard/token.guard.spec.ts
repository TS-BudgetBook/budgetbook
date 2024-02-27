import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { TokenGuard } from './token.guard';

describe('TokenGuard', () => {
  let guard: TokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [TokenGuard],
    });
    guard = TestBed.inject(TokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation if token is present', () => {
    const routeSnapshot = new ActivatedRouteSnapshot();
    const stateSnapshot = {} as RouterStateSnapshot;
    spyOn(routeSnapshot.queryParamMap, 'get').and.returnValue('dummyToken');

    const canActivate = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(canActivate).toBe(true);
  });

  it('should redirect to login page if token is not present', () => {
    const routeSnapshot = new ActivatedRouteSnapshot();
    const stateSnapshot = {} as RouterStateSnapshot;
    spyOn(routeSnapshot.queryParamMap, 'get').and.returnValue(null);

    const canActivate = guard.canActivate(routeSnapshot, stateSnapshot);

    expect(canActivate).toBe(false);
  });
});
