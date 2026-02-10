import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Car {
  id: number;
  name: string;
  category: string;
  price: string;
  power: string;
  speed: string;
  fuel: string;
  year: string;
  km: string;
  color: string;
  transmission: string;
  groundClearance: string;
  bootSpace: string;
  engine: string;
  torque: string;
  owners: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class Carsdata {
  // BehaviorSubject holds the current state of cars
  private carsSubject = new BehaviorSubject<Car[]>([]);
  cars$ = this.carsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialCars();
  }

  // Fetch from your cars.json once on startup
  private loadInitialCars() {
    this.http.get<{ cars: Car[] }>('cars.json').pipe(
      map(response => response.cars)
    ).subscribe(cars => {
      this.carsSubject.next(cars);
    });
  }

  // Returns the observable for the Collection page to subscribe to
  getCars(): Observable<Car[]> {
    return this.cars$;
  }

  getCarById(id: number): Observable<Car | undefined> {
    return this.cars$.pipe(map(cars => cars.find(car => car.id == id)));
  }

  // ✅ New method for Admin Panel to add a car
  addCar(newCar: Car) {
    const currentCars = this.carsSubject.value;
    this.carsSubject.next([...currentCars, newCar]);
  }

  // ✅ New method for Admin Panel to remove a car
  removeCar(id: number) {
    const updatedCars = this.carsSubject.value.filter(car => car.id !== id);
    this.carsSubject.next(updatedCars);
  }
}