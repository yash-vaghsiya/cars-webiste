import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarDetails } from '../car-details/car-details'; // Import correctly

@Injectable({ providedIn: 'root' })
export class AdminService {
private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  addCar(car: any): Observable<any> {
    // Make sure the path '/cars' matches your db.json key
    return this.http.post(`${this.baseUrl}/cars`, car);
  }

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cars`);
  }
  
  // Update and Delete must also use the ID
  updateCar(id: any, car: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/cars/${id}`, car);
  }

  deleteCar(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cars/${id}`);
  }
}

