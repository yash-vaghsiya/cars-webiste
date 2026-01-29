import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Store user login credentials
  login(email: string, password: string): boolean {
    if (email && password) {
      // Store token in localStorage (in real app, this would come from backend)
      localStorage.setItem('token', 'user-token-' + Date.now());
      localStorage.setItem('userEmail', email);
      return true;
    }
    return false;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
  }

  // Get logged in user email
  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }
}