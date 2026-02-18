// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service.ts-guard';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login.html',
//   styleUrls: ['./login.css']
// })
// export class Login {
//   currentView: string = 'login';
//   email: string = '';
//   password: string = '';
//   fullName: string = '';
//   phoneNumber: string = '';
//   signupEmail: string = '';
//   signupPassword: string = '';
//   resetEmail: string = '';
//   errorMessage: string = '';

//   constructor(private authService: AuthService, private router: Router) { }

//   switchView(view: string) {
//     this.currentView = view;
//     this.errorMessage = '';
//   }

//   onLogin() {
//     // 1. Basic Validation
//     if (!this.email || !this.password) {
//       this.errorMessage = 'Please enter both email and password';
//       return;
//     }

//     // 2. Role-Based Redirection Logic
//     if (this.email === 'admin@gmail.com' && this.password === 'admin123') {
//       // ✅ Admin Login
//       localStorage.setItem('isLoggedIn', 'true');
//       localStorage.setItem('email', this.email);
//       this.errorMessage = '';
//       this.authService.login(this.email, this.password); // Still call service to set state
//       this.router.navigate(['/Home']);.2
//     }
//     else if (this.email === 'user@gmail.com' && this.password === 'user123') {
//       // ✅ Standard User Login
//       this.errorMessage = '';
//       this.authService.login(this.email, this.password);
//       this.router.navigate(['/Home']);
//     }
//     else {
//       // ❌ Generic Check (in case you have other users in AuthService)
//       if (this.authService.login(this.email, this.password)) {
//         this.router.navigate(['/Home']);
//       } else {
//         this.errorMessage = 'Invalid email or password. Please try again.';
//       }
//     }
//   }

//   // Rest of your onSignup and onPasswordReset methods...


//   onSignup() {
//     if (!this.fullName || !this.signupEmail || !this.signupPassword || !this.phoneNumber) {
//       this.errorMessage = 'Please fill all fields';
//       return;
//     }

//     if (!this.signupEmail.includes('@')) {
//       this.errorMessage = 'Please enter a valid email';
//       return;
//     }

//     // Simulate signup by logging in the new user
//     if (this.authService.login(this.signupEmail, this.signupPassword)) {
//       this.errorMessage = '';
//       this.router.navigate(['/Home']);
//     } else {
//       this.errorMessage = 'Signup failed. Please try again.';
//     }
//   }

//   onPasswordReset() {
//     if (!this.resetEmail) {
//       this.errorMessage = 'Please enter your email';
//       return;
//     }

//     // Simulate password reset
//     this.errorMessage = '';
//     alert('Password reset link sent to ' + this.resetEmail);
//     this.switchView('login');
//   }
// }

// ===============================================================================================================================


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { AuthService } from '../auth.service.ts-guard';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './login.html',
//   styleUrls: ['./login.css']
// })
// export class Login {
//   currentView: string = 'login';
//   errorMessage: string = '';
  
//   private apiUrl = 'http://localhost:3000/users'; 

//   // Properties for Login and Signup
//   email: string = '';
//   password: string = '';
//   fullName: string = '';
//   phoneNumber: string = '';
//   signupEmail: string = '';
//   signupPassword: string = '';

//   // 1. FIXED: Added missing resetEmail property
//   resetEmail: string = '';

//   constructor(
//     private authService: AuthService, 
//     private router: Router,
//     private http: HttpClient
//   ) { }

//   switchView(view: string) {
//     this.currentView = view;
//     this.errorMessage = '';
//   }

//   // 2. FIXED: Added missing onPasswordReset method
//   onPasswordReset() {
//     if (!this.resetEmail) {
//       this.errorMessage = 'Please enter your email';
//       return;
//     }
//     // Simulate link sent
//     alert('Password reset link sent to ' + this.resetEmail);
//     this.switchView('login');
//   }

//   onSignup() {
//     if (!this.fullName || !this.signupEmail || !this.signupPassword || !this.phoneNumber) {
//       this.errorMessage = 'Please fill all fields';
//       return;
//     }

//     const newUser = {
//       name: this.fullName,
//       email: this.signupEmail,
//       phone: this.phoneNumber,
//       password: this.signupPassword,
//       role: 'user'
//     };

//     this.http.get<any[]>(`${this.apiUrl}?email=${this.signupEmail}`).subscribe(users => {
//       if (users.length > 0) {
//         this.errorMessage = 'User with this email already exists!';
//       } else {
//         this.http.post(this.apiUrl, newUser).subscribe({
//           next: () => {
//             alert('Account created successfully! Please login.');
//             this.switchView('login');
//           },
//           error: () => {
//             this.errorMessage = 'Could not connect to server.';
//           }
//         });
//       }
//     });
//   }

//   onLogin() {
//     if (!this.email || !this.password) {
//       this.errorMessage = 'Please enter both email and password';
//       return;
//     }

//     this.http.get<any[]>(`${this.apiUrl}?email=${this.email}`).subscribe({
//       next: (users) => {
//         const user = users[0];
//         if (user && user.password === this.password) {
//           localStorage.setItem('isLoggedIn', 'true');
//           localStorage.setItem('currentUser', JSON.stringify(user));
//           this.authService.login(this.email, this.password);
//           this.router.navigate(['/Home']);
//         } else {
//           this.errorMessage = 'Invalid email or password.';
//         }
//       },
//       error: () => {
//         this.errorMessage = 'Server error. Is json-server running?';
//       }
//     });
//   }
// }



// ===============================================================================================================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service.ts-guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  currentView: string = 'login';
  errorMessage: string = '';
  private apiUrl = 'http://localhost:3000/users'; 

  email: string = '';
  password: string = '';
  fullName: string = '';
  phoneNumber: string = '';
  signupEmail: string = '';
  signupPassword: string = '';
  resetEmail: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['/Home']);
    }
  }

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    this.http.get<any[]>(`${this.apiUrl}?email=${this.email}`).subscribe({
      next: (users) => {
        const user = users[0];

        if (user && user.password === this.password) {
          // Store authentication state
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('email', user.email); // Store email to check for admin status
          
          this.authService.login(this.email, this.password);
          this.router.navigate(['/Home']);
        } else {
          this.errorMessage = 'Invalid email or password.';
        }
      },
      error: () => {
        this.errorMessage = 'Server error. Is your json-server running?';
      }
    });
  }

  onSignup() {
    if (!this.fullName || !this.signupEmail || !this.signupPassword) {
      this.errorMessage = 'Please fill all fields';
      return;
    }

    // Hardcoded check: Only allow admin creation if credentials match exactly
    if (this.signupEmail === 'admin@gmail.com' && this.signupPassword !== 'admin123') {
      this.errorMessage = 'Invalid password for the Admin email account.';
      return;
    }

    const newUser = {
      name: this.fullName,
      email: this.signupEmail,
      phone: this.phoneNumber,
      password: this.signupPassword
    };

    this.http.post(this.apiUrl, newUser).subscribe({
      next: () => {
        alert('Account created successfully!');
        this.switchView('login');
      },
      error: () => this.errorMessage = 'Signup failed.'
    });
  }

  switchView(view: string) {
    this.currentView = view;
    this.errorMessage = '';
  }

  onPasswordReset() {
    if (this.resetEmail) {
      alert('Reset link sent!');
      this.switchView('login');
    }
  }
}