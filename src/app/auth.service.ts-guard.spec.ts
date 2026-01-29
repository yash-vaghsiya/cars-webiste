import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authServiceTsGuard } from './auth.service.ts-guard';

describe('authServiceTsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authServiceTsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
