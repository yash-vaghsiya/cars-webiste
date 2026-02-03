import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Carsdata, Car } from '../service/carsdata';
import { take } from 'rxjs/operators';

interface CarDetailsView {
  year: string;
  transmission: string;
  fuel: string;
  mileage: string;
  torque: string;
  drivetrain: string;
  seats: string;
  color: string;
  groundClearance: string;
  bootSpace: string;
  warranty: string;
  description: string;
  features: string[];
}

@Component({
  selector: 'app-car-details',
  imports: [CommonModule],
  templateUrl: './car-details.html',
  styleUrl: './car-details.css',
})
export class CarDetails implements OnInit {
  car: Car | undefined;
  details: CarDetailsView | undefined;

  private readonly defaultDetails: CarDetailsView = {
    year: '2024',
    transmission: 'Automatic',
    fuel: 'Petrol',
    mileage: '12 km/l',
    torque: '650 Nm',
    drivetrain: 'AWD',
    seats: '5',
    color: 'Obsidian Black',
    groundClearance: '210 mm',
    bootSpace: '450 L',
    warranty: '3 Years / 1,00,000 km',
    description:
      'A performance-focused luxury machine with sharp handling, premium comfort, and a bold road presence.',
    features: [
      'Adaptive suspension',
      '360° camera',
      'Wireless charging',
      'Panoramic sunroof',
      'Premium sound system',
      'Driver assistance suite',
    ],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private carsdata: Carsdata
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : Number.NaN;

    if (!idParam || Number.isNaN(id)) {
      this.router.navigate(['/collection']);
      return;
    }

    this.carsdata
      .getCarById(id)
      .pipe(take(1))
      .subscribe(car => {
        if (!car) {
          this.router.navigate(['/collection']);
          return;
        }

        this.car = car;
        this.details = this.buildDetails(car);
      });
  }

  goBack(): void {
    this.router.navigate(['/collection']);
  }

  private buildDetails(car: Car): CarDetailsView {
    return {
      ...this.defaultDetails,
      year: car.year || this.defaultDetails.year,
      transmission: car.transmission || this.defaultDetails.transmission,
      fuel: car.fuel || this.defaultDetails.fuel,
      mileage: car.km || this.defaultDetails.mileage,
      torque: car.torque || this.defaultDetails.torque,
      groundClearance:
        car.groundClearance || this.defaultDetails.groundClearance,
      bootSpace: car.bootSpace || this.defaultDetails.bootSpace,
    };
  }
}
