import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Carsdata, Car } from '../service/carsdata';
import { take } from 'rxjs/operators';

export interface CarDetailsView {
  id?: number; 
  name: string;
  category: string;
  price: string | number;
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
  status?: string; 
  mileage: string;
  drivetrain: string;
  seats: string;
  color: string;
  warranty: string;
  description: string;
  features: string[];
}

@Component({
  selector: 'app-car-details',
  standalone: true, // Recommended for modern Angular
  imports: [CommonModule],
  templateUrl: './car-details.html',
  styleUrl: './car-details.css',
})
export class CarDetails implements OnInit {
  car: Car | undefined;
  details: CarDetailsView | undefined;

  // Added 'as any' or fill in dummy values for name/price if needed, 
  // but better to just fix the interface as shown above.
  private readonly defaultDetails: Partial<CarDetailsView> = {
    year: '2024',
    transmission: 'Automatic',
    fuel: 'Petrol',
    mileage: '12 km/l',
    torque: '650 Nm',
    // seats: '5',
    color: '',
    groundClearance: '210 mm',
    bootSpace: '450 L',
    warranty: '3 Years / 1,00,000 km',
    description: 'A performance-focused luxury machine...',
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
      console.log("idparam if statement");
      
      this.router.navigate(['/collection']);
      return;
    }

    this.carsdata
      .getCarById(id)
      .pipe(take(1))
      .subscribe(car => {
        if (!car) {
          console.log("carsdata if statement");
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
    // We combine car data with defaults. 
    // Type casting 'as CarDetailsView' ensures it satisfies the interface.
    return {
      ...this.defaultDetails,
      name: car.name,
      category: car.category,
      price: car.price,
      power: car.power,
      speed: car.speed,
      image: car.image,
      engine: car.engine,
      drivetrain: car.drivetrain || this.defaultDetails.drivetrain || '' ,
      owners: car.owners,
      km: car.km,
      seats: this.defaultDetails.seats || '', // Assuming 5 seats as default
      color: car.color || this.defaultDetails.color || '', // Fallback for color
      year: car.year || this.defaultDetails.year,   
      transmission: car.transmission || this.defaultDetails.transmission,
      fuel: car.fuel || this.defaultDetails.fuel,
      mileage: car.km || this.defaultDetails.mileage, // Note: km and mileage logic
      torque: car.torque || this.defaultDetails.torque,
      groundClearance: car.groundClearance || this.defaultDetails.groundClearance,
      bootSpace: car.bootSpace || this.defaultDetails.bootSpace,
    } as CarDetailsView;
  }
}
