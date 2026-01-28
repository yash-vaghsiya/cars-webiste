// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Replace this with your actual login check (e.g., checking localStorage for a token)
    const isLoggedIn = !!localStorage.getItem('token'); 

    if (isLoggedIn) {
      return true; // User is logged in, allow them to see the page
    } else {
      // User is NOT logged in, redirect them to the login page
      this.router.navigate(['/login']); 
      return false;
    }
  }
}