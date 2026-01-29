// import { Injectable } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';

// export const carAuthGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);

//   // Check if user is logged in via token in localStorage
//   const isLoggedIn = !!localStorage.getItem('token');

//   if (isLoggedIn) {
//     return true;
//   }

//   router.navigate(['/login']);
//   return false;
// };

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service.ts-guard';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // User is logged in, allow access
    } else {
      // User is NOT logged in, redirect to login
      this.router.navigate(['/Login']); 
      return false;
    }
  }
}