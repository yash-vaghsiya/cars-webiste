import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Carsdata, Car } from '../service/carsdata';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-Collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection.html',
  styleUrls: ['./collection.css'],
})
export class Collection implements OnInit {
  constructor(private router: Router, private carsdata: Carsdata) {}
  activeCategory: string = 'all';
  
  cars: Car[] = [];
  filteredCars: Car[] = [];

  ngOnInit(): void {
    this.carsdata
      .getCars()
      .pipe(take(1))
      .subscribe(cars => {
        this.cars = cars;
        this.filteredCars = [...cars];
      });
  }

  openDetails(car: Car): void {
    this.router.navigate(['/car-details', car.id]);
  }


  filterCars(category: string): void {
    this.activeCategory = category;
    this.filteredCars =
      category === 'all'
        ? this.cars
        : this.cars.filter(car => car.category === category);
  }
}
