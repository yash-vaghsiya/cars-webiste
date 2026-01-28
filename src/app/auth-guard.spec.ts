import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth-guard';
import { Home } from './home/home';
import { Login } from './login/login';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  
  // Protected Routes
  { 
    path: 'collection', 
    component: Login, 
    canActivate: [AuthGuard] // This checks the guard before opening the page
  },
  { 
    path: 'sell car', 
    component: Login, 
    canActivate: [AuthGuard] 
  }
];