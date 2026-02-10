import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service.ts-guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  currentView: string = 'login';
  email: string = '';
  password: string = '';
  fullName: string = '';
  phoneNumber: string = '';
  signupEmail: string = '';
  signupPassword: string = '';
  resetEmail: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  switchView(view: string) {
    this.currentView = view;
    this.errorMessage = '';
  }

  onLogin() {
    // 1. Basic Validation
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    // 2. Role-Based Redirection Logic
    if (this.email === 'admin@gmail.com' && this.password === 'admin123') {
      // ✅ Admin Login
       localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('email', this.email);  
      this.errorMessage = '';
      this.authService.login(this.email, this.password); // Still call service to set state
      this.router.navigate(['/Home']);
    } 
    else if (this.email === 'user@gmail.com' && this.password === 'user123') {
      // ✅ Standard User Login
      this.errorMessage = '';
      this.authService.login(this.email, this.password);
      this.router.navigate(['/Home']);
    } 
    else {
      // ❌ Generic Check (in case you have other users in AuthService)
      if (this.authService.login(this.email, this.password)) {
        this.router.navigate(['/Home']);
      } else {
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    }
  }

  // Rest of your onSignup and onPasswordReset methods...


  onSignup() {
    if (!this.fullName || !this.signupEmail || !this.signupPassword || !this.phoneNumber) {
      this.errorMessage = 'Please fill all fields';
      return;
    }

    if (!this.signupEmail.includes('@')) {
      this.errorMessage = 'Please enter a valid email';
      return;
    }

    // Simulate signup by logging in the new user
    if (this.authService.login(this.signupEmail, this.signupPassword)) {
      this.errorMessage = '';
      this.router.navigate(['/Home']);
    } else {
      this.errorMessage = 'Signup failed. Please try again.';
    }
  }

  onPasswordReset() {
    if (!this.resetEmail) {
      this.errorMessage = 'Please enter your email';
      return;
    }

    // Simulate password reset
    this.errorMessage = '';
    alert('Password reset link sent to ' + this.resetEmail);
    this.switchView('login');
  }
}
