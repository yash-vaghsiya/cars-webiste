// import { Component, OnInit, signal, computed } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { Carsdata, Car } from '../service/carsdata';
// // import { take } from 'rxjs/operators';
// // import { $locationShim } from '@angular/common/upgrade';


// @Component({
//   selector: 'app-Collection',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './collection.html',
//   styleUrls: ['./collection.css'],
// })
// export class Collection implements OnInit {
//   // 1. Define signals for state
//   activeCategory = signal<string>('all');
//   allCars = signal<Car[]>([]);
//   // 2. Automatically compute filtered cars whenever allCars or activeCategory changes
//   filteredCars = computed(() => {
//     const category = this.activeCategory();
//     const cars = this.allCars();
    
//     if (category === 'all') return cars;
//     return cars.filter(car => car.category === category);
//   });

//   constructor(private router: Router, private carsdata: Carsdata) {}

//   ngOnInit(){
//     // 3. Simple subscription to update the signal
//     this.carsdata.getCars().subscribe({
//       next: (cars) => {
//         this.allCars.set(cars);
//       },
//       error: (err) => console.error('Error fetching cars:', err)
//     });
    
//   }
// // service/carsdata.ts
   
// // Adding this prevents the TS2339 error
//   // ... rest of your fields

// filterCars(category: string): void {
//   this.activeCategory.set(category); // Updates the signal value
// }

//   openDetails(car: Car): void {
//     console.log(`/car-details/${car.id}`);
    
//     this.router.navigate([`car-details/${car.id}`]);
//   }

  
// }



import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Carsdata, Car } from '../service/carsdata';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-Collection',
  standalone: true,
  imports: [CommonModule, Footer],
  templateUrl: './collection.html',
  styleUrls: ['./collection.css'],
})
export class Collection implements OnInit {
  // Signals for state management
  activeCategory = signal<string>('all');
  allCars = signal<Car[]>([]);

  // Computed signal for filtered results
  filteredCars = computed(() => {
    const category = this.activeCategory();
    const cars = this.allCars();
    return category === 'all' ? cars : cars.filter(car => car.category === category);
  });

  constructor(private router: Router, private carsdata: Carsdata) {}

  ngOnInit() {
    this.carsdata.getCars().subscribe({
      next: (cars) => this.allCars.set(cars),
      error: (err) => console.error('Error fetching cars:', err)
    });
  }

  filterCars(category: string): void {
    this.activeCategory.set(category);
  }

  openDetails(car: Car): void {
    this.router.navigate([`car-details/${car.id}`]);
  }

  contactWhatsApp(car: Car): void {
    const adminPhone = '8849669921'; // TODO: Replace with your real WhatsApp number
    
    // Constructing the message template
    const message = `Hello! I'm interested in:
*Model:* ${car.name}
*Price:* ${car.price}
*Specs:* ${car.power} | ${car.speed}
*Category:* ${car.category.toUpperCase()}

Please send me more details!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }
}