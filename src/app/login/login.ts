// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// @Component({
//   selector: 'app-root',
//   standalone: true,           // Ensure this is set to true
//   imports: [CommonModule, FormsModule],    // 2. Add it here
//   templateUrl: './login.html',
//   styleUrls: ['./login.css']
// })
// export class Login {
//   currentView: string = 'login';

//   switchView(view: string) {
//     this.currentView = view;
//   }

//   onSubmit() {
//     console.log('Action performed for: ' + this.currentView);
//   }
// }



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

    // ✅ PREDEFINED LOGIN (you can change later)
  private readonly VALID_EMAIL = 'admin@gmail.com';
  private readonly VALID_PASSWORD = '123456';

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
    this.errorMessage = ''; // Clear error when switching views
  }

  onLogin() {
    if (!this.email.includes('@') || !this.password) {
      this.errorMessage = 'Please enter email and password';
      return;
    }

    // Simple email validation
    if (!this.email.includes('admin@gmail.com')) {
      this.errorMessage = 'Please enter a valid email';
      return;
    }
if (!this.password.includes('admin123')) {
      this.errorMessage = 'Please enter a valid password';
      return;
    }

    // Attempt login
    if (this.authService.login(this.email, this.password='admin123')) {
      this.errorMessage = '';
      this.router.navigate(['/Home']);
    } else {
      this.errorMessage = 'Login failed. Please try again.';
    }
  }

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

  onSubmit() {
    if (this.currentView === 'login') {
      this.onLogin();
    } else if (this.currentView === 'signup') {
      this.onSignup();
    } else if (this.currentView === 'forgot') {
      this.onPasswordReset();
    }
  }
}





