import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { carAuthGuard } from './car-auth-guard';

describe('carAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => carAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
