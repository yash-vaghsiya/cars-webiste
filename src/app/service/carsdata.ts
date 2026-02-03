import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  private readonly cars$: Observable<Car[]>;

  constructor(private http: HttpClient) {
    this.cars$ = this.http
      .get<{ cars: Car[] }>('cars.json')
      .pipe(
        map(response => response.cars),
        shareReplay(1)
      );
  }

  getCars(): Observable<Car[]> {
    return this.cars$;
  }

  getCarById(id: number): Observable<Car | undefined> {
    return this.cars$.pipe(map(cars => cars.find(car => car.id === id)));
  }
}
