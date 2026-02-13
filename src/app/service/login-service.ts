// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoginService {
  
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class loginService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Create Account (Sign Up)
  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  // Login Logic: Fetches users and validates credentials
login(credentials: { email: string; password: string }): Observable<any> {
  // Use query parameters so the server does the filtering
  return this.http.get<any[]>(`${this.apiUrl}?email=${credentials.email}&password=${credentials.password}`).pipe(
    map(users => {
      if (users.length > 0) {
        return users[0];
      } else {
        throw new Error('Invalid email or password');
      }
    })
  );
}
}
